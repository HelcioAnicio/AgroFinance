import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

type PushSubscriptionDelegate = {
  upsert: (args: object) => Promise<unknown>;
  deleteMany: (args: object) => Promise<unknown>;
};

function getDelegate() {
  return (prisma as unknown as { pushSubscription?: PushSubscriptionDelegate }).pushSubscription;
}

export async function POST(req: Request) {
  const { context, error, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await req.json();
  const { endpoint, keys } = body as { endpoint: string; keys: { p256dh: string; auth: string } };

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return NextResponse.json({ error: 'Dados de inscrição inválidos.' }, { status: 400 });
  }

  const delegate = getDelegate();
  if (!delegate) {
    return NextResponse.json({ error: 'Execute prisma generate.' }, { status: 503 });
  }

  await delegate.upsert({
    where: { endpoint },
    create: { userId: context.user.id, endpoint, p256dh: keys.p256dh, auth: keys.auth },
    update: { p256dh: keys.p256dh, auth: keys.auth },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { context, error, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');

  const delegate = getDelegate();
  if (!delegate) return NextResponse.json({ ok: true });

  if (endpoint) {
    await delegate.deleteMany({ where: { userId: context.user.id, endpoint } });
  } else {
    await delegate.deleteMany({ where: { userId: context.user.id } });
  }

  return NextResponse.json({ ok: true });
}
