import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPushToUser } from '@/lib/webPush';

// Called by Vercel Cron every 2 hours
// Authorization: Bearer CRON_SECRET
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const window = new Date(now.getTime() + 2 * 60 * 60 * 1000); // next 2h

  const notifications = await prisma.notification.findMany({
    where: {
      notifyAt: { gte: now, lte: window },
      read: false,
    },
    select: { id: true, userId: true, message: true, animalId: true, notifyAt: true },
  });

  const results = await Promise.allSettled(
    notifications.map((n) =>
      sendPushToUser(n.userId, {
        title: 'AgroFinance',
        body: n.message,
        url: n.animalId ? `/dashboard/${n.animalId}` : `/dashboard/notifications`,
        tag: `notification-${n.id}`,
      })
    )
  );

  return NextResponse.json({ sent: results.length });
}
