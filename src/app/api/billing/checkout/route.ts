import { NextResponse } from 'next/server';
import { getBillingPlan } from '@/lib/billing';
import { requireFarmContext } from '@/lib/tenant';
import { createCheckoutSession } from '@/lib/stripeCheckout';

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_farm');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const plan = getBillingPlan(String(body.planId ?? ''));

  if (!plan) {
    return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 });
  }

  const isAnnualPayment = plan.interval === 'year';
  const installmentsEnabled = isAnnualPayment && body.installments !== false;

  if (!context.user.cnpj) {
    return NextResponse.json(
      { error: 'Informe CPF ou CNPJ antes de escolher um plano.' },
      { status: 400 }
    );
  }

  const result = await createCheckoutSession({
    farm: context.farm,
    user: context.user,
    plan,
    installmentsEnabled,
  });

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ url: result.url });
}
