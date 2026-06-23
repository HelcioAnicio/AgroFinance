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

type SessionRow = {
  id: string;
  jti: string;
  userId: string;
  farmId: string;
  role: string;
  lastSeenAt: Date;
};

/**
 * Registra uma nova sessão para o usuário na fazenda ativa.
 * Aplica o limite de sessões simultâneas do plano e evicta a sessão
 * mais antiga de menor hierarquia se necessário.
 * Nunca evicta o OWNER.
 */
export async function createFarmSession(
  userId: string,
  jti: string
): Promise<void> {
  // Busca fazenda ativa e role do usuário
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUser = await (prisma.user.findUnique as any)({
    where: { id: userId },
    select: {
      activeFarmId: true,
      farmMemberships: {
        select: { farmId: true, role: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  }) as {
    activeFarmId: string | null;
    farmMemberships: { farmId: string; role: string }[];
  } | null;

  if (!dbUser) return;

  const membership =
    (dbUser.activeFarmId
      ? dbUser.farmMemberships.find((m) => m.farmId === dbUser.activeFarmId)
      : null) ??
    dbUser.farmMemberships.find((m) => m.role === 'OWNER') ??
    dbUser.farmMemberships[0];

  if (!membership) return; // Usuário sem fazenda ainda

  const { farmId, role } = membership;

  // Busca tier do plano da fazenda
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const farm = await (prisma.farm.findUnique as any)({
    where: { id: farmId },
    select: { stripePlanTier: true, name: true },
  }) as { stripePlanTier: string | null; name: string } | null;

  const seatLimit = farm?.stripePlanTier
    ? getSeatLimitForTier(farm.stripePlanTier)
    : null;

  // Remove sessões expiradas desta fazenda
  const expiredBefore = new Date(Date.now() - SESSION_TTL_MS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.farmSession.deleteMany as any)({
    where: { farmId, lastSeenAt: { lt: expiredBefore } },
  });

  // Remove sessões anteriores do próprio usuário nesta fazenda (sempre fresh)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.farmSession.deleteMany as any)({
    where: { farmId, userId },
  });

  if (seatLimit !== null) {
    // Conta sessões ativas de outros usuários
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeSessions = await (prisma.farmSession.findMany as any)({
      where: { farmId },
      orderBy: { lastSeenAt: 'asc' }, // mais antigo primeiro
    }) as SessionRow[];

    if (activeSessions.length >= seatLimit) {
      // Ordena: menor prioridade (mais expendável) primeiro;
      // empate: mais antigo (lastSeenAt menor) primeiro
      const sorted = [...activeSessions].sort((a, b) => {
        const aPrio = EVICTION_PRIORITY[a.role] ?? 0;
        const bPrio = EVICTION_PRIORITY[b.role] ?? 0;
        if (aPrio !== bPrio) return aPrio - bPrio;
        return a.lastSeenAt.getTime() - b.lastSeenAt.getTime();
      });

      const toEvict = sorted[0];

      // Nunca evicta OWNER
      if (toEvict && toEvict.role !== 'OWNER') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma.farmSession.delete as any)({ where: { id: toEvict.id } });

        // Notifica o usuário evictado via sistema de notificações
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

  // Cria a nova sessão
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.farmSession.create as any)({
    data: { userId, farmId, role, jti, lastSeenAt: new Date() },
  });
}

/**
 * Verifica se a sessão ainda é válida e atualiza lastSeenAt.
 * Retorna false se a sessão foi evictada ou expirou.
 */
export async function validateFarmSession(jti: string): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await (prisma.farmSession.findUnique as any)({
    where: { jti },
    select: { id: true },
  }) as { id: string } | null;

  if (!session) return false;

  // Atualiza lastSeenAt para manter a sessão ativa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.farmSession.update as any)({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma.farmSession.delete as any)({ where: { jti } });
  } catch {
    // Ignora se a sessão já não existe
  }
}
