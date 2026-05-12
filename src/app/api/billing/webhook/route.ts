import crypto from 'crypto';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

function verifyStripeSignature(payload: string, signature: string, secret: string) {
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

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') ?? '';

  if (webhookSecret && !verifyStripeSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: Record<string, unknown> };
  };
  const object = event.data.object;

  if (event.type === 'checkout.session.completed') {
    const farmId =
      typeof object.client_reference_id === 'string'
        ? object.client_reference_id
        : typeof (object.metadata as Record<string, unknown> | undefined)?.farmId ===
            'string'
          ? String((object.metadata as Record<string, unknown>).farmId)
          : null;

    if (farmId) {
      await prisma.farm.update({
        where: { id: farmId },
        data: {
          subscriptionStatus: 'ACTIVE',
          stripeCustomerId:
            typeof object.customer === 'string' ? object.customer : undefined,
          stripeSubscriptionId:
            typeof object.subscription === 'string'
              ? object.subscription
              : undefined,
        },
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscriptionId =
      typeof object.id === 'string' ? object.id : undefined;

    if (subscriptionId) {
      await prisma.farm.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data: { subscriptionStatus: 'CANCELED' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
