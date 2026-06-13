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

    // Silently migrate any animals/bulls that belong to this user but have no farmId yet.
    // This handles animals created before the multi-farm system was introduced.
    await Promise.all([
      prisma.animal.updateMany({
        where: { ownerId: context.user.id, farmId: null },
        data: { farmId: context.farm.id },
      }),
      prisma.externalBull.updateMany({
        where: { ownerId: context.user.id, farmId: null },
        data: { farmId: context.farm.id },
      }),
    ]);

    const users = await fetchUsers();
    const [animals, livestockStats, externalBulls] = await Promise.all([
      fetchAnimals(context.user.id, context.farm.id),
      fetchLivestockStats(context.user.id, context.farm.id),
      fetchExternalBulls(context.user.id, context.farm.id),
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
