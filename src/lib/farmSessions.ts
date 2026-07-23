import prisma from '@/lib/prisma';
import { getSeatLimitForTier } from '@/lib/billing';
import { getFarmBillingFieldsSafe } from '@/lib/stripeSeats';

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

// Precisa ser >= session.maxAge (src/lib/auth.ts): se for menor, uma linha
// pode ser limpa enquanto o cookie da sessão correspondente ainda é válido,
// e o dono dela é deslogado à força sem ter feito nada de errado — foi
// exatamente isso que causava os deslogamentos aleatórios reportados.
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias de inatividade = sessão expirada

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
  const dbUser = (await (prisma.user.findUnique as any)({
    where: { id: userId },
    select: {
      activeFarmId: true,
      farmMemberships: {
        select: { farmId: true, role: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })) as {
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

  // Busca tier do plano da fazenda, tolerando colunas de billing ausentes
  const farm = await getFarmBillingFieldsSafe(farmId);

  const seatLimit = farm?.stripePlanTier
    ? getSeatLimitForTier(farm.stripePlanTier)
    : null;

  // Remove sessões expiradas desta fazenda
  const expiredBefore = new Date(Date.now() - SESSION_TTL_MS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.farmSession.deleteMany as any)({
    where: { farmId, lastSeenAt: { lt: expiredBefore } },
  });

  // NÃO removemos aqui as sessões anteriores do próprio usuário: com múltiplas
  // abas/dispositivos logados na mesma conta, um novo login (ex: reautenticação
  // silenciosa do Google) apagaria a sessão da outra aba/dispositivo e a
  // deslogaria — indistinguível de uma eviction real por limite de plano.
  // O limite de assentos (seatLimit abaixo) é o único motivo legítimo para
  // remover a sessão de alguém.

  if (seatLimit !== null) {
    // Conta sessões ativas de outros usuários
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeSessions = (await (prisma.farmSession.findMany as any)({
      where: { farmId },
      orderBy: { lastSeenAt: 'asc' }, // mais antigo primeiro
    })) as SessionRow[];

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
 * Retorna false se a sessão foi evictada/expirou E não foi possível curar.
 *
 * Autocura: hoje a evicção por limite de assentos é código morto (Farm não
 * tem as colunas de billing em produção — ver getFarmBillingFieldsSafe) e o
 * TTL é de 30 dias, então uma linha sumindo minutos depois de criada nunca é
 * uma evicção legítima — é uma lacuna não identificada nessa tabela. Como
 * não há hoje nenhum motivo real para derrubar o usuário, recriamos a linha
 * em vez de forçar logout (que era o sintoma reportado: deslogamentos
 * repetidos sem ninguém mais tendo entrado na fazenda).
 * Quando o limite de assentos for de fato ativado (colunas de billing
 * existirem), isso precisa ser revisitado para não recriar sessões
 * genuinamente evictadas.
 */
export async function validateFarmSession(
  jti: string,
  userId?: string
): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = (await (prisma.farmSession.findUnique as any)({
    where: { jti },
    select: { id: true },
  })) as { id: string } | null;

  if (session) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma.farmSession.update as any)({
      where: { jti },
      data: { lastSeenAt: new Date() },
    });
    return true;
  }

  console.warn(`[farmSessions] Sessão não encontrada para jti=${jti} — tentando autocura.`);

  if (!userId) return false;

  await createFarmSession(userId, jti);
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
