'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Pencil,
  Plus,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FinancialTransaction, TransactionType } from '@/types/financial';

const INCOME_CATEGORIES = [
  'Venda de Gado',
  'Venda de Bezerros',
  'Leite',
  'Safra',
  'Bonificacao',
  'Outras Receitas',
];

const EXPENSE_CATEGORIES = [
  'Racao',
  'Vacinas',
  'Combustivel',
  'Manutencao',
  'Folha',
  'Insumos',
  'Energia',
  'Outros Custos',
];

const MONTH_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
});

const DAY_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
});

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

interface FinancialDashboardProps {
  userId: string;
  userName: string;
}

interface TransactionFormState {
  type: TransactionType;
  category: string;
  amount: string;
  date: string;
  description: string;
  status: boolean;
}

const createInitialFormState = (): TransactionFormState => ({
  type: 'income',
  category: INCOME_CATEGORIES[0],
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  description: '',
  status: true,
});

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthBounds(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    label: MONTH_FORMATTER.format(start),
  };
}

function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString();
}

function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function getDayLabel(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  if (isToday(date)) return `Hoje, ${DAY_FORMATTER.format(date)}`;
  if (isYesterday(date)) return `Ontem, ${DAY_FORMATTER.format(date)}`;
  return DAY_FORMATTER.format(date);
}

const TRANSACTIONS_API = '/api/transactions';

async function fetchTransactions(
  userId: string,
  start?: string,
  end?: string
): Promise<FinancialTransaction[]> {
  const params = new URLSearchParams({ userId });

  if (start) params.set('start', start);
  if (end) params.set('end', end);

  const response = await fetch(`${TRANSACTIONS_API}?${params.toString()}`);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message = data?.message ?? 'Nao foi possivel carregar o financeiro.';
    throw new Error(message);
  }

  return (await response.json()) as FinancialTransaction[];
}

