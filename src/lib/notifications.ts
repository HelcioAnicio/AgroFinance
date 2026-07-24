import prisma from './prisma';
import { sendPushToUser } from './webPush';

type PushableNotification = {
  id: string;
  userId: string;
  message: string;
  animalId?: string | null;
  notifyAt: Date | string;
};

/**
 * Envia push imediatamente para notificações cujo notifyAt já chegou. Sem
 * isso, o push só saía no lote diário do cron (as vezes só no dia
 * seguinte), mesmo com a notificação já criada e a permissão concedida no
 * celular — a notificação "não funcionava" por atraso, não por estar
 * quebrada.
 */
export async function pushNotificationsNow(
  notifications: PushableNotification[]
) {
  const now = Date.now();
  const due = notifications.filter(
    (n) => new Date(n.notifyAt).getTime() <= now
  );

  await Promise.allSettled(
    due.map((n) =>
      sendPushToUser(n.userId, {
        title: 'AgroFinance',
        body: n.message,
        url: n.animalId
          ? `/dashboard/${n.animalId}`
          : '/dashboard/notifications',
        tag: `notification-${n.id}`,
      })
    )
  );
}

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

/**
 * Notifica donos/gerentes da fazenda que um insumo cruzou o limiar de
 * estoque mínimo. Disparado no momento da movimentação — sem cron, sem
 * atraso — porque o alerta só é útil se chegar antes do insumo acabar.
 */
export async function notifyLowStock(
  farmId: string,
  insumoNome: string,
  quantidade: number,
  unidade: string,
  estoqueMin: number
) {
  try {
    const managers = await prisma.farmMembership.findMany({
      where: { farmId, role: { in: ['OWNER', 'MANAGER'] } },
      select: { userId: true },
    });

    if (managers.length === 0) return;

    const created = await prisma.notification.createManyAndReturn({
      data: managers.map((m) => ({
        userId: m.userId,
        message: `Estoque baixo: ${insumoNome} está com ${quantidade} ${unidade} (mínimo: ${estoqueMin} ${unidade}).`,
        notifyAt: new Date(),
        read: false,
      })),
    });

    await pushNotificationsNow(created);
  } catch (error) {
    console.error('[NOTIFICATIONS] Error notifying low stock:', error);
  }
}
