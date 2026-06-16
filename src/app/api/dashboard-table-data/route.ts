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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const farmOwnerId = (context.farm as any).ownerUserId as string | null;

    // Migrate only the farm owner's animals/bulls that have no farmId yet.
    // Never migrate the logged-in user's animals if they're a member of someone else's farm.
    if (farmOwnerId) {
      await Promise.all([
        prisma.animal.updateMany({
          where: { ownerId: farmOwnerId, farmId: null },
          data: { farmId: context.farm.id },
        }),
        prisma.externalBull.updateMany({
          where: { ownerId: farmOwnerId, farmId: null },
          data: { farmId: context.farm.id },
        }),
      ]);
    }

    // Fetch strictly by farmId — prevents animals from leaking across farms.
    const users = await fetchUsers();
    const [animals, livestockStats, externalBulls] = await Promise.all([
      fetchAnimals(undefined, context.farm.id),
      fetchLivestockStats(undefined, context.farm.id),
      fetchExternalBulls(undefined, context.farm.id),
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
