'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  TrendingUp,
  TrendingDown,
  Download,
  ArrowLeft,
  Beef,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as XLSX from 'xlsx';

const CURRENCY = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const PERCENT = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1 });

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

interface MonthRow {
  month: number;
  receitas: number;
  despesas: number;
  lucro: number;
  porCategoria: Record<string, number>;
}

interface ReportData {
  year: number;
  activeAnimals: number;
  totalReceitas: number;
  totalDespesas: number;
  lucroLiquido: number;
  margem: number;
  custoPorCabeca: number;
  byMonth: MonthRow[];
  despesasPorCategoria: Record<string, number>;
}

export function LucroPrejuizoReport() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: d } = await axios.get<ReportData>(`/api/reports/lucro-prejuizo?year=${year}`);
      setData(d);
    } catch {
      toast.error('Erro ao carregar relatório');
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => { load(); }, [load]);

  function exportXLSX() {
    if (!data) return;

    const wb = XLSX.utils.book_new();

    // Sheet 1: Resumo anual
    const resumo = [
      ['Relatório Lucro / Prejuízo', data.year],
      [],
      ['Total de Receitas', data.totalReceitas],
      ['Total de Despesas', data.totalDespesas],
      ['Lucro Líquido', data.lucroLiquido],
      ['Margem (%)', data.margem / 100],
      ['Animais Ativos', data.activeAnimals],
      ['Custo por Cabeça', data.custoPorCabeca],
    ];
    const wsResumo = XLSX.utils.aoa_to_sheet(resumo);
    wsResumo['C3'] = { t: 'n', v: data.totalReceitas, z: 'R$ #,##0.00' };
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');

    // Sheet 2: Por mês
    const header = ['Mês', 'Receitas (R$)', 'Despesas (R$)', 'Lucro/Prejuízo (R$)'];
    const rows = data.byMonth.map((m) => [
      MONTH_LABELS[m.month - 1],
      m.receitas,
      m.despesas,
      m.lucro,
    ]);
    const wsMensal = XLSX.utils.aoa_to_sheet([header, ...rows]);
    XLSX.utils.book_append_sheet(wb, wsMensal, 'Mensal');

    // Sheet 3: Despesas por categoria
    const catHeader = ['Categoria', 'Total (R$)', '% do total'];
    const catRows = Object.entries(data.despesasPorCategoria)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, val]) => [
        cat,
        val,
        data.totalDespesas > 0 ? val / data.totalDespesas : 0,
      ]);
    const wsCateg = XLSX.utils.aoa_to_sheet([catHeader, ...catRows]);
    XLSX.utils.book_append_sheet(wb, wsCateg, 'Despesas por Categoria');

    XLSX.writeFile(wb, `lucro-prejuizo-${data.year}.xlsx`);
    toast.success('Arquivo exportado com sucesso');
  }

  const isProfit = (data?.lucroLiquido ?? 0) >= 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/reports/birth-mortality">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Relatório Lucro / Prejuízo</h1>
            <p className="text-sm text-muted-foreground">Resultado financeiro anual da fazenda</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={exportXLSX}
            disabled={!data || loading}
          >
            <Download className="size-4" /> Exportar XLSX
          </Button>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((k) => (
            <div key={k} className="h-28 animate-pulse rounded-2xl bg-muted/40" />
          ))}
        </div>
      )}

      {!loading && data && (
        <>
          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Receitas</p>
              <p className="mt-1 text-lg font-black text-green-600">{CURRENCY.format(data.totalReceitas)}</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Despesas</p>
              <p className="mt-1 text-lg font-black text-red-600">{CURRENCY.format(data.totalDespesas)}</p>
            </div>
            <div className={`rounded-2xl border p-4 shadow-sm ${isProfit ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {isProfit ? 'Lucro líquido' : 'Prejuízo'}
              </p>
              <div className="mt-1 flex items-center gap-1">
                {isProfit
                  ? <TrendingUp className="size-4 text-green-600" />
                  : <TrendingDown className="size-4 text-red-600" />}
                <p className={`text-lg font-black ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                  {CURRENCY.format(Math.abs(data.lucroLiquido))}
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Margem: {PERCENT.format(Math.abs(data.margem) / 100)}
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Beef className="size-4 text-muted-foreground" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Custo/cabeça</p>
              </div>
              <p className="mt-1 text-lg font-black text-primary">{CURRENCY.format(data.custoPorCabeca)}</p>
              <p className="text-[11px] text-muted-foreground">{data.activeAnimals} animais ativos</p>
            </div>
          </div>

          {/* Monthly table */}
          <div className="mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-5 py-3">
              <h2 className="font-semibold">Resultado mensal — {year}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2.5 text-left">Mês</th>
                    <th className="px-4 py-2.5 text-right text-green-600">Receitas</th>
                    <th className="px-4 py-2.5 text-right text-red-600">Despesas</th>
                    <th className="px-4 py-2.5 text-right">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byMonth.map((m) => {
                    const hasData = m.receitas > 0 || m.despesas > 0;
                    const pos = m.lucro >= 0;
                    return (
                      <tr key={m.month} className={`border-b last:border-0 ${!hasData ? 'opacity-40' : ''}`}>
                        <td className="px-4 py-2.5 font-medium">{MONTH_LABELS[m.month - 1]}</td>
                        <td className="px-4 py-2.5 text-right text-green-600">
                          {m.receitas > 0 ? CURRENCY.format(m.receitas) : '—'}
                        </td>
                        <td className="px-4 py-2.5 text-right text-red-600">
                          {m.despesas > 0 ? CURRENCY.format(m.despesas) : '—'}
                        </td>
                        <td className={`px-4 py-2.5 text-right font-semibold ${hasData ? (pos ? 'text-green-600' : 'text-red-600') : ''}`}>
                          {hasData ? (pos ? '+' : '') + CURRENCY.format(m.lucro) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-muted/20 text-sm font-bold">
                    <td className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-right text-green-700">{CURRENCY.format(data.totalReceitas)}</td>
                    <td className="px-4 py-3 text-right text-red-700">{CURRENCY.format(data.totalDespesas)}</td>
                    <td className={`px-4 py-3 text-right ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                      {isProfit ? '+' : ''}{CURRENCY.format(data.lucroLiquido)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Expenses by category */}
          {Object.keys(data.despesasPorCategoria).length > 0 && (
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-5 py-3">
                <h2 className="font-semibold">Despesas por categoria</h2>
              </div>
              <div className="divide-y">
                {Object.entries(data.despesasPorCategoria)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, val]) => {
                    const pct = data.totalDespesas > 0 ? (val / data.totalDespesas) * 100 : 0;
                    return (
                      <div key={cat} className="flex items-center gap-3 px-5 py-3">
                        <div className="flex-1">
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="font-medium">{cat}</span>
                            <span className="text-muted-foreground">{pct.toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted/40">
                            <div
                              className="h-full rounded-full bg-primary/70"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-28 text-right text-sm font-semibold text-red-600">
                          {CURRENCY.format(val)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Empty state */}
          {data.totalReceitas === 0 && data.totalDespesas === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-16 text-center">
              <TrendingUp className="mb-3 size-10 text-muted-foreground/40" />
              <p className="font-semibold text-muted-foreground">Nenhum lançamento em {year}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Registre receitas e despesas na aba{' '}
                <Link href="/dashboard/financial" className="text-primary underline">Financeiro</Link>{' '}
                para gerar o relatório.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
