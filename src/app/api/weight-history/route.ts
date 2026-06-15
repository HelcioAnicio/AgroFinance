import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';
import { parseWeightRecordType } from '@/lib/weightHistory';

export async function PUT(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID obrigatório.' }, { status: 400 });

  const body = await request.json();
  const { weight, recordType, measuredAt } = body;

  if (weight == null || !measuredAt) {
    return NextResponse.json({ error: 'weight e measuredAt são obrigatórios.' }, { status: 400 });
  }

  // Verify the record belongs to an animal in this farm
  const existing = await prisma.animalWeightHistory.findFirst({
    where: { id },
    include: { animal: { select: { farmId: true } } },
  });
  if (!existing || existing.animal.farmId !== context.farm.id) {
    return NextResponse.json({ error: 'Registro não encontrado.' }, { status: 404 });
  }

  const parsedDate = new Date(measuredAt);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }

  const updated = await prisma.animalWeightHistory.update({
    where: { id },
    data: {
      weight: Number(weight),
      recordType: parseWeightRecordType(recordType),
      measuredAt: parsedDate,
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID obrigatório.' }, { status: 400 });

  const existing = await prisma.animalWeightHistory.findFirst({
    where: { id },
    include: { animal: { select: { farmId: true } } },
  });
  if (!existing || existing.animal.farmId !== context.farm.id) {
    return NextResponse.json({ error: 'Registro não encontrado.' }, { status: 404 });
  }

  await prisma.animalWeightHistory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
