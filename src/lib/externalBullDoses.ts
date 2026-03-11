import { Prisma } from '@prisma/client';

function buildUsageMap(ids: (string | null | undefined)[]) {
  const usage = new Map<string, number>();

  for (const id of ids) {
    if (!id) continue;
    usage.set(id, (usage.get(id) ?? 0) + 1);
  }

  return usage;
}

export async function decrementExternalBullDosesForUsageDelta(
  tx: Prisma.TransactionClient,
  ownerId: string,
  previousUsageIds: (string | null | undefined)[],
  nextUsageIds: (string | null | undefined)[]
) {
  const previousUsageMap = buildUsageMap(previousUsageIds);
  const nextUsageMap = buildUsageMap(nextUsageIds);

  for (const [externalBullId, nextCount] of nextUsageMap.entries()) {
    const previousCount = previousUsageMap.get(externalBullId) ?? 0;
    const dosesToDecrement = nextCount - previousCount;

    if (dosesToDecrement <= 0) continue;

    const result = await tx.externalBull.updateMany({
      where: {
        id: externalBullId,
        ownerId,
        dosesAvailable: {
          gte: dosesToDecrement,
        },
      },
      data: {
        dosesAvailable: {
          decrement: dosesToDecrement,
        },
      },
    });

    if (result.count === 0) {
      throw new Error(`EXTERNAL_BULL_DOSES_UNAVAILABLE:${externalBullId}`);
    }
  }
}
