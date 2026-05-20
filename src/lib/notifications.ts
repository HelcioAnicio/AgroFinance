import prisma from './prisma';

/**
 * Schedules two delayed notifications in the database for the farm owner:
 * - One warning 5 days before the trial ends/first charge is made.
 * - One warning 1 day before the trial ends/first charge is made.
 * Before creating the new ones, it deletes any existing subscription notifications (animalId is null).
 */
export async function scheduleSubscriptionNotifications(
  ownerUserId: string,
  trialEndsAt: Date
) {
  try {
    // 1. Delete all old subscription/system notifications for this user (where animalId is null)
    await prisma.notification.deleteMany({
      where: {
        userId: ownerUserId,
        animalId: null,
      },
    });

    const now = new Date();

    // 2. Schedule notification 5 days before trialEndsAt
    const notifyAt5Days = new Date(
      trialEndsAt.getTime() - 5 * 24 * 60 * 60 * 1000
    );
    if (notifyAt5Days > now) {
      await prisma.notification.create({
        data: {
          userId: ownerUserId,
          message:
            'Atenção: A primeira cobrança da sua assinatura do AgroFinance será realizada em 5 dias.',
          notifyAt: notifyAt5Days,
          read: false,
          animalId: null,
        },
      });
      console.log(
        `[NOTIFICATIONS] Scheduled 5-day warning for user ${ownerUserId} at ${notifyAt5Days.toISOString()}`
      );
    }

    // 3. Schedule notification 1 day before trialEndsAt
    const notifyAt1Day = new Date(
      trialEndsAt.getTime() - 1 * 24 * 60 * 60 * 1000
    );
    if (notifyAt1Day > now) {
      await prisma.notification.create({
        data: {
          userId: ownerUserId,
          message:
            'Atenção: A primeira cobrança da sua assinatura do AgroFinance será realizada amanhã.',
          notifyAt: notifyAt1Day,
          read: false,
          animalId: null,
        },
      });
      console.log(
        `[NOTIFICATIONS] Scheduled 1-day warning for user ${ownerUserId} at ${notifyAt1Day.toISOString()}`
      );
    }
  } catch (error) {
    console.error('[NOTIFICATIONS] Error scheduling notifications:', error);
  }
}
