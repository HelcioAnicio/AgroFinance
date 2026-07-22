import { NextResponse } from 'next/server';
import { fetchAnimalById } from '@/lib/fetchData';
import { requireFarmContext } from '@/lib/tenant';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { context, error, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ message: error }, { status });

  const { id } = await params;
  const animal = await fetchAnimalById(id, context.farm.id);

  if (!animal) {
    return NextResponse.json({ message: 'Animal não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ animal });
}
