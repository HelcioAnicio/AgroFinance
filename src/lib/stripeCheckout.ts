import { getAppUrl } from '@/lib/appUrl';
import type { BILLING_PLANS } from '@/lib/billing';
import { fetchSubscriptionItemId, updateFarmSafe } from '@/lib/stripeSeats';

type BillingPlan = (typeof BILLING_PLANS)[number];

type CheckoutFarm = {
  id: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};

type CheckoutResult = { url: string } | { error: string; status: number };

/**
 * Cria uma Stripe Checkout Session para uma fazenda e persiste os IDs
 * retornados na Farm. Reaproveitado tanto pelo checkout pago quanto pelo
 * fluxo de resgate de cupom (que só muda `paymentMethodCollection` e
 * `promotionCodeId`).
 */
export async function createCheckoutSession({
  farm,
  user,
  plan,
  installmentsEnabled,
  paymentMethodCollection = 'always',
  promotionCodeId,
  extraMetadata,
}: {
  farm: CheckoutFarm;
  user: { email: string };
  plan: BillingPlan;
  installmentsEnabled: boolean;
  paymentMethodCollection?: 'always' | 'if_required';
  promotionCodeId?: string;
  extraMetadata?: Record<string, string>;
}): Promise<CheckoutResult> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = getAppUrl();

  if (!secretKey) {
    return { error: 'STRIPE_SECRET_KEY nao configurada.', status: 500 };
  }

  const isAnnualPayment = plan.interval === 'year';

  // Cancel existing Stripe subscription if they already have one to avoid multiple active plans
  if (farm.stripeSubscriptionId) {
    try {
      console.log(
        `[CHECKOUT] Canceling old subscription: ${farm.stripeSubscriptionId}`
      );
      await fetch(
        `https://api.stripe.com/v1/subscriptions/${farm.stripeSubscriptionId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${secretKey}` },
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
  params.set('client_reference_id', farm.id);
  if (farm.stripeCustomerId) {
    params.set('customer', farm.stripeCustomerId);
  } else {
    params.set('customer_email', user.email);
    if (isAnnualPayment) params.set('customer_creation', 'always');
  }
  params.set('metadata[farmId]', farm.id);
  params.set('metadata[planId]', plan.id);
  params.set('metadata[planInterval]', plan.interval);
  params.set(
    'metadata[installmentsEnabled]',
    installmentsEnabled ? 'true' : 'false'
  );
  for (const [key, value] of Object.entries(extraMetadata ?? {})) {
    params.set(`metadata[${key}]`, value);
  }
  params.set('payment_method_types[]', 'card');
  if (isAnnualPayment) {
    params.set('payment_intent_data[metadata][farmId]', farm.id);
    params.set('payment_intent_data[metadata][planId]', plan.id);
    params.set('payment_intent_data[metadata][planInterval]', plan.interval);
    params.set(
      'payment_method_options[card][installments][enabled]',
      installmentsEnabled ? 'true' : 'false'
    );
  } else {
    params.set('subscription_data[trial_period_days]', '30');
    params.set('payment_method_collection', paymentMethodCollection);
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
    // Discounts pré-aplicados e allow_promotion_codes são mutuamente exclusivos na API da Stripe
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
    return {
      error: checkout.error?.message ?? 'Erro ao criar checkout.',
      status: 500,
    };
  }

  let checkoutCustomerId = farm.stripeCustomerId;
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

  await updateFarmSafe(farm.id, updateData);

  return { url: checkout.url };
}
