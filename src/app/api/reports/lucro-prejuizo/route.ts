import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

export async function GET(req: NextRequest) {
  const { context, status } = await requireFarmContext('view_finance');
  if (!context) return NextResponse.json({ error: 'Unauthorized' }, { status: status ?? 401 });

  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get('year') ?? new Date().getFullYear());

  const farmId = context.farm.id;

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const transactions = await prisma.transaction.findMany({
    where: {
      farmId,
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { date: 'asc' },
  });

  // Active animals count (status = 'active')
  const activeAnimals = await prisma.animal.count({
    where: { farmId, status: 'active' },
  });

  // Aggregate by month
  type MonthRow = {
    month: number;
    receitas: number;
    despesas: number;
    lucro: number;
    porCategoria: Record<string, number>;
  };

  const byMonth: MonthRow[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    receitas: 0,
    despesas: 0,
    lucro: 0,
    porCategoria: {},
  }));

  let totalReceitas = 0;
  let totalDespesas = 0;

  for (const t of transactions) {
    const month = new Date(t.date).getMonth(); // 0-indexed
    const amount = Number(t.amount);
    if (t.type === 'income') {
      byMonth[month].receitas += amount;
      totalReceitas += amount;
    } else {
      byMonth[month].despesas += amount;
      totalDespesas += amount;
      byMonth[month].porCategoria[t.category] =
        (byMonth[month].porCategoria[t.category] ?? 0) + amount;
    }
    byMonth[month].lucro = byMonth[month].receitas - byMonth[month].despesas;
  }

  // Expense breakdown by category for the full year
  const despesasPorCategoria: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const expenseTransactions = (transactions as any[]).filter((tx: { type: string }) => tx.type === 'expense');
  for (const t of expenseTransactions) {
    despesasPorCategoria[t.category] =
      (despesasPorCategoria[t.category] ?? 0) + Number(t.amount);
  }

  const custoPorCabeca = activeAnimals > 0 ? totalDespesas / activeAnimals : 0;

  return NextResponse.json({
    year,
    activeAnimals,
    totalReceitas,
    totalDespesas,
    lucroLiquido: totalReceitas - totalDespesas,
    margem: totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas) * 100 : 0,
    custoPorCabeca,
    byMonth,
    despesasPorCategoria,
  });
}
