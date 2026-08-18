import prisma from '@/lib/prisma';

const STRIPE_API = 'https://api.stripe.com/v1';

type FarmBillingFields = {
  name: string;
  subscriptionStatus: string;
  stripeSubscriptionId: string | null;
  stripeSubscriptionItemId: string | null;
  stripePlanTier: string | null;
};

/**
 * Lê os campos de billing por assento da fazenda tolerando a ausência das
 * colunas `stripePlanTier`/`stripeSubscriptionItemId` em bancos ainda não
 * migrados — em vez de derrubar a requisição inteira com um P2022, retorna
 * `null` e deixa o chamador tratar como "sem info de plano/assento".
 */
export async function getFarmBillingFieldsSafe(
  farmId: string
): Promise<FarmBillingFields | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (await (prisma.farm.findUnique as any)({
      where: { id: farmId },
      select: {
        name: true,
        subscriptionStatus: true,
        stripeSubscriptionId: true,
        stripeSubscriptionItemId: true,
        stripePlanTier: true,
      },
    })) as FarmBillingFields | null;
  } catch (error) {
    console.error(
      '[BILLING] Falha ao ler campos de billing da fazenda (coluna ausente no banco?):',
      error
    );
    return null;
  }
}

/**
 * Atualiza a Farm tolerando a ausência das colunas `stripeSubscriptionItemId`/
 * `stripePlanTier` no banco: tenta o update completo e, se ele falhar por
 * coluna inexistente (P2022), refaz sem esses dois campos para não perder as
 * demais atualizações (status da assinatura, customer id, etc).
 */
export async function updateFarmSafe(
  farmId: string,
  data: Record<string, unknown>
) {
  try {
    return await prisma.farm.update({ where: { id: farmId }, data });
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code !== 'P2022') throw error;

    const safeData = { ...data };
    delete safeData.stripeSubscriptionItemId;
    delete safeData.stripePlanTier;
    console.error(
      '[BILLING] Farm.stripeSubscriptionItemId/stripePlanTier ausentes no banco — atualizando sem esses campos:',
      error
    );
    return prisma.farm.update({ where: { id: farmId }, data: safeData });
  }
}

/** Contagem de membros cobráveis — exclui VIEWER */
export async function getBillableSeatCount(farmId: string): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = (await (prisma.farmMembership.findMany as any)({
    where: { farmId },
    select: { role: true },
  })) as { role: string }[];

  const billable = rows.filter((m) => m.role !== 'VIEWER').length;
  return Math.max(1, billable);
}

/**
 * Busca o primeiro subscription item ID de uma assinatura Stripe.
 * Usado após o checkout para salvar o item ID no banco.
 */
export async function fetchSubscriptionItemId(
  subscriptionId: string
): Promise<string | null> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  const res = await fetch(
    `${STRIPE_API}/subscriptions/${subscriptionId}?expand[]=items`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );

  if (!res.ok) return null;

  const sub = (await res.json()) as {
    items?: { data?: { id: string }[] };
  };

  return sub.items?.data?.[0]?.id ?? null;
}
