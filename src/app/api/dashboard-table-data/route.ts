import { NextResponse } from 'next/server';
import {
  fetchUsers,
  fetchAnimals,
  fetchLivestockStats,
  fetchExternalBulls,
} from '@/lib/fetchData';
import { requireFarmContext } from '@/lib/tenant';

export async function GET() {
  try {
    const { context, error, status } = await requireFarmContext('view_animals');
    if (!context) return NextResponse.json({ error }, { status });

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
