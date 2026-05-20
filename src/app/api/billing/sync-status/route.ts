import { NextResponse } from 'next/server';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';
import { scheduleSubscriptionNotifications } from '@/lib/notifications';

export async function GET() {
  const { context, error, status } = await requireFarmContext('manage_farm');

  if (!context) {
    return NextResponse.json({ error }, { status });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY not configured' },
      { status: 500 }
    );
  }

  // If already active, no need to sync
  if (context.farm.subscriptionStatus === 'ACTIVE') {
    return NextResponse.json({
      subscriptionStatus: 'ACTIVE',
      synced: false,
      message: 'Already active',
    });
  }

  // If no stripeCustomerId, try finding a Stripe customer by the authenticated user email.
  let stripeCustomerId = context.farm.stripeCustomerId;

  if (!stripeCustomerId && context.user?.email) {
    try {
      const customersResponse = await fetch(
        `https://api.stripe.com/v1/customers?email=${encodeURIComponent(
          context.user.email
        )}&limit=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const customersData = await customersResponse.json();
      if (customersResponse.ok && Array.isArray(customersData.data)) {
        const customer = customersData.data[0];
        if (customer && typeof customer.id === 'string') {
          stripeCustomerId = customer.id;
          await prisma.farm.update({
            where: { id: context.farm.id },
            data: { stripeCustomerId },
          });
          console.log(
            '[SYNC] Updated farm stripeCustomerId from Stripe customer search'
          );
        }
      }
    } catch (error) {
      console.error('[SYNC] Error finding customer by email:', error);
    }
  }

  if (!stripeCustomerId) {
    return NextResponse.json({
      subscriptionStatus: context.farm.subscriptionStatus,
      synced: false,
      message: 'No stripeCustomerId found',
    });
  }

  try {
    const subscriptionsResponse = await fetch(
      `https://api.stripe.com/v1/customers/${stripeCustomerId}/subscriptions?limit=100`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const subscriptionsData = await subscriptionsResponse.json();

    if (!subscriptionsResponse.ok) {
      console.error('[SYNC] Stripe error:', subscriptionsData);
      return NextResponse.json(
        { error: subscriptionsData.error?.message ?? 'Stripe error' },
        { status: 500 }
      );
    }

    const subscriptions = subscriptionsData.data || [];
    const activeSubscription = subscriptions.find(
      (sub: { status: string }) =>
        sub.status === 'active' || sub.status === 'trialing'
    );

    if (activeSubscription && typeof activeSubscription.id === 'string') {
      console.log(
        '[SYNC] Found subscription:',
        activeSubscription.id,
        activeSubscription.status
      );

      const mappedStatus =
        activeSubscription.status === 'active'
          ? 'ACTIVE'
          : activeSubscription.status === 'trialing'
            ? 'TRIALING'
            : activeSubscription.status === 'past_due'
              ? 'PAST_DUE'
              : activeSubscription.status === 'canceled'
                ? 'CANCELED'
                : 'INCOMPLETE';

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

      const stripeTrialEnd =
        typeof activeSubscription.trial_end === 'number'
          ? new Date(activeSubscription.trial_end * 1000)
          : null;
      let trialEndsAt = context.farm.trialEndsAt;
      if (stripeTrialEnd) {
        trialEndsAt = stripeTrialEnd;
      } else if (mappedStatus === 'TRIALING') {
        trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 30);
      }

      await prisma.farm.update({
        where: { id: context.farm.id },
        data: {
          subscriptionStatus: mappedStatus,
          stripeSubscriptionId: activeSubscription.id,
          stripeCustomerId: stripeCustomerId,
          trialEndsAt,
        },
      });

      if (mappedStatus === 'TRIALING') {
        await scheduleSubscriptionNotifications(
          context.farm.ownerUserId,
          trialEndsAt
        );
      }

      return NextResponse.json({
        subscriptionStatus: mappedStatus,
        stripeSubscriptionId: activeSubscription.id,
        synced: true,
        plan,
        message: 'Subscription synchronized',
      });
    }

    return NextResponse.json({
      subscriptionStatus: context.farm.subscriptionStatus,
      synced: false,
      message: 'No active subscription found',
      subscriptions: subscriptions.map(
        (sub: { id: string; status: string }) => ({
          id: sub.id,
          status: sub.status,
        })
      ),
    });
  } catch (error) {
    console.error('[SYNC] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sync error' },
      { status: 500 }
    );
  }
}
