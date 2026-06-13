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

    // Animals are stored with ownerId = farm.ownerUserId (see addAnimals route).
    // Use ownerUserId for all queries so the owner's animals are always found.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const farmOwnerId = (context.farm as any).ownerUserId ?? context.user.id;

    // Silently migrate animals/bulls that have no farmId yet.
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

    const users = await fetchUsers();
    const [animals, livestockStats, externalBulls] = await Promise.all([
      fetchAnimals(farmOwnerId, context.farm.id),
      fetchLivestockStats(farmOwnerId, context.farm.id),
      fetchExternalBulls(farmOwnerId, context.farm.id),
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
