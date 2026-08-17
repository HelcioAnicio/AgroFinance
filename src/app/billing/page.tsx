import { redirect } from 'next/navigation';
import {
  canFarmAccessDashboard,
  getCurrentUserWithFarmContext,
} from '@/lib/tenant';
import CouponRedeemForm from './coupon-redeem-form';
import BillingStatus from './billing-status';
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
            Ative o acesso para {context.farm?.name ?? 'sua fazenda'}
          </h1>
          <p className="max-w-2xl text-sm text-[#5e654f]">
            O AgroFinance esta em fase de testes — o acesso e liberado por
            cupom, sem precisar cadastrar cartao.
          </p>
        </div>

        {isPaymentPending ? (
          <BillingStatus />
        ) : (
          <>
            {isPaymentCanceled ? (
              <div className="rounded-xl border border-[#f1c0c0] bg-[#fff3f3] p-6 text-base text-[#7a2a2a] shadow-sm">
                <p className="font-semibold">Ativacao cancelada</p>
                <p className="mt-2 text-sm">
                  O processo foi cancelado. Digite o cupom novamente para
                  tentar de novo.
                </p>
              </div>
            ) : null}

            <CouponRedeemForm />
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
