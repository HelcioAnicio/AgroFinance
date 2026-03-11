import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers } from '@/lib/fetchData';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import {
  parseWeightRecordDate,
  parseWeightRecordType,
} from '@/lib/weightHistory';
import { decrementExternalBullDosesForUsageDelta } from '@/lib/externalBullDoses';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await fetchUsers();
  const user = users.find((u) => u.email === session.user?.email);
  const ownerId = user?.id;
  if (!user || !ownerId)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  try {
    const json = await req.json();

    const { allDataForm } = json;
    if (!allDataForm) {
      return NextResponse.json(
        { message: 'Dados do formulário não enviados' },
        { status: 400 }
      );
    }

    const { weightRecordDate, weightRecordType, statusChangeDate, ...animalData } =
      allDataForm;

    const createAnimal = await prisma.$transaction(async (tx) => {
      const animal = await tx.animal.create({ data: animalData });

      await decrementExternalBullDosesForUsageDelta(
        tx,
        ownerId,
        [],
        [animalData.externalBullId, animalData.externalBullIatfId]
      );
      const changedAt =
        animal.status === 'active'
          ? new Date(animal.birthDate)
          : statusChangeDate
            ? new Date(statusChangeDate)
            : new Date();

      await tx.animalWeightHistory.create({
        data: {
          animalId: animal.id,
          weight: Number(animalData.weight),
          recordType: parseWeightRecordType(weightRecordType),
          measuredAt: parseWeightRecordDate(weightRecordDate),
        },
      });

      await tx.animalStatusHistory.create({
        data: {
          animalId: animal.id,
          ownerId: animal.ownerId,
          previousStatus: null,
          newStatus: animal.status,
          changedAt,
          year: changedAt.getFullYear(),
          month: changedAt.getMonth() + 1,
          reason: 'animal_creation',
        },
      });

      return animal;
    });

    let createNotification;

    if (
      allDataForm.reproductiveStatus === 'pregnant' &&
      allDataForm.expectedDueDate !== null &&
      allDataForm.expectedDueDate! >= new Date()
    ) {
      const expectedDueDate = new Date(allDataForm.expectedDueDate);

      const notifyAtOneMonth = new Date(expectedDueDate);
      notifyAtOneMonth.setMonth(notifyAtOneMonth.getMonth() - 1);

      const notifyAtFifteenDays = new Date(expectedDueDate);
      notifyAtFifteenDays.setDate(notifyAtFifteenDays.getDate() - 15);

      const animalIdToUse = createAnimal.id;
      const ownerIdToUse = createAnimal.ownerId ?? allDataForm.ownerId;

      try {
        console.log('Creating notifications for', {
          animalIdToUse,
          ownerIdToUse,
          notifyAtOneMonth,
          notifyAtFifteenDays,
        });

        createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${createAnimal.manualId} está próximo ao parto.`,
            notifyAt: notifyAtOneMonth,
            read: false,
            userId: ownerIdToUse,
            animalId: animalIdToUse,
          },
        });

        await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${createAnimal.manualId} está a 15 dias do parto.`,
            notifyAt: notifyAtFifteenDays,
            read: false,
            userId: ownerIdToUse,
            animalId: animalIdToUse,
          },
        });

        console.log('createNotification (1 mês antes) =>', createNotification);
      } catch (notifError) {
        console.error('Erro criando notificações:', notifError);
      }
    }

    return NextResponse.json({
      message: 'Animal cadastrado com sucesso',
      createAnimal,
      createNotification,
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.startsWith('EXTERNAL_BULL_DOSES_UNAVAILABLE')
    ) {
      return NextResponse.json(
        {
          message:
            'Não há doses suficientes para o touro externo selecionado.',
        },
        { status: 400 }
      );
    }

    console.error('Erro ao cadastrar animal:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar animal', error: String(error) },
      { status: 500 }
    );
  }
}
