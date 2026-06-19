import webpush from 'web-push';
import prisma from '@/lib/prisma';

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:' + (process.env.VAPID_EMAIL ?? 'admin@agrofinance.com'),
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function sendPushToUser(
  userId: string,
  payload: { title: string; body: string; url?: string; tag?: string }
) {
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return;

  const subscriptions = await (prisma as unknown as {
    pushSubscription: { findMany: (args: object) => Promise<Array<{ id: string; endpoint: string; p256dh: string; auth: string }>> };
  }).pushSubscription.findMany({ where: { userId } });

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify(payload)
        );
      } catch (err: unknown) {
        const e = err as { statusCode?: number };
        if (e.statusCode === 410 || e.statusCode === 404) {
          await (prisma as unknown as {
            pushSubscription: { delete: (args: object) => Promise<unknown> };
          }).pushSubscription.delete({ where: { id: sub.id } });
        }
      }
    })
  );
}
