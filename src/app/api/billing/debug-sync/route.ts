import { NextResponse } from 'next/server';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';

/**
 * Manual webhook trigger for testing
 * In production, remove this endpoint or require special auth
 */
export async function POST() {
  const { context, error, status } = await requireFarmContext('manage_farm');

  if (!context) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY not configured' },
        { status: 500 }
      );
    }

    if (!context.farm.stripeCustomerId) {
      return NextResponse.json(
        {
          error: 'No stripeCustomerId found',
          farm: context.farm,
        },
        { status: 400 }
      );
    }

    console.log(
      '[DEBUG] Fetching subscriptions for customer:',
      context.farm.stripeCustomerId
    );

    // Fetch customer subscriptions from Stripe
    const subscriptionsResponse = await fetch(
      `https://api.stripe.com/v1/customers/${context.farm.stripeCustomerId}/subscriptions?limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const subscriptionsData = await subscriptionsResponse.json();

    if (!subscriptionsResponse.ok) {
      console.error('[DEBUG] Stripe error:', subscriptionsData);
      return NextResponse.json(
        {
          error: subscriptionsData.error?.message ?? 'Stripe error',
          stripeError: subscriptionsData.error,
        },
        { status: 500 }
      );
    }

    const subscriptions = subscriptionsData.data || [];

    console.log('[DEBUG] Found subscriptions:', {
      count: subscriptions.length,
      subscriptions: subscriptions.map((s: { id: string; status: string }) => ({
        id: s.id,
        status: s.status,
      })),
    });

    const activeSubscription = subscriptions.find(
      (sub: { status: string }) =>
        sub.status === 'active' || sub.status === 'trialing'
    );

    if (activeSubscription) {
      console.log('[DEBUG] Found active subscription:', activeSubscription.id);

      const subscriptionItems =
        activeSubscription.items &&
        typeof activeSubscription.items === 'object' &&
        Array.isArray((activeSubscription.items as { data?: unknown[] }).data)
          ? (activeSubscription.items as { data?: unknown[] }).data
          : undefined;
      const firstItem = subscriptionItems?.[0] as
        | Record<string, unknown>
        | undefined;
      const price =
        firstItem && typeof firstItem === 'object'
          ? (firstItem.price as Record<string, unknown> | undefined)
          : undefined;

      const plan = {
        planId:
          typeof activeSubscription.metadata?.planId === 'string'
            ? activeSubscription.metadata.planId
            : undefined,
        planName:
          price && typeof price.nickname === 'string'
            ? price.nickname
            : undefined,
        interval:
          price &&
          typeof price.recurring === 'object' &&
          typeof (price.recurring as Record<string, unknown>).interval ===
            'string'
            ? (price.recurring as Record<string, unknown>).interval
            : undefined,
        amountInCents:
          price && typeof price.unit_amount === 'number'
            ? price.unit_amount
            : undefined,
      };

      // Update farm with subscription info
      const updatedFarm = await prisma.farm.update({
        where: { id: context.farm.id },
        data: {
          subscriptionStatus: 'ACTIVE',
          stripeSubscriptionId: activeSubscription.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Subscription synchronized',
        subscriptionId: activeSubscription.id,
        subscriptionStatus: activeSubscription.status,
        plan,
        farm: {
          id: updatedFarm.id,
          subscriptionStatus: updatedFarm.subscriptionStatus,
          stripeSubscriptionId: updatedFarm.stripeSubscriptionId,
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: 'No active subscription found',
      subscriptions: subscriptions.map((s: { id: string; status: string }) => ({
        id: s.id,
        status: s.status,
      })),
      farm: {
        id: context.farm.id,
        subscriptionStatus: context.farm.subscriptionStatus,
        stripeSubscriptionId: context.farm.stripeSubscriptionId,
      },
    });
  } catch (error) {
    console.error('[DEBUG] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Debug sync error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
