import { NextResponse } from 'next/server';
import {
  fetchUsers,
  fetchAnimals,
  fetchLivestockStats,
  fetchExternalBulls,
} from '@/lib/fetchData';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { context, error, status } = await requireFarmContext('view_animals');
    if (!context) return NextResponse.json({ error }, { status });

    // Animals may be stored with ownerId = farm.ownerUserId OR ownerId = user.id
    // depending on how/when they were created. Cover both to be safe.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const farmOwnerId = (context.farm as any).ownerUserId as string | null;
    const ownerIds = [...new Set([farmOwnerId, context.user.id].filter(Boolean))] as string[];
    const primaryOwnerId = farmOwnerId ?? context.user.id;

    // Silently migrate animals/bulls that have no farmId yet, for any matching owner.
    await Promise.all([
      ...ownerIds.map((ownerId) =>
        prisma.animal.updateMany({
          where: { ownerId, farmId: null },
          data: { farmId: context.farm.id },
        })
      ),
      ...ownerIds.map((ownerId) =>
        prisma.externalBull.updateMany({
          where: { ownerId, farmId: null },
          data: { farmId: context.farm.id },
        })
      ),
    ]);

    // Pass all possible ownerIds so the OR query covers every scenario.
    const extraOwnerIds = ownerIds.filter((id) => id !== primaryOwnerId);

    const users = await fetchUsers();
    const [animals, livestockStats, externalBulls] = await Promise.all([
      fetchAnimals(primaryOwnerId, context.farm.id, extraOwnerIds),
      fetchLivestockStats(primaryOwnerId, context.farm.id, extraOwnerIds),
      fetchExternalBulls(primaryOwnerId, context.farm.id, extraOwnerIds),
    ]);

    return NextResponse.json({
      animals,
      users,
      livestockStats,
      externalBulls,
      farm: context.farm,
      role: context.role,
    });
  } catch (error) {
    console.error('Error fetching dashboard table data:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados' },
      { status: 500 }
    );
  }
}
