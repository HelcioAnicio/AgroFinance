import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { context, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error: 'Unauthorized' }, { status: status ?? 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insumo = await (prisma as any).insumo.findFirst({
    where: { id: params.id, farmId: context.farm.id },
  });
  if (!insumo) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const { tipo, quantidade, notas, data } = body;

  if (!tipo || !quantidade || !data) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
  }

  const qty = Number(quantidade);
  if (isNaN(qty) || qty <= 0) {
    return NextResponse.json({ error: 'Quantidade inválida' }, { status: 400 });
  }

  // Compute new stock balance
  let delta = qty;
  if (tipo === 'SAIDA') delta = -qty;
  // AJUSTE: set absolute — handled differently
  const isAjuste = tipo === 'AJUSTE';

  const resultado = await (prisma as any).$transaction(async (tx: any) => {
    await tx.insumoMovimento.create({
      data: {
        insumoId: params.id,
        tipo,
        quantidade: qty,
        notas: notas || null,
        data: new Date(data),
      },
    });

    const newQty = isAjuste ? qty : Number(insumo.quantidade) + delta;

    return tx.insumo.update({
      where: { id: params.id },
      data: { quantidade: newQty },
      include: {
        movimentos: { orderBy: { data: 'desc' }, take: 20 },
      },
    });
  });

  return NextResponse.json(resultado, { status: 201 });
}
