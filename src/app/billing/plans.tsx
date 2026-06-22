'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Check, CreditCard, Layers3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BILLING_PLANS } from '@/lib/billing';

type Plan = (typeof BILLING_PLANS)[number];

const formatCurrency = (amountInCents: number) =>
  (amountInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

const planStyles = {
  Essencial: {
    card: 'border-[#e3dfd2] bg-white',
    badge: 'bg-[#f4f1e8] text-[#5d664b]',
    button: 'bg-white text-[#49651f] ring-1 ring-[#c9d3b7] hover:bg-[#f6f8f0]',
    icon: 'text-[#718051]',
  },
  Performance: {
    card: 'border-[#49651f] bg-[#fbfcf7] shadow-[0_18px_40px_rgba(73,101,31,0.16)] md:-mt-4',
    badge: 'bg-[#49651f] text-white',
    button: 'bg-[#49651f] text-white hover:bg-[#3f571b]',
    icon: 'text-[#49651f]',
  },
  Empresarial: {
    card: 'border-[#d1c6ad] bg-[#fffdf8]',
    badge: 'bg-[#efe6d5] text-[#715a2a]',
    button: 'bg-[#202417] text-white hover:bg-[#34392a]',
    icon: 'text-[#8a6a2c]',
  },
} as const;

export default function BillingPlans({
  plans,
  disabled = false,
  compact = false,
}: {
  plans: readonly Plan[];
  disabled?: boolean;
  compact?: boolean;
}) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [interval, setInterval] = useState<'month' | 'year'>('month');
  const visiblePlans = useMemo(
    () => plans.filter((plan) => plan.interval === interval),
    [interval, plans]
  );

  const startCheckout = async (planId: string) => {
    setLoadingPlan(planId);

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, installments: true }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Nao foi possivel abrir o checkout.');
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel abrir o checkout.'
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md border border-[#d4e6b5] bg-[#f4f9ec] px-4 py-3 text-sm text-[#415d1d]">
        <strong>Cobrança por assento:</strong> o valor é multiplicado pelo número de membros ativos da fazenda (excluindo Visualizadores, que são gratuitos). Membros que entram ou saem no meio do mês são cobrados proporcionalmente.
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-fit rounded-md border border-[#d9d5c8] bg-white p-1">
          <button
            type="button"
            onClick={() => setInterval('month')}
            className={`rounded px-4 py-2 text-sm font-semibold ${
              interval === 'month'
                ? 'bg-[#49651f] text-white'
                : 'text-[#4d543f]'
            }`}
          >
            Mensal
          </button>
          <button
            type="button"
            onClick={() => setInterval('year')}
            className={`rounded px-4 py-2 text-sm font-semibold ${
              interval === 'year' ? 'bg-[#49651f] text-white' : 'text-[#4d543f]'
            }`}
          >
            Anual
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-[#e2dccb] bg-white px-3 py-2 text-xs font-semibold text-[#5e654f]">
          <CreditCard className="size-4 text-[#49651f]" />
          Planos anuais cobram o total do ano e permitem parcelamento no
          checkout.
        </div>
      </div>

      <div
        className={`grid gap-4 ${compact ? 'lg:grid-cols-3' : 'md:grid-cols-3'}`}
      >
        {visiblePlans.map((plan) => {
          const style = planStyles[plan.tier];
          const monthlyEquivalent =
            plan.interval === 'year'
              ? plan.amountInCents / 12
              : plan.amountInCents;

          return (
            <article
              key={plan.id}
              className={`relative flex min-h-[31rem] flex-col justify-between rounded-md border p-5 shadow-sm ${style.card}`}
            >
              {plan.recommended ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#49651f] px-4 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white">
                  Recomendado
                </div>
              ) : null}

              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`inline-flex rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] ${style.badge}`}
                    >
                      {plan.tier}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">{plan.name}</h2>
                  </div>
                  {plan.tier === 'Empresarial' ? (
                    <Sparkles className={`size-5 ${style.icon}`} />
                  ) : (
                    <Layers3 className={`size-5 ${style.icon}`} />
                  )}
                </div>

                <div>
                  <p className="text-4xl font-bold tracking-normal">
                    {formatCurrency(
                      plan.interval === 'year'
                        ? monthlyEquivalent
                        : plan.amountInCents
                    )}
                    <span className="ml-1 text-sm font-semibold text-[#6b705c]">
                      /assento/mês
                    </span>
                  </p>
                  {plan.interval === 'year' ? (
                    <p className="mt-1 text-xs font-medium text-[#6b705c]">
                      {formatCurrency(plan.amountInCents)}/assento/ano com
                      opcao de parcelamento no cartao.
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-medium text-[#6b705c]">
                      Cobranca proporcional ao numero de membros da fazenda.
                    </p>
                  )}
                </div>

                <p className="min-h-10 text-sm text-[#5e654f]">
                  {plan.description}
                </p>

                <ul className="flex flex-col gap-2 text-sm text-[#454b38]">
                  {plan.features.map((feature, index) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 rounded-sm ${
                        plan.includesPrevious &&
                        index < plan.inheritedFeatureCount
                          ? 'bg-white/70 px-2 py-1 text-[#667155]'
                          : ''
                      }`}
                    >
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${style.icon}`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="button"
                className={`mt-6 h-11 w-full ${style.button}`}
                disabled={disabled || loadingPlan === plan.id}
                onClick={() => startCheckout(plan.id)}
              >
                {disabled
                  ? 'Aguardando confirmacao'
                  : loadingPlan === plan.id
                    ? 'Abrindo...'
                    : 'Assinar agora'}
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
