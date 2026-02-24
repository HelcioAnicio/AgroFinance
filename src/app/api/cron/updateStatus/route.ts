import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const limite = dayjs().add(30, 'day').toDate();
    const changedAt = new Date();

    const animalsToUpdate = await prisma.animal.findMany({
      where: {
        reproductiveStatus: 'pev',
      },
      select: {
        id: true,
        ownerId: true,
        manualId: true,
      },
    });

    const result = await prisma.animal.updateMany({
      where: {
        reproductiveStatus: 'pev',
      },
      data: {
        reproductiveStatus: 'empty',
      },
    });

    if (animalsToUpdate.length > 0) {
      await prisma.animalStatusHistory.createMany({
        data: animalsToUpdate.map((animal) => ({
          animalId: animal.id,
          ownerId: animal.ownerId,
          previousStatus: 'pev',
          newStatus: 'empty',
          changedAt,
          year: changedAt.getFullYear(),
          month: changedAt.getMonth() + 1,
          reason: 'cron_reproductive_status_update',
        })),
      });
    }

    const notifications = [];
    for (const animal of animalsToUpdate) {
      try {
        const createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${animal.manualId} saiu do status PEV e está vazio novamente.`,
            notifyAt: limite,
            read: false,
            userId: animal.ownerId,
            animalId: animal.id,
          },
        });
        notifications.push(createNotification);
        console.log(`Notificação criada para animal ${animal.manualId}`);
      } catch (notifError) {
        console.error(
          `Erro criando notificação para animal ${animal.manualId}:`,
          notifError
        );
      }
    }

    return Response.json({
      message: 'Status atualizados com sucesso',
      updated: result.count,
      notificationsCreated: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error('Erro ao executar o cron:', error);
    return Response.json(
      { error: 'Erro ao executar o cron', details: String(error) },
      { status: 500 }
    );
  }
}
