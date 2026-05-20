import { redirect } from 'next/navigation';
import { BILLING_PLANS } from '@/lib/billing';
import {
  canFarmAccessDashboard,
  getCurrentUserWithFarmContext,
} from '@/lib/tenant';
import BillingPlans from './plans';
import BillingStatus from './billing-status';
import CompleteBillingProfile from './complete-profile';
import { Suspense } from 'react';
import { DashboardHeaderSection } from '../dashboard/_components/dashboardHeaderSection';
import { DashboardHeaderSkeleton } from '../dashboard/_components/dashboardHeaderSkeleton';
import EnsureFarmModal from '@/components/ui/ensureFarmModal';

export default async function BillingPage({
  searchParams,
}: {
  searchParams?: Promise<{ billing?: string }>;
}) {
  const context = await getCurrentUserWithFarmContext();

  if (!context) redirect('/login');
  if (context.farm && canFarmAccessDashboard(context.farm))
    redirect('/dashboard');

  const billing = await searchParams;
  const isPaymentPending = billing?.billing === 'success';
  const isPaymentCanceled = billing?.billing === 'cancel';
  const hasRequiredProfileData = Boolean(context.user.cnpj);

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
            {hasRequiredProfileData
              ? `Escolha um plano para continuar usando ${
                  context.farm?.name ?? 'sua fazenda'
                }`
              : 'Complete seus dados para escolher um plano'}
          </h1>
          <p className="max-w-2xl text-sm text-[#5e654f]">
            Primeiro complete seus dados, depois valide o cartao no Stripe. A
            liberacao do acesso acontece somente depois dessa confirmacao.
          </p>
        </div>

        {!hasRequiredProfileData ? (
          <CompleteBillingProfile
            initialName={context.user.name}
            email={context.user.email}
          />
        ) : isPaymentPending ? (
          <BillingStatus />
        ) : (
          <>
            {isPaymentCanceled ? (
              <div className="rounded-xl border border-[#f1c0c0] bg-[#fff3f3] p-6 text-base text-[#7a2a2a] shadow-sm">
                <p className="font-semibold">Pagamento cancelado</p>
                <p className="mt-2 text-sm">
                  O processo de pagamento foi cancelado. Selecione um plano para
                  tentar novamente.
                </p>
              </div>
            ) : null}

            <div className="rounded-md border border-[#d9d5c8] bg-white p-4 text-sm text-[#4d543f]">
              A validacao do cartao e feita no Stripe. Enquanto ela nao for
              confirmada, o acesso ao dashboard ainda nao fica ativo.
            </div>
            <BillingPlans plans={BILLING_PLANS} />
          </>
        )}
      </section>
      {!context.farm ? (
        <EnsureFarmModal
          userName={context.user.name}
          initialCnpj={context.user.cnpj}
          mode="blocking"
        />
      ) : null}
    </main>
  );
}
