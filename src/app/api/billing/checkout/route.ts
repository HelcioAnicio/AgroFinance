import { NextResponse } from 'next/server';
import { getBillingPlan } from '@/lib/billing';
import { requireFarmContext } from '@/lib/tenant';
import { fetchSubscriptionItemId, updateFarmSafe } from '@/lib/stripeSeats';
import { getAppUrl } from '@/lib/appUrl';

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

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = getAppUrl();

  if (!secretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY nao configurada.' },
      { status: 500 }
    );
  }

  // Valida o cupom no servidor ANTES de criar a sessão: só assim sabemos, no
  // momento de montar os parâmetros, se o total vai ficar zerado (e podemos
  // liberar o checkout sem cartão). Sem isso, 'if_required' não teria como
  // distinguir "zerado pelo cupom" de "zerado pelo trial de 30 dias".
  const requestedCouponCode = String(body.couponCode ?? '').trim();
  let promotionCodeId: string | undefined;

  if (requestedCouponCode) {
    const promoResponse = await fetch(
      `https://api.stripe.com/v1/promotion_codes?code=${encodeURIComponent(requestedCouponCode)}&active=true`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const promoData = await promoResponse.json();
    promotionCodeId = promoResponse.ok ? promoData.data?.[0]?.id : undefined;

    if (!promotionCodeId) {
      return NextResponse.json(
        { error: 'Cupom invalido ou expirado.' },
        { status: 400 }
      );
    }
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
  params.set('mode', isAnnualPayment ? 'payment' : 'subscription');
  params.set('success_url', `${appUrl}/billing?billing=success`);
  params.set('cancel_url', `${appUrl}/billing?billing=cancel`);
  params.set('client_reference_id', context.farm.id);
  if (context.farm.stripeCustomerId) {
    params.set('customer', context.farm.stripeCustomerId);
  } else {
    params.set('customer_email', context.user.email);
    if (isAnnualPayment) params.set('customer_creation', 'always');
  }
  params.set('metadata[farmId]', context.farm.id);
  params.set('metadata[planId]', plan.id);
  params.set('metadata[planInterval]', plan.interval);
  params.set(
    'metadata[installmentsEnabled]',
    installmentsEnabled ? 'true' : 'false'
  );
  params.set('payment_method_types[]', 'card');
  // Cartão só deixa de ser obrigatório quando um cupom válido (verificado
  // acima) zera o total. Sem cupom, continua exigindo cartão normalmente —
  // inclusive durante o trial de 30 dias.
  params.set('payment_method_collection', promotionCodeId ? 'if_required' : 'always');
  if (isAnnualPayment) {
    params.set('payment_intent_data[metadata][farmId]', context.farm.id);
    params.set('payment_intent_data[metadata][planId]', plan.id);
    params.set('payment_intent_data[metadata][planInterval]', plan.interval);
    params.set(
      'payment_method_options[card][installments][enabled]',
      installmentsEnabled ? 'true' : 'false'
    );
  } else {
    params.set('subscription_data[trial_period_days]', '30');
    params.set(
      'subscription_data[trial_settings][end_behavior][missing_payment_method]',
      'cancel'
    );
  }
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'brl');
  params.set(
    'line_items[0][price_data][unit_amount]',
    String(plan.amountInCents)
  );
  if (!isAnnualPayment) {
    params.set('line_items[0][price_data][recurring][interval]', plan.interval);
  }
  params.set(
    'line_items[0][price_data][product_data][name]',
    `AgroFinance ${plan.name} ${plan.label}`
  );
  if (promotionCodeId) {
    params.set('discounts[0][promotion_code]', promotionCodeId);
  } else {
    params.set('allow_promotion_codes', 'true');
  }

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
    stripeSubscriptionItemId?: string;
  } = {};

  if (typeof checkoutCustomerId === 'string') {
    updateData.stripeCustomerId = checkoutCustomerId;
  }

  if (checkoutSubscriptionId) {
    updateData.stripeSubscriptionId = checkoutSubscriptionId;
    // Para assinaturas mensais, busca o item ID para futuras atualizações de assentos
    if (!isAnnualPayment) {
      const itemId = await fetchSubscriptionItemId(checkoutSubscriptionId);
      if (itemId) updateData.stripeSubscriptionItemId = itemId;
    }
  }

  await updateFarmSafe(context.farm.id, updateData);

  return NextResponse.json({ url: checkout.url });
}
