import { redirect } from 'next/navigation';
import { BILLING_PLANS } from '@/lib/billing';
import { getCurrentFarmContext } from '@/lib/tenant';
import BillingPlans from './plans';
import { Suspense } from 'react';
import { DashboardHeaderSection } from '../dashboard/_components/dashboardHeaderSection';
import { DashboardHeaderSkeleton } from '../dashboard/_components/dashboardHeaderSkeleton';

export default async function BillingPage() {
  const context = await getCurrentFarmContext();

  if (!context) redirect('/login');
  if (context.farm.subscriptionStatus === 'ACTIVE') redirect('/dashboard');

  const daysLeft = Math.ceil(
    (context.farm.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 py-10 text-[#202417]">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />
      </Suspense>{' '}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#55722b]">
            AgroFinance Billing
          </p>
          <h1 className="max-w-3xl text-4xl font-bold">
            Escolha um plano para continuar usando a fazenda {context.farm.name}
          </h1>
          <p className="max-w-2xl text-sm text-[#5e654f]">
            Sua conta tem 1 mes gratuito. Depois do periodo de teste, o acesso
            ao dashboard e liberado com uma assinatura ativa.
          </p>
          <div className="w-fit rounded-md border border-[#55722b]/30 bg-white px-3 py-2 text-sm">
            {daysLeft > 0
              ? `${daysLeft} dias restantes no teste gratuito`
              : 'Teste gratuito encerrado'}
          </div>
        </div>

        <BillingPlans plans={BILLING_PLANS} />
      </section>
    </main>
  );
}
