import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

async function createOrUpdateNotification({
  animalId,
  ownerId,
  searchText,
  message,
  notifyAt,
}: {
  animalId: string;
  ownerId: string;
  searchText: string;
  message: string;
  notifyAt: Date;
}) {
  const existingNotification = await prisma.notification.findFirst({
    where: {
      animalId,
      message: {
        contains: searchText,
        mode: 'insensitive',
      },
    },
  });

  if (existingNotification) {
    return prisma.notification.update({
      where: { id: existingNotification.id },
      data: {
        message,
        notifyAt,
        read: false,
      },
    });
  }

  return prisma.notification.create({
    data: {
      id: uuidv4(),
      message,
      notifyAt,
      read: false,
      userId: ownerId,
      animalId,
    },
  });
}

function buildSanitaryNotifyAt(expiryDate: Date) {
  const notifyAt = dayjs(expiryDate).subtract(2, 'day');
  return notifyAt.isBefore(dayjs()) ? new Date() : notifyAt.toDate();
}

export async function GET() {
  try {
    const changedAt = new Date();
    const now = changedAt;
    const limite = dayjs().add(30, 'day').toDate();

    // pevExpiresAt added to schema — resolves fully after `prisma generate` post-migration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pevWhere = { reproductiveStatus: 'pev', pevExpiresAt: { lte: now } } as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pevUpdateData = { reproductiveStatus: 'empty', pevExpiresAt: null } as any;

    const animalsToUpdate = await prisma.animal.findMany({
      where: pevWhere,
      select: {
        id: true,
        ownerId: true,
        manualId: true,
      },
    });

    const result = await prisma.animal.updateMany({
      where: pevWhere,
      data: pevUpdateData,
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
            notifyAt: now,
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

    const animalsWithSanitaryExpiry = await prisma.animal.findMany({
      where: {
        OR: [
          {
            vaccineExpiry: {
              not: null,
              lte: limite,
            },
          },
          {
            dewormingExpiry: {
              not: null,
              lte: limite,
            },
          },
        ],
      },
      select: {
        id: true,
        ownerId: true,
        manualId: true,
        vaccineName: true,
        vaccineExpiry: true,
        dewormingName: true,
        dewormingExpiry: true,
      },
    });

    for (const animal of animalsWithSanitaryExpiry) {
      try {
        if (animal.vaccineExpiry) {
          const vaccineName = animal.vaccineName?.trim() || 'vacina';
          const expiresAt = new Date(animal.vaccineExpiry);
          const notifyAt = buildSanitaryNotifyAt(expiresAt);
          const message = `Vacina ${vaccineName} do animal ${animal.manualId} vence em ${dayjs(expiresAt).format('DD/MM/YYYY')}.`;

          const vaccineNotification = await createOrUpdateNotification({
            animalId: animal.id,
            ownerId: animal.ownerId,
            searchText: 'vacina',
            message,
            notifyAt,
          });
          notifications.push(vaccineNotification);
          console.log(`Notificação de vacina criada/atualizada para animal ${animal.manualId}`);
        }

        if (animal.dewormingExpiry) {
          const dewormingName = animal.dewormingName?.trim() || 'vermifugo';
          const expiresAt = new Date(animal.dewormingExpiry);
          const notifyAt = buildSanitaryNotifyAt(expiresAt);
          const message = `Vermifugo ${dewormingName} do animal ${animal.manualId} vence em ${dayjs(expiresAt).format('DD/MM/YYYY')}.`;

          const dewormingNotification = await createOrUpdateNotification({
            animalId: animal.id,
            ownerId: animal.ownerId,
            searchText: 'vermifugo',
            message,
            notifyAt,
          });
          notifications.push(dewormingNotification);
          console.log(`Notificação de vermifugo criada/atualizada para animal ${animal.manualId}`);
        }
      } catch (notifError) {
        console.error(
          `Erro criando notificação sanitária para animal ${animal.manualId}:`,
          notifError
        );
      }
    }

    // Age-based category updates
    const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();
    const twelveMonthsAgo = dayjs().subtract(12, 'month').toDate();
    const twentyFourMonthsAgo = dayjs().subtract(24, 'month').toDate();

    // neonate → calf (age >= 3 months, any gender)
    const neonateToCalf = await prisma.animal.updateMany({
      where: { category: 'neonate', birthDate: { lte: threeMonthsAgo }, status: 'active' },
      data: { category: 'calf' },
    });

    // calf → steer (male, age >= 12 months)
    const calfToSteer = await prisma.animal.updateMany({
      where: { category: 'calf', gender: 'male', birthDate: { lte: twelveMonthsAgo }, status: 'active' },
      data: { category: 'steer' },
    });

    // calf → cow (female, age >= 24 months)
    const calfToCow = await prisma.animal.updateMany({
      where: { category: 'calf', gender: 'female', birthDate: { lte: twentyFourMonthsAgo }, status: 'active' },
      data: { category: 'cow' },
    });

    return Response.json({
      message: 'Status atualizados com sucesso',
      updated: result.count,
      notificationsCreated: notifications.length,
      notifications,
      categoryUpdates: {
        neonateToCalf: neonateToCalf.count,
        calfToSteer: calfToSteer.count,
        calfToCow: calfToCow.count,
      },
    });
  } catch (error) {
    console.error('Erro ao executar o cron:', error);
    return Response.json(
      { error: 'Erro ao executar o cron', details: String(error) },
      { status: 500 }
    );
  }
}
