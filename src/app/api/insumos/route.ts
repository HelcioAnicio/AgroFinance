import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

export async function GET() {
  const { context, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ error: 'Unauthorized' }, { status: status ?? 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insumos = await (prisma as any).insumo.findMany({
    where: { farmId: context.farm.id },
    include: {
      movimentos: {
        orderBy: { data: 'desc' },
        take: 20,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(insumos);
}

export async function POST(req: NextRequest) {
  const { context, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error: 'Unauthorized' }, { status: status ?? 401 });

  const body = await req.json();
  const { nome, categoria, unidade, estoqueMin, custoPorUnid, observacoes } = body;

  if (!nome || !categoria || !unidade) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insumo = await (prisma as any).insumo.create({
    data: {
      farmId: context.farm.id,
      nome,
      categoria,
      unidade,
      quantidade: 0,
      estoqueMin: estoqueMin ? Number(estoqueMin) : null,
      custoPorUnid: Number(custoPorUnid ?? 0),
      observacoes: observacoes || null,
    },
  });

  return NextResponse.json(insumo, { status: 201 });
}