export function FinancialDashboard({
  userId,
  userName,
}: FinancialDashboardProps) {
  const [monthKey, setMonthKey] = useState(getMonthKey);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [monthlyTransactions, setMonthlyTransactions] = useState<
    FinancialTransaction[]
  >([]);
  const [allTransactions, setAllTransactions] = useState<
    FinancialTransaction[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<FinancialTransaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<TransactionFormState>(
    createInitialFormState
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;

    async function loadTransactions() {
      setIsLoading(true);
      setError(null);

      const { start, end } = getMonthBounds(monthKey);

      try {
        const [monthlyTransactions, allTransactions] = await Promise.all([
          fetchTransactions(userId, start, end),
          fetchTransactions(userId),
        ]);

        if (!isMounted) return;

        setMonthlyTransactions(monthlyTransactions);
        setAllTransactions(allTransactions);
      } catch (fetchError) {
        if (!isMounted) return;

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Nao foi possivel carregar o financeiro.'
        );
        setMonthlyTransactions([]);
        setAllTransactions([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, [monthKey, userId]);

  const categories = useMemo(() => {
    const values = new Set(
      monthlyTransactions.map((transaction) => transaction.category)
    );
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [monthlyTransactions]);

  const filteredTransactions = useMemo(() => {
    if (categoryFilter === 'all') return monthlyTransactions;
    return monthlyTransactions.filter(
      (transaction) => transaction.category === categoryFilter
    );
  }, [categoryFilter, monthlyTransactions]);

  const summary = useMemo(() => {
    const monthPaidTransactions = monthlyTransactions.filter(
      (transaction) => transaction.status
    );
    const monthPendingTransactions = monthlyTransactions.filter(
      (transaction) => !transaction.status
    );
    const allPaidTransactions = allTransactions.filter(
      (transaction) => transaction.status
    );
    const allPendingTransactions = allTransactions.filter(
      (transaction) => !transaction.status
    );

    const monthIncome = monthPaidTransactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const monthExpense = monthPaidTransactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const totalBalance = allPaidTransactions.reduce((total, transaction) => {
      const signal = transaction.type === 'income' ? 1 : -1;
      return total + Number(transaction.amount) * signal;
    }, 0);

    const monthPendingAmount = monthPendingTransactions.reduce(
      (total, transaction) => {
        const signal = transaction.type === 'income' ? 1 : -1;
        return total + Number(transaction.amount) * signal;
      },
      0
    );

    const totalPendingAmount = allPendingTransactions.reduce(
      (total, transaction) => {
        const signal = transaction.type === 'income' ? 1 : -1;
        return total + Number(transaction.amount) * signal;
      },
      0
    );

    return {
      monthIncome,
      monthExpense,
      monthBalance: monthIncome - monthExpense,
      totalBalance,
      pendingCount: monthPendingTransactions.length,
      monthPendingAmount,
      totalPendingAmount,
    };
  }, [allTransactions, monthlyTransactions]);

  const filteredTotalAmount = useMemo(() => {
    return filteredTransactions
      .filter((transaction) => transaction.status)
      .reduce((total, transaction) => {
        const signal = transaction.type === 'income' ? 1 : -1;
        return total + Number(transaction.amount) * signal;
      }, 0);
  }, [filteredTransactions]);

  const groupedTransactions = useMemo(() => {
    const groups = new Map<string, FinancialTransaction[]>();

    for (const transaction of filteredTransactions) {
      const current = groups.get(transaction.date) ?? [];
      current.push(transaction);
      groups.set(transaction.date, current);
    }

    return Array.from(groups.entries()).map(([date, transactions]) => ({
      date,
      label: getDayLabel(date),
      transactions,
    }));
  }, [filteredTransactions]);

  const monthLabel = getMonthBounds(monthKey).label;
  const activeCategories =
    formState.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const dialogCategories = Array.from(
    new Set([
      ...activeCategories,
      ...(formState.category ? [formState.category] : []),
    ])
  );

  async function refreshCurrentMonth() {
    const { start, end } = getMonthBounds(monthKey);

    const [monthlyTransactions, allTransactions] = await Promise.all([
      fetchTransactions(userId, start, end),
      fetchTransactions(userId),
    ]);

    setMonthlyTransactions(monthlyTransactions);
    setAllTransactions(allTransactions);
  }

  function handleTypeChange(value: TransactionType) {
    setFormState((current) => ({
      ...current,
      type: value,
      category:
        value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0],
    }));
  }

  function openCreateDialog() {
    setEditingTransaction(null);
    setFormState(createInitialFormState());
    setIsDialogOpen(true);
  }

  function openEditDialog(transaction: FinancialTransaction) {
    setEditingTransaction(transaction);
    setFormState({
      type: transaction.type,
      category: transaction.category,
      amount: String(Number(transaction.amount)),
      date: transaction.date,
      description: transaction.description ?? '',
      status: transaction.status,
    });
    setIsDialogOpen(true);
  }

  function handleDialogOpenChange(open: boolean) {
    setIsDialogOpen(open);
    if (!open) {
      setEditingTransaction(null);
      setFormState(createInitialFormState());
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const amount = Number(formState.amount.replace(',', '.'));

      if (!amount || amount <= 0) {
        setError('Informe um valor valido para o lancamento.');
        return;
      }

      try {
        const method = editingTransaction ? 'PATCH' : 'POST';
        const payload = {
          ...(editingTransaction ? { id: editingTransaction.id } : {}),
          user_id: userId,
          type: formState.type,
          category: formState.category,
          amount,
          date: formState.date,
          description: formState.description.trim() || null,
          status: formState.status,
        };
        const response = await fetch(TRANSACTIONS_API, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          const message =
            data?.message ??
            (editingTransaction
              ? 'Nao foi possivel atualizar o lancamento.'
              : 'Nao foi possivel adicionar o lancamento.');
          throw new Error(message);
        }

        await refreshCurrentMonth();
        setFormState(createInitialFormState());
        setEditingTransaction(null);
        setIsDialogOpen(false);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : editingTransaction
              ? 'Nao foi possivel atualizar o lancamento.'
              : 'Nao foi possivel adicionar o lancamento.'
        );
      }
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 md:px-6 lg:px-8">
      <section className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-white to-muted/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="w-fit rounded-full border-primary/15 bg-primary/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-primary"
            >
              Controle Financeiro
            </Badge>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                Financeiro
              </h1>
              <p className="max-w-2xl text-xs text-slate-600 md:text-sm">
                Fluxo de caixa rural com foco em competencia mensal, receitas do
                rebanho e custos operacionais.
              </p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button
                onClick={openCreateDialog}
                className="h-10 rounded-2xl bg-[#556b2f] px-4 text-sm text-white hover:bg-[#445624]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Lancamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-none bg-white p-0 sm:max-w-2xl">
              <div
                className={`rounded-3xl border p-6 ${
                  formState.type === 'income'
                    ? 'border-emerald-200 bg-emerald-50/60'
                    : 'border-rose-200 bg-rose-50/70'
                }`}
              >
                <DialogHeader className="pr-8">
                  <DialogTitle className="text-xl text-slate-950">
                    {editingTransaction
                      ? 'Editar lancamento'
                      : 'Novo lancamento'}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600">
                    Um formulario unico para entradas e saidas, com foco no
                    contexto agropecuario.
                  </DialogDescription>
                </DialogHeader>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('income')}
                      className={`rounded-2xl border p-4 text-left transition ${
                        formState.type === 'income'
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                          : 'border-emerald-200 bg-white text-emerald-900'
                      }`}
                    >
                      <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <ArrowUpRight className="h-4 w-4" />
                        Entrada
                      </span>
                      <p className="text-sm">
                        Venda de animais, leite, safra e outras receitas.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('expense')}
                      className={`rounded-2xl border p-4 text-left transition ${
                        formState.type === 'expense'
                          ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
                          : 'border-rose-200 bg-white text-rose-900'
                      }`}
                    >
                      <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <ArrowDownRight className="h-4 w-4" />
                        Saida
                      </span>
                      <p className="text-sm">
                        Racao, vacinas, combustivel, manutencao e custos fixos.
                      </p>
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Categoria
                      </label>
                      <Select
                        value={formState.category}
                        onValueChange={(value) =>
                          setFormState((current) => ({
                            ...current,
                            category: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {dialogCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Valor
                      </label>
                      <Input
                        inputMode="decimal"
                        placeholder="Ex: 12500.00"
                        value={formState.amount}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            amount: event.target.value,
                          }))
                        }
                        className="h-10 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Data da competencia
                      </label>
                      <Input
                        type="date"
                        value={formState.date}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            date: event.target.value,
                          }))
                        }
                        className="h-10 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Status
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormState((current) => ({
                            ...current,
                            status: !current.status,
                          }))
                        }
                        className={`flex h-10 w-full items-center justify-between rounded-xl border px-4 text-sm ${
                          formState.status
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-amber-300 bg-amber-50 text-amber-800'
                        }`}
                        aria-pressed={formState.status}
                      >
                        <span>{formState.status ? 'Pago' : 'Pendente'}</span>
                        <span className="font-semibold">
                          {formState.status
                            ? 'Fluxo realizado'
                            : 'Fluxo futuro'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Descricao
                    </label>
                    <Textarea
                      value={formState.description}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      placeholder="Detalhes do lote, fornecedor, observacoes ou numero do pedido."
                      className="min-h-28 rounded-2xl border-slate-200"
                    />
                  </div>

                  <div className="flex flex-col gap-3 border-t border-black/5 pt-4 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => handleDialogOpenChange(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className={`rounded-xl ${
                        formState.type === 'income'
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-rose-600 hover:bg-rose-700'
                      }`}
                    >
                      {isPending
                        ? 'Salvando...'
                        : editingTransaction
                          ? 'Salvar alteracoes'
                          : 'Salvar lancamento'}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-3 text-xs text-slate-700 md:flex-row md:items-center md:justify-between md:text-sm">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span>
              {userName}, os indicadores abaixo consideram todas as transacoes
              do seu usuario e o recorte mensal selecionado.
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_1.15fr_1fr]">
        <article className="rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Total Entradas do Mes
              </p>
              <p className="mt-3 text-2xl font-semibold text-emerald-700 md:text-3xl">
                {CURRENCY_FORMATTER.format(summary.monthIncome)}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 p-3 text-emerald-700">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
          <p className="text-xs text-slate-600 md:text-sm">
            Receitas do mes de {monthLabel}, com destaque para venda de gado,
            leite e safra.
          </p>
        </article>

        <article className="rounded-3xl border border-rose-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Total Saidas do Mes
              </p>
              <p className="mt-3 text-2xl font-semibold text-rose-700 md:text-3xl">
                {CURRENCY_FORMATTER.format(summary.monthExpense)}
              </p>
            </div>
            <span className="rounded-full bg-rose-100 p-3 text-rose-700">
              <ArrowDownRight className="h-5 w-5" />
            </span>
          </div>
          <p className="text-xs text-slate-600 md:text-sm">
            Custos operacionais e manutencao apurados no mesmo periodo.
          </p>
        </article>

        <article className="rounded-3xl border border-sky-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Saldo Atual
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-950 md:text-3xl">
                {CURRENCY_FORMATTER.format(summary.totalBalance)}
              </p>
            </div>
            <span className="rounded-full bg-sky-100 p-3 text-sky-700">
              <Wallet className="h-5 w-5" />
            </span>
          </div>
          <div className="space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  summary.monthBalance >= 0 ? 'bg-[#556b2f]' : 'bg-rose-500'
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      12,
                      Math.round(
                        (Math.abs(summary.monthBalance) /
                          Math.max(Math.abs(summary.totalBalance), 1)) *
                          100
                      )
                    )
                  )}%`,
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 md:text-sm">
              <Badge variant="outline" className="rounded-full">
                Saldo do mes: {CURRENCY_FORMATTER.format(summary.monthBalance)}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Pendentes: {summary.pendingCount}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Valor pendente (mes):{' '}
                {CURRENCY_FORMATTER.format(summary.monthPendingAmount)}
              </Badge>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
        <div className="rounded-3xl border bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <div className="w-full space-y-1">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-slate-950 md:text-2xl">
                  Extrato do Mes
                </h2>
              </div>
              <p className="text-xs text-slate-600 md:text-sm">
                Listagem mensal agrupada por dia, seguindo a competencia
                selecionada.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Mes
                </label>
                <Input
                  type="month"
                  value={monthKey}
                  onChange={(event) => setMonthKey(event.target.value)}
                  className="h-10 w-max rounded-xl border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Categoria
                </label>
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-background px-3 text-sm text-slate-700 outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">Todas</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : groupedTransactions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
              <p className="text-lg font-medium text-slate-800">
                Nenhum lancamento encontrado
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Ajuste o mes, remova o filtro ou crie um novo registro para
                iniciar o fluxo financeiro.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedTransactions.map((group) => (
                <div key={group.date} className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {group.label}
                    </span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="space-y-3">
                    {group.transactions.map((transaction) => {
                      const isIncome = transaction.type === 'income';

                      return (
                        <article
                          key={transaction.id}
                          className="grid gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-primary/20 hover:bg-white md:grid-cols-[auto_1fr_auto]"
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                              isIncome
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {isIncome ? (
                              <ArrowUpRight className="h-5 w-5" />
                            ) : (
                              <ArrowDownRight className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                              <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-slate-950 md:text-base">
                                  {transaction.category}
                                </h3>
                                <p className="text-xs text-slate-600 md:text-sm">
                                  {transaction.description ||
                                    'Sem descricao adicional.'}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-slate-200 bg-white text-slate-700"
                                >
                                  {isIncome ? 'Entrada' : 'Saida'}
                                </Badge>
                                <Badge
                                  className={`rounded-full ${
                                    transaction.status
                                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                                      : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                  }`}
                                >
                                  {transaction.status ? 'Pago' : 'Pendente'}
                                </Badge>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-7 rounded-full px-2 text-xs"
                                  onClick={() => openEditDialog(transaction)}
                                >
                                  <Pencil className="mr-1 h-3.5 w-3.5" />
                                  Editar
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-start justify-between gap-2 md:items-end">
                            <p
                              className={`text-base font-semibold md:text-lg ${
                                isIncome ? 'text-emerald-700' : 'text-rose-700'
                              }`}
                            >
                              {isIncome ? '+ ' : '- '}
                              {CURRENCY_FORMATTER.format(
                                Number(transaction.amount)
                              )}
                            </p>
                            <p className="text-xs text-slate-500 md:text-sm">
                              Competencia:{' '}
                              {new Date(
                                `${transaction.date}T12:00:00`
                              ).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Resumo Rapido
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 md:text-sm">
                  Periodo selecionado
                </p>
                <p className="mt-1 text-base font-semibold capitalize text-slate-950 md:text-lg">
                  {monthLabel}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 md:text-sm">
                  Fluxo do mes (pagos)
                </p>
                <p className="mt-1 text-base font-semibold text-slate-950 md:text-lg">
                  {CURRENCY_FORMATTER.format(summary.monthBalance)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 md:text-sm">
                  Total filtrado por categoria
                </p>
                <p className="mt-1 text-base font-semibold text-slate-950 md:text-lg">
                  {CURRENCY_FORMATTER.format(filteredTotalAmount)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 md:text-sm">
                  Lancamentos filtrados
                </p>
                <p className="mt-1 text-base font-semibold text-slate-950 md:text-lg">
                  {filteredTransactions.length}
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs text-amber-700 md:text-sm">
                  Valor pendente total
                </p>
                <p className="mt-1 text-base font-semibold text-amber-800 md:text-lg">
                  {CURRENCY_FORMATTER.format(summary.totalPendingAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-5 shadow-sm">
            <p className="text-xs text-slate-700 md:text-sm">
              O filtro mensal segue o intervalo entre primeiro e ultimo dia do
              mes, sempre amarrado ao usuario autenticado.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
