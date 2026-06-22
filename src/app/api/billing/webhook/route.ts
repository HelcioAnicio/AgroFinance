import crypto from 'crypto';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { scheduleSubscriptionNotifications } from '@/lib/notifications';
import { fetchSubscriptionItemId } from '@/lib/stripeSeats';

export const runtime = 'nodejs';

function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
) {
  const timestamp = signature
    .split(',')
    .find((part) => part.startsWith('t='))
    ?.slice(2);
  const expected = signature
    .split(',')
    .find((part) => part.startsWith('v1='))
    ?.slice(3);

  if (!timestamp || !expected) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const digest = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  const digestBuffer = Buffer.from(digest);
  const expectedBuffer = Buffer.from(expected);
  if (digestBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(digestBuffer, expectedBuffer);
}

function parseStripeId(field: unknown): string | undefined {
  if (typeof field === 'string') return field;
  if (
    field &&
    typeof field === 'object' &&
    typeof (field as { id?: unknown }).id === 'string'
  ) {
    return (field as { id: string }).id;
  }

  return undefined;
}

async function fetchCheckoutSession(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=customer&expand[]=subscription`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      '[WEBHOOK] Failed fetching session from Stripe',
      await response.text()
    );
    return null;
  }

  return response.json();
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';

  console.log('[WEBHOOK] Received event, checking signature...');

  if (
    webhookSecret &&
    !verifyStripeSignature(payload, signature, webhookSecret)
  ) {
    console.log('[WEBHOOK] Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: Record<string, unknown> };
  };
  const object = event.data.object;

  console.log('[WEBHOOK] Event type:', event.type);

  if (event.type === 'checkout.session.completed') {
    console.log('[WEBHOOK] Processing checkout.session.completed');
    const farmId =
      typeof object.client_reference_id === 'string'
        ? object.client_reference_id
        : typeof (object.metadata as Record<string, unknown> | undefined)
              ?.farmId === 'string'
          ? String((object.metadata as Record<string, unknown>).farmId)
          : null;

    console.log('[WEBHOOK] farmId:', farmId);

    if (farmId) {
      let customerId = parseStripeId(object.customer);
      let subscriptionId = parseStripeId(object.subscription);
      const metadata = object.metadata as Record<string, unknown> | undefined;
      const planInterval =
        typeof metadata?.planInterval === 'string'
          ? metadata.planInterval
          : null;
      const isAnnualPayment = planInterval === 'year' && !subscriptionId;

      if ((!customerId || !subscriptionId) && typeof object.id === 'string') {
        const sessionData = await fetchCheckoutSession(object.id);
        if (sessionData) {
          customerId = customerId ?? parseStripeId(sessionData.customer);
          subscriptionId =
            subscriptionId ?? parseStripeId(sessionData.subscription);
        }
      }

      console.log('[WEBHOOK] Updating farm:', {
        farmId,
        customerId,
        subscriptionId,
      });

      const accessUntil = new Date();
      accessUntil.setDate(accessUntil.getDate() + (isAnnualPayment ? 365 : 30));

      const updateData: {
        subscriptionStatus?:
          | 'ACTIVE'
          | 'TRIALING'
          | 'PAST_DUE'
          | 'CANCELED'
          | 'INCOMPLETE';
        stripeCustomerId?: string | null;
        stripeSubscriptionId?: string | null;
        stripeSubscriptionItemId?: string | null;
        trialEndsAt?: Date;
      } = {
        subscriptionStatus: isAnnualPayment ? 'ACTIVE' : 'TRIALING',
        trialEndsAt: accessUntil,
      };

      if (customerId) updateData.stripeCustomerId = customerId;
      if (subscriptionId) {
        updateData.stripeSubscriptionId = subscriptionId;
        // Para assinaturas mensais, guarda o item ID para futuras atualizações de assentos
        if (!isAnnualPayment) {
          const itemId = await fetchSubscriptionItemId(subscriptionId);
          if (itemId) updateData.stripeSubscriptionItemId = itemId;
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedFarm = await (prisma.farm.update as any)({
        where: { id: farmId },
        data: updateData,
      });

      if (!isAnnualPayment) {
        await scheduleSubscriptionNotifications(
          updatedFarm.ownerUserId,
          accessUntil
        );
      }

      console.log(
        '[WEBHOOK] Farm updated successfully after checkout completion'
      );
    }
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    console.log('[WEBHOOK] Processing customer.subscription event');
    const subscriptionId =
      typeof object.id === 'string' ? object.id : undefined;
    const status = typeof object.status === 'string' ? object.status : null;
    const customerId = parseStripeId(object.customer);

    if (subscriptionId) {
      const updateData: {
        subscriptionStatus?:
          | 'ACTIVE'
          | 'TRIALING'
          | 'PAST_DUE'
          | 'CANCELED'
          | 'INCOMPLETE';
      } = {};

      if (status === 'active') updateData.subscriptionStatus = 'ACTIVE';
      else if (status === 'trialing')
        updateData.subscriptionStatus = 'TRIALING';
      else if (status === 'past_due')
        updateData.subscriptionStatus = 'PAST_DUE';
      else if (status === 'canceled')
        updateData.subscriptionStatus = 'CANCELED';
      else if (status === 'incomplete')
        updateData.subscriptionStatus = 'INCOMPLETE';

      const whereClause = customerId
        ? { stripeCustomerId: customerId }
        : { stripeSubscriptionId: subscriptionId };

      const dataClause: {
        stripeSubscriptionId: string;
        subscriptionStatus?:
          | 'ACTIVE'
          | 'TRIALING'
          | 'PAST_DUE'
          | 'CANCELED'
          | 'INCOMPLETE';
      } = {
        stripeSubscriptionId: subscriptionId,
      };
      if (updateData.subscriptionStatus) {
        dataClause.subscriptionStatus = updateData.subscriptionStatus;
      }

      // Convert Stripe Unix timestamp for trial_end to Date
      const stripeTrialEnd =
        typeof object.trial_end === 'number'
          ? new Date(object.trial_end * 1000)
          : null;

      const farms = await prisma.farm.findMany({
        where: whereClause,
      });

      for (const farm of farms) {
        let trialEndsAt = farm.trialEndsAt;
        if (stripeTrialEnd) {
          trialEndsAt = stripeTrialEnd;
        } else if (status === 'trialing') {
          // Fallback if Stripe says trialing but trial_end was not found
          trialEndsAt = new Date();
          trialEndsAt.setDate(trialEndsAt.getDate() + 30);
        }

        await prisma.farm.update({
          where: { id: farm.id },
          data: {
            ...dataClause,
            trialEndsAt,
          },
        });

        if (status === 'trialing') {
          await scheduleSubscriptionNotifications(
            farm.ownerUserId,
            trialEndsAt
          );
        }
      }

      console.log('[WEBHOOK] Farm subscription updated', {
        subscriptionId,
        status,
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    console.log('[WEBHOOK] Processing customer.subscription.deleted');
    const subscriptionId =
      typeof object.id === 'string' ? object.id : undefined;
    const customerId = parseStripeId(object.customer);

    if (subscriptionId || customerId) {
      await prisma.farm.updateMany({
        where: subscriptionId
          ? { stripeSubscriptionId: subscriptionId }
          : { stripeCustomerId: customerId! },
        data: { subscriptionStatus: 'CANCELED' },
      });
      console.log('[WEBHOOK] Farm subscription canceled');
    }
  }

  return NextResponse.json({ received: true });
}
