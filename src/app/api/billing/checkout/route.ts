import { NextResponse } from 'next/server';
import { getBillingPlan } from '@/lib/billing';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';
import { getAppUrl } from '@/lib/appUrl';

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_farm');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const plan = getBillingPlan(String(body.planId ?? ''));

  if (!plan) {
    return NextResponse.json({ error: 'Plano invalido.' }, { status: 400 });
  }

  if (!context.user.cnpj) {
    return NextResponse.json(
      { error: 'Informe CPF ou CNPJ antes de escolher um plano.' },
      { status: 400 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = getAppUrl(request);

  if (!secretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY nao configurada.' },
      { status: 500 }
    );
  }

  // Cancel existing Stripe subscription if they already have one to avoid multiple active plans
  if (context.farm.stripeSubscriptionId) {
    try {
      console.log(
        `[CHECKOUT] Canceling old subscription: ${context.farm.stripeSubscriptionId}`
      );
      await fetch(
        `https://api.stripe.com/v1/subscriptions/${context.farm.stripeSubscriptionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );
    } catch (error) {
      console.error('[CHECKOUT] Error canceling old subscription:', error);
    }
  }

  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('success_url', `${appUrl}/billing?billing=success`);
  params.set('cancel_url', `${appUrl}/billing?billing=cancel`);
  params.set('client_reference_id', context.farm.id);
  if (context.farm.stripeCustomerId) {
    params.set('customer', context.farm.stripeCustomerId);
  } else {
    params.set('customer_email', context.user.email);
  }
  params.set('metadata[farmId]', context.farm.id);
  params.set('metadata[planId]', plan.id);
  params.set('subscription_data[trial_period_days]', '30');
  params.set('payment_method_collection', 'always');
  params.set(
    'subscription_data[trial_settings][end_behavior][missing_payment_method]',
    'cancel'
  );
  params.set('payment_method_types[]', 'card');
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'brl');
  params.set(
    'line_items[0][price_data][unit_amount]',
    String(plan.amountInCents)
  );
  params.set('line_items[0][price_data][recurring][interval]', plan.interval);
  params.set(
    'line_items[0][price_data][product_data][name]',
    `AgroFinance ${plan.name} ${plan.label}`
  );
  params.set('allow_promotion_codes', 'true');

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

  let checkoutCustomerId = context.farm.stripeCustomerId;
  let checkoutSubscriptionId: string | undefined;

  if (typeof checkout.customer === 'string') {
    checkoutCustomerId = checkout.customer;
  } else if (
    checkout.customer &&
    typeof checkout.customer === 'object' &&
    typeof (checkout.customer as { id?: unknown }).id === 'string'
  ) {
    checkoutCustomerId = (checkout.customer as { id: string }).id;
  }

  if (typeof checkout.subscription === 'string') {
    checkoutSubscriptionId = checkout.subscription;
  } else if (
    checkout.subscription &&
    typeof checkout.subscription === 'object' &&
    typeof (checkout.subscription as { id?: unknown }).id === 'string'
  ) {
    checkoutSubscriptionId = (checkout.subscription as { id: string }).id;
  }

  const updateData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  } = {};

  if (typeof checkoutCustomerId === 'string') {
    updateData.stripeCustomerId = checkoutCustomerId;
  }

  if (checkoutSubscriptionId) {
    updateData.stripeSubscriptionId = checkoutSubscriptionId;
  }

  await prisma.farm.update({
    where: { id: context.farm.id },
    data: updateData,
  });

  return NextResponse.json({ url: checkout.url });
}
