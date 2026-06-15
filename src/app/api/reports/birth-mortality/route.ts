import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

const TERMINAL_STATUSES = ['dead', 'morto', 'sold', 'vendido', 'lost', 'perdida'];

function normalizeStatus(s: string): 'dead' | 'sold' | 'lost' | null {
  if (s === 'dead' || s === 'morto') return 'dead';
  if (s === 'sold' || s === 'vendido') return 'sold';
  if (s === 'lost' || s === 'perdida') return 'lost';
  return null;
}

type AnimalSummary = {
  id: string;
  manualId: string;
  gender: string;
  date: string;
};

type MonthData = {
  month: number;
  label: string;
  males: number;
  females: number;
  total: number;
  animals: AnimalSummary[];
};

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function emptyMonths(): MonthData[] {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    label: MONTH_LABELS[i],
    males: 0,
    females: 0,
    total: 0,
    animals: [],
  }));
}

export async function GET(request: Request) {
  const { context, error, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');

  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();
  if (isNaN(year)) return NextResponse.json({ error: 'Ano inválido.' }, { status: 400 });

  const monthFilter = monthParam ? parseInt(monthParam) : null;
  if (monthFilter !== null && (isNaN(monthFilter) || monthFilter < 1 || monthFilter > 12)) {
    return NextResponse.json({ error: 'Mês inválido.' }, { status: 400 });
  }

  const startDate = monthFilter
    ? new Date(year, monthFilter - 1, 1)
    : new Date(year, 0, 1);
  const endDate = monthFilter
    ? new Date(year, monthFilter, 0, 23, 59, 59, 999)
    : new Date(year, 11, 31, 23, 59, 59, 999);

  const farmId = context.farm.id;

  // ── Births ──────────────────────────────────────────────────────────────
  const bornAnimals = await prisma.animal.findMany({
    where: {
      farmId,
      birthDate: { gte: startDate, lte: endDate },
    },
    select: { id: true, manualId: true, gender: true, birthDate: true },
  });

  const birthsByMonth = emptyMonths();
  for (const a of bornAnimals) {
    const m = new Date(a.birthDate).getMonth(); // 0-indexed
    const entry = birthsByMonth[m];
    const isMale = a.gender === 'male';
    if (isMale) entry.males++; else entry.females++;
    entry.total++;
    entry.animals.push({
      id: a.id,
      manualId: a.manualId,
      gender: a.gender,
      date: a.birthDate.toISOString(),
    });
  }

  const totalMaleBirths = bornAnimals.filter((a) => a.gender === 'male').length;
  const totalFemaleBirths = bornAnimals.filter((a) => a.gender !== 'male').length;

  // ── Exits (dead / sold / lost) ──────────────────────────────────────────
  // Strategy: animals whose CURRENT status is terminal AND whose most recent
  // status history entry for that status falls within the requested period.
  const exitAnimals = await prisma.animal.findMany({
    where: {
      farmId,
      status: { in: ['dead', 'morto', 'sold', 'vendido', 'lost', 'perdida'] },
    },
    select: {
      id: true,
      manualId: true,
      gender: true,
      status: true,
      statusHistories: {
        where: { newStatus: { in: TERMINAL_STATUSES } },
        orderBy: { changedAt: 'desc' },
        take: 1,
        select: { newStatus: true, changedAt: true },
      },
    },
  });

  const deadByMonth = emptyMonths();
  const soldByMonth = emptyMonths();
  const lostByMonth = emptyMonths();

  let totalDead = 0, totalDeadMales = 0, totalDeadFemales = 0;
  let totalSold = 0, totalSoldMales = 0, totalSoldFemales = 0;
  let totalLost = 0, totalLostMales = 0, totalLostFemales = 0;

  for (const a of exitAnimals) {
    const lastHistory = a.statusHistories[0];
    if (!lastHistory) continue;

    // Confirm the last terminal history entry matches the animal's current status
    if (normalizeStatus(lastHistory.newStatus) !== normalizeStatus(a.status)) continue;

    const changedAt = new Date(lastHistory.changedAt);
    if (changedAt < startDate || changedAt > endDate) continue;

    const m = changedAt.getMonth(); // 0-indexed
    const isMale = a.gender === 'male';
    const normalStatus = normalizeStatus(a.status);
    const summary: AnimalSummary = {
      id: a.id,
      manualId: a.manualId,
      gender: a.gender,
      date: changedAt.toISOString(),
    };

    if (normalStatus === 'dead') {
      deadByMonth[m].total++;
      if (isMale) { deadByMonth[m].males++; totalDeadMales++; } else { deadByMonth[m].females++; totalDeadFemales++; }
      deadByMonth[m].animals.push(summary);
      totalDead++;
    } else if (normalStatus === 'sold') {
      soldByMonth[m].total++;
      if (isMale) { soldByMonth[m].males++; totalSoldMales++; } else { soldByMonth[m].females++; totalSoldFemales++; }
      soldByMonth[m].animals.push(summary);
      totalSold++;
    } else if (normalStatus === 'lost') {
      lostByMonth[m].total++;
      if (isMale) { lostByMonth[m].males++; totalLostMales++; } else { lostByMonth[m].females++; totalLostFemales++; }
      lostByMonth[m].animals.push(summary);
      totalLost++;
    }
  }

  return NextResponse.json({
    year,
    month: monthFilter,
    births: {
      total: bornAnimals.length,
      males: totalMaleBirths,
      females: totalFemaleBirths,
      byMonth: birthsByMonth,
    },
    exits: {
      dead: { total: totalDead, males: totalDeadMales, females: totalDeadFemales, byMonth: deadByMonth },
      sold: { total: totalSold, males: totalSoldMales, females: totalSoldFemales, byMonth: soldByMonth },
      lost: { total: totalLost, males: totalLostMales, females: totalLostFemales, byMonth: lostByMonth },
    },
  });
}
