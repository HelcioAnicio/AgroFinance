import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;

  const { context, status } = await requireFarmContext('manage_animals');
  if (!context)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: status ?? 401 }
    );

  const body = await req.json();
  const { nome, categoria, unidade, estoqueMin, custoPorUnid, observacoes } =
    body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await (prisma as any).insumo.findFirst({
    where: { id: id, farmId: context.farm.id },
  });
  if (!existing)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updated = await (prisma as any).insumo.update({
    where: { id: id },
    data: {
      nome,
      categoria,
      unidade,
      estoqueMin: estoqueMin != null ? Number(estoqueMin) : null,
      custoPorUnid: Number(custoPorUnid ?? 0),
      observacoes: observacoes || null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  const { context, status } = await requireFarmContext('manage_animals');
  if (!context)
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: status ?? 401 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = await (prisma as any).insumo.findFirst({
    where: { id: id, farmId: context.farm.id },
  });
  if (!existing)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).insumo.delete({ where: { id: id } });

  return NextResponse.json({ ok: true });
}
