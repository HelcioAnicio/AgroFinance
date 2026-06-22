import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendPushToUser } from '@/lib/webPush';

// Called by Vercel Cron once per day at 6am (Hobby plan limit: 1x/day)
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
  const window = new Date(now.getTime() + 24 * 60 * 60 * 1000); // next 24h

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
