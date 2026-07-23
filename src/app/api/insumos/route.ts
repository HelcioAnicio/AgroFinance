import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';
import { notifyLowStock } from '@/lib/notifications';

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
  const {
    nome,
    categoria,
    unidade,
    estoqueMin,
    custoPorUnid,
    observacoes,
    quantidadeInicial,
    dataEntrada,
    lancarFinanceiro,
    statusFinanceiro,
  } = body;

  if (!nome || !categoria || !unidade) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
  }

  const custo = Number(custoPorUnid ?? 0);
  const estoqueMinNum = estoqueMin ? Number(estoqueMin) : null;
  const qtyInicial = Number(quantidadeInicial ?? 0);
  const entradaData = dataEntrada ? new Date(dataEntrada) : new Date();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insumo = await (prisma as any).$transaction(async (tx: any) => {
    const created = await tx.insumo.create({
      data: {
        farmId: context.farm.id,
        nome,
        categoria,
        unidade,
        quantidade: qtyInicial > 0 ? qtyInicial : 0,
        estoqueMin: estoqueMinNum,
        custoPorUnid: custo,
        observacoes: observacoes || null,
      },
    });

    if (qtyInicial > 0) {
      await tx.insumoMovimento.create({
        data: {
          insumoId: created.id,
          tipo: 'ENTRADA',
          quantidade: qtyInicial,
          notas: 'Estoque inicial no cadastro',
          data: entradaData,
        },
      });

      if (lancarFinanceiro && custo > 0) {
        await tx.transaction.create({
          data: {
            userId: context.user.id,
            farmId: context.farm.id,
            type: 'expense',
            category: 'Insumos',
            amount: qtyInicial * custo,
            date: entradaData,
            description: `Compra de ${nome} — estoque inicial (${qtyInicial} ${unidade})`,
            status: Boolean(statusFinanceiro),
          },
        });
      }
    }

    return tx.insumo.findUnique({
      where: { id: created.id },
      include: { movimentos: { orderBy: { data: 'desc' }, take: 20 } },
    });
  });

  if (
    estoqueMinNum != null &&
    Number(insumo.quantidade) <= estoqueMinNum
  ) {
    await notifyLowStock(
      context.farm.id,
      nome,
      Number(insumo.quantidade),
      unidade,
      estoqueMinNum
    );
  }

  return NextResponse.json(insumo, { status: 201 });
}
