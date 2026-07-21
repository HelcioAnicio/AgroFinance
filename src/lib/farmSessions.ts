import prisma from '@/lib/prisma';
import { getSeatLimitForTier } from '@/lib/billing';

// Prioridade de evicção — menor número = evictar primeiro
// OWNER nunca é evicatado (valor alto o suficiente para nunca ser escolhido)
const EVICTION_PRIORITY: Record<string, number> = {
  VIEWER: 0,
  EMPLOYEE: 1,
  CAREGIVER_VETERINARIAN: 1,
  FINANCIAL: 2,
  MANAGER: 3,
  OWNER: 9999,
};

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h de inatividade = sessão expirada

export async function createFarmSession(
  userId: string,
  jti: string
): Promise<void> {
  console.log(`[farmSessions] Iniciando criação de sessão para userId: ${userId}`);

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      activeFarmId: true,
      farmMemberships: {
        select: { farmId: true, role: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!dbUser) {
    console.error(`[farmSessions] Usuário não encontrado com id: ${userId}`);
    return;
  }

  const membership =
    (dbUser.activeFarmId
      ? dbUser.farmMemberships.find((m) => m.farmId === dbUser.activeFarmId)
      : null) ??
    dbUser.farmMemberships.find((m) => m.role === 'OWNER') ??
    dbUser.farmMemberships[0];

  if (!membership) {
     console.error(`[farmSessions] Nenhuma assinatura de fazenda encontrada para o usuário: ${userId}`);
    return;
  }

  const { farmId, role } = membership;
  console.log(`[farmSessions] ID da fazenda selecionada: ${farmId}`);

  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
    select: { subscriptionStatus: true, name: true },
  });

  if (!farm) {
    console.error(`[farmSessions] Fazenda não encontrada com o ID: ${farmId}`);
    // Mesmo que a fazenda não seja encontrada, a sessão não deve ser criada.
    // Considere lançar um erro aqui se este for um estado inesperado.
    return; 
  }

  console.log(`[farmSessions] Fazenda encontrada: ${farm.name}`);

  const seatLimit = farm?.subscriptionStatus
    ? getSeatLimitForTier(farm.subscriptionStatus)
    : null;

  // Remove apenas sessões expiradas (TTL) — nada de apagar por userId
  const expiredBefore = new Date(Date.now() - SESSION_TTL_MS);
  await prisma.farmSession.deleteMany({
    where: { farmId, lastSeenAt: { lt: expiredBefore } },
  });

  // 🔴 REMOVIDO: deleteMany({ where: { farmId, userId } })
  // Essa linha restringia a 1 sessão por usuário, o que nunca foi pedido.
  // O limite deve valer só para o total de sessões da fazenda.

  if (seatLimit !== null) {
    const activeSessions = await prisma.farmSession.findMany({
      where: { farmId },
      orderBy: { lastSeenAt: 'asc' },
    });

    if (activeSessions.length >= seatLimit) {
      const sorted = [...activeSessions].sort((a, b) => {
        const aPrio = EVICTION_PRIORITY[a.role] ?? 0;
        const bPrio = EVICTION_PRIORITY[b.role] ?? 0;
        if (aPrio !== bPrio) return aPrio - bPrio;
        return a.lastSeenAt.getTime() - b.lastSeenAt.getTime();
      });

      const toEvict = sorted[0];

      if (toEvict && toEvict.role !== 'OWNER') {
         console.log(`[farmSessions] Limite de assentos atingido. Expulsando sessão para o usuário: ${toEvict.userId}`);
        await prisma.farmSession.delete({ where: { id: toEvict.id } });

        await prisma.notification.create({
          data: {
            userId: toEvict.userId,
            message: `Você foi desconectado da fazenda "${farm?.name ?? ''}" porque o limite de sessões simultâneas do plano foi atingido. Faça login novamente.`,
            notifyAt: new Date(),
            read: false,
          },
        });
      }
    }
  }

  await prisma.farmSession.create({
    data: { userId, farmId, role, jti, lastSeenAt: new Date() },
  });

  console.log(`[farmSessions] Sessão criada com sucesso para o usuário: ${userId} na fazenda: ${farmId}`);
}

/**
 * Verifica se a sessão ainda é válida e atualiza lastSeenAt.
 * Retorna false se a sessão foi evictada ou expirou.
 */
export async function validateFarmSession(jti: string): Promise<boolean> {
  const session = await prisma.farmSession.findUnique({
    where: { jti },
    select: { id: true },
  });

  if (!session) return false;

  // Atualiza lastSeenAt para manter a sessão ativa
  await prisma.farmSession.update({
    where: { jti },
    data: { lastSeenAt: new Date() },
  });

  return true;
}

/**
 * Remove a sessão ao fazer logout.
 */
export async function deleteFarmSession(jti: string): Promise<void> {
  try {
    await prisma.farmSession.delete({ where: { jti } });
  } catch {
    // Ignora se a sessão já não existe
  }
}
