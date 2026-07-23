import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';
import { notifyLowStock } from '@/lib/notifications';

export async function POST(
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insumo = await (prisma as any).insumo.findFirst({
    where: { id: id, farmId: context.farm.id },
  });
  if (!insumo)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const { tipo, quantidade, notas, data, lancarFinanceiro, valorFinanceiro, statusFinanceiro } =
    body;

  if (!tipo || !quantidade || !data) {
    return NextResponse.json(
      { error: 'Campos obrigatórios ausentes' },
      { status: 400 }
    );
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
  const oldQty = Number(insumo.quantidade);
  const movData = new Date(data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultado = await (prisma as any).$transaction(async (tx: any) => {
    await tx.insumoMovimento.create({
      data: {
        insumoId: id,
        tipo,
        quantidade: qty,
        notas: notas || null,
        data: movData,
      },
    });

    const newQty = isAjuste ? qty : oldQty + delta;

    if (tipo === 'ENTRADA' && lancarFinanceiro && Number(valorFinanceiro) > 0) {
      await tx.transaction.create({
        data: {
          userId: context.user.id,
          farmId: context.farm.id,
          type: 'expense',
          category: 'Insumos',
          amount: Number(valorFinanceiro),
          date: movData,
          description: `Compra de ${insumo.nome} (${qty} ${insumo.unidade})${notas ? ` — ${notas}` : ''}`,
          status: Boolean(statusFinanceiro),
        },
      });
    }

    return tx.insumo.update({
      where: { id: id },
      data: { quantidade: newQty },
      include: {
        movimentos: { orderBy: { data: 'desc' }, take: 20 },
      },
    });
  });

  const estoqueMinNum =
    resultado.estoqueMin != null ? Number(resultado.estoqueMin) : null;
  const newQty = Number(resultado.quantidade);
  const wasLow = estoqueMinNum != null && oldQty <= estoqueMinNum;
  const isLow = estoqueMinNum != null && newQty <= estoqueMinNum;

  if (!wasLow && isLow && estoqueMinNum != null) {
    await notifyLowStock(
      context.farm.id,
      insumo.nome,
      newQty,
      insumo.unidade,
      estoqueMinNum
    );
  }

  return NextResponse.json(resultado, { status: 201 });
}
