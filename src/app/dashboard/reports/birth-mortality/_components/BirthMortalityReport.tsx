'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Baby, Skull, TrendingDown, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

type ExitGroup = {
  total: number;
  males: number;
  females: number;
  byMonth: MonthData[];
};

type ReportData = {
  year: number;
  month: number | null;
  births: {
    total: number;
    males: number;
    females: number;
    byMonth: MonthData[];
  };
  exits: {
    dead: ExitGroup;
    sold: ExitGroup;
    lost: ExitGroup;
  };
};

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - i);

function genderLabel(g: string) {
  return g === 'male' ? '♂' : '♀';
}

function genderColor(g: string) {
  return g === 'male' ? 'text-blue-500' : 'text-pink-500';
}

function AnimalRow({ a }: { a: AnimalSummary }) {
  return (
    <Link
      href={`/dashboard/${a.id}`}
      className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm hover:bg-muted/60 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className={`font-bold text-base ${genderColor(a.gender)}`}>{genderLabel(a.gender)}</span>
        <span className="font-mono font-semibold uppercase">{a.manualId}</span>
      </div>
      <span className="text-xs text-muted-foreground">
        {new Date(a.date).toLocaleDateString('pt-BR')}
      </span>
    </Link>
  );
}

function MonthAccordion({ month, accent }: { month: MonthData; accent: string }) {
  const [open, setOpen] = useState(false);
  if (month.total === 0) return null;

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/20"
      >
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${accent}`} />
          <span>{month.label}</span>
          <span className="text-muted-foreground font-normal">{month.total} animal{month.total !== 1 ? 'is' : ''}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-500 text-xs">♂ {month.males}</span>
          <span className="text-pink-500 text-xs">♀ {month.females}</span>
          {open ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
        </div>
      </button>
      {open && (
        <div className="border-t px-4 py-3 space-y-2">
          {month.animals.map((a) => <AnimalRow key={a.id} a={a} />)}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  title,
  icon,
  total,
  males,
  females,
  byMonth,
  accentBg,
  accentDot,
  iconColor,
}: {
  title: string;
  icon: React.ReactNode;
  total: number;
  males: number;
  females: number;
  byMonth: MonthData[];
  accentBg: string;
  accentDot: string;
  iconColor: string;
}) {
  const activeMonths = byMonth.filter((m) => m.total > 0);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-xl p-2 ${accentBg}`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <h2 className="font-bold text-base">{title}</h2>
        </div>
        <span className={`text-2xl font-bold ${iconColor}`}>{total}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Machos ♂</p>
          <p className="text-lg font-bold text-blue-600">{males}</p>
        </div>
        <div className="rounded-xl bg-pink-50 px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Fêmeas ♀</p>
          <p className="text-lg font-bold text-pink-600">{females}</p>
        </div>
      </div>

      {activeMonths.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Por mês</p>
          {activeMonths.map((m) => (
            <MonthAccordion key={m.month} month={m} accent={accentDot} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum registro no período.</p>
      )}
    </div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-muted/40">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-6 text-right text-xs font-semibold">{value}</span>
    </div>
  );
}

export function BirthMortalityReport() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState<number | ''>('');
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchReport() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ year: String(year) });
      if (month !== '') params.set('month', String(month));
      const res = await fetch(`/api/reports/birth-mortality?${params}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReport(); }, [year, month]);

  const maxBar = data
    ? Math.max(
        data.births.total,
        data.exits.dead.total,
        data.exits.sold.total,
        data.exits.lost.total,
        1,
      )
    : 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="rounded-xl border bg-white p-2 shadow-sm hover:bg-muted/20">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Natalidade e Mortalidade</h1>
          <p className="text-sm text-muted-foreground">Controle por período</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="flex-1 rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:border-primary shadow-sm"
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value === '' ? '' : Number(e.target.value))}
          className="flex-1 rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:border-primary shadow-sm"
        >
          <option value="">Todos os meses</option>
          {MONTH_LABELS.map((l, i) => (
            <option key={i + 1} value={i + 1}>{l}</option>
          ))}
        </select>
      </div>

      {/* Summary cards */}
      {loading && (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm animate-pulse h-24" />
          ))}
        </div>
      )}

      {!loading && data && (
        <>
          <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
            <h2 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Resumo do período</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Baby className="size-4 text-green-500 shrink-0" />
                <span className="w-20 font-medium">Nascimentos</span>
                <MiniBar value={data.births.total} max={maxBar} color="bg-green-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Skull className="size-4 text-red-500 shrink-0" />
                <span className="w-20 font-medium">Mortes</span>
                <MiniBar value={data.exits.dead.total} max={maxBar} color="bg-red-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShoppingBag className="size-4 text-amber-500 shrink-0" />
                <span className="w-20 font-medium">Vendas</span>
                <MiniBar value={data.exits.sold.total} max={maxBar} color="bg-amber-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="size-4 text-orange-500 shrink-0" />
                <span className="w-20 font-medium">Perdas</span>
                <MiniBar value={data.exits.lost.total} max={maxBar} color="bg-orange-400" />
              </div>
            </div>
          </div>

          <SectionCard
            title="Nascimentos"
            icon={<Baby className="size-5" />}
            total={data.births.total}
            males={data.births.males}
            females={data.births.females}
            byMonth={data.births.byMonth}
            accentBg="bg-green-50"
            accentDot="bg-green-400"
            iconColor="text-green-600"
          />

          <SectionCard
            title="Mortes"
            icon={<Skull className="size-5" />}
            total={data.exits.dead.total}
            males={data.exits.dead.males}
            females={data.exits.dead.females}
            byMonth={data.exits.dead.byMonth}
            accentBg="bg-red-50"
            accentDot="bg-red-400"
            iconColor="text-red-600"
          />

          <SectionCard
            title="Vendas"
            icon={<ShoppingBag className="size-5" />}
            total={data.exits.sold.total}
            males={data.exits.sold.males}
            females={data.exits.sold.females}
            byMonth={data.exits.sold.byMonth}
            accentBg="bg-amber-50"
            accentDot="bg-amber-400"
            iconColor="text-amber-600"
          />

          <SectionCard
            title="Perdas"
            icon={<TrendingDown className="size-5" />}
            total={data.exits.lost.total}
            males={data.exits.lost.males}
            females={data.exits.lost.females}
            byMonth={data.exits.lost.byMonth}
            accentBg="bg-orange-50"
            accentDot="bg-orange-400"
            iconColor="text-orange-600"
          />
        </>
      )}
    </div>
  );
}
