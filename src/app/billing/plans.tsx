'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BILLING_PLANS } from '@/lib/billing';

type Plan = (typeof BILLING_PLANS)[number];

export default function BillingPlans({
  plans,
  disabled = false,
}: {
  plans: readonly Plan[];
  disabled?: boolean;
}) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [interval, setInterval] = useState<'month' | 'year'>('month');
  const visiblePlans = plans.filter((plan) => plan.interval === interval);

  const startCheckout = async (planId: string) => {
    setLoadingPlan(planId);

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
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
      <div className="flex w-fit rounded-md border border-[#d9d5c8] bg-white p-1">
        <button
          type="button"
          onClick={() => setInterval('month')}
          className={`rounded px-4 py-2 text-sm font-semibold ${
            interval === 'month' ? 'bg-[#49651f] text-white' : 'text-[#4d543f]'
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

      <div className="grid gap-4 md:grid-cols-3">
        {visiblePlans.map((plan) => (
          <article
            key={plan.id}
            className="flex min-h-80 flex-col justify-between rounded-md border border-[#e1ded3] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d7f3d]">
                  {plan.label}
                </p>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
              </div>
              <p className="text-3xl font-bold">
                {(plan.amountInCents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <ul className="flex flex-col gap-2 text-sm text-[#515843]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-[#49651f]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="button"
              className="mt-6 bg-[#49651f] text-white hover:bg-[#3f571b]"
              disabled={disabled || loadingPlan === plan.id}
              onClick={() => startCheckout(plan.id)}
            >
              {disabled
                ? 'Aguardando confirmação'
                : loadingPlan === plan.id
                  ? 'Abrindo...'
                  : 'Assinar'}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
