import { NextResponse } from 'next/server';
import { getBillingPlan } from '@/lib/billing';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_farm');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const plan = getBillingPlan(String(body.planId ?? ''));

  if (!plan) {
    return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin;

  if (!secretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY nao configurada.' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('success_url', `${appUrl}/dashboard?billing=success`);
  params.set('cancel_url', `${appUrl}/billing?billing=cancel`);
  params.set('client_reference_id', context.farm.id);
  params.set('customer_email', context.user.email);
  params.set('metadata[farmId]', context.farm.id);
  params.set('metadata[planId]', plan.id);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'brl');
  params.set('line_items[0][price_data][unit_amount]', String(plan.amountInCents));
  params.set('line_items[0][price_data][recurring][interval]', plan.interval);
  params.set('line_items[0][price_data][product_data][name]', `AgroFinance ${plan.name} ${plan.label}`);

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const checkout = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: checkout.error?.message ?? 'Erro ao criar checkout.' },
      { status: 500 }
    );
  }

  await prisma.farm.update({
    where: { id: context.farm.id },
    data: {
      stripeCustomerId:
        typeof checkout.customer === 'string'
          ? checkout.customer
          : context.farm.stripeCustomerId,
    },
  });

  return NextResponse.json({ url: checkout.url });
}
