import { NextResponse } from 'next/server';
import { requireFarmContext } from '@/lib/tenant';

function extractPlanInfo(subscription: Record<string, unknown> | null) {
  if (!subscription) return null;

  const metadata = subscription.metadata as Record<string, unknown> | undefined;
  const items = subscription.items as { data?: unknown[] } | undefined;
  const firstItem = Array.isArray(items?.data) ? items.data[0] : undefined;
  const price =
    firstItem && typeof firstItem === 'object'
      ? (firstItem as Record<string, unknown>).price
      : undefined;
  const product =
    price && typeof price === 'object'
      ? (price as Record<string, unknown>).product
      : undefined;

  return {
    planId: typeof metadata?.planId === 'string' ? metadata.planId : undefined,
    planName:
      typeof product === 'object' &&
      typeof (product as Record<string, unknown>).name === 'string'
        ? (product as Record<string, unknown>).name
        : typeof price === 'object' &&
            typeof (price as Record<string, unknown>).nickname === 'string'
          ? (price as Record<string, unknown>).nickname
          : undefined,
    interval:
      typeof price === 'object' &&
      typeof (price as Record<string, unknown>).recurring === 'object'
        ? (
            (price as Record<string, unknown>).recurring as Record<
              string,
              unknown
            >
          ).interval
        : undefined,
    amountInCents:
      typeof price === 'object' &&
      typeof (price as Record<string, unknown>).unit_amount === 'number'
        ? (price as Record<string, unknown>).unit_amount
        : undefined,
    priceId:
      typeof price === 'object' &&
      typeof (price as Record<string, unknown>).id === 'string'
        ? (price as Record<string, unknown>).id
        : undefined,
  };
}

async function fetchStripeSubscription(subscriptionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  const response = await fetch(
    `https://api.stripe.com/v1/subscriptions/${subscriptionId}?expand[]=items.data.price.product`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );

  if (!response.ok) return null;
  return response.json();
}

export async function GET() {
  const { context, error, status } = await requireFarmContext();

  if (!context) {
    return NextResponse.json({ error }, { status });
  }

  const responsePayload: Record<string, unknown> = {
    subscriptionStatus: context.farm.subscriptionStatus,
    stripeCustomerId: context.farm.stripeCustomerId,
    stripeSubscriptionId: context.farm.stripeSubscriptionId,
    trialEndsAt: context.farm.trialEndsAt,
  };

  if (context.farm.stripeSubscriptionId) {
    const subscription = await fetchStripeSubscription(
      context.farm.stripeSubscriptionId
    );
    if (subscription) {
      responsePayload.plan = extractPlanInfo(subscription);
      responsePayload.stripeSubscriptionStatus = subscription.status;
    }
  }

  return NextResponse.json(responsePayload);
}
