import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import {
  parseWeightRecordDate,
  parseWeightRecordType,
} from '@/lib/weightHistory';

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const allDataForm = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const fieldsToRemove = [
      'bull',
      'offspringFromBull',
      'bullIatfRel',
      'offspringFromBullIatf',
      'father',
      'offspringFromFather',
      'mother',
      'offspringFromMother',
      'owner',
      'dewormings',
      'diseases',
      'vaccines',
      'weightHistories',
      'createdAt',
    ];
    fieldsToRemove.forEach((field) => delete allDataForm[field]);

    const recordType = parseWeightRecordType(allDataForm.weightRecordType);
    const measuredAt = parseWeightRecordDate(allDataForm.weightRecordDate);
    const statusChangeDate = allDataForm.statusChangeDate;

    delete allDataForm.weightRecordType;
    delete allDataForm.weightRecordDate;
    delete allDataForm.statusChangeDate;

    if (allDataForm.bodyConditionScore !== null) {
      allDataForm.bodyConditionScore = Number(allDataForm.bodyConditionScore);
    }

    const existingAnimal = await prisma.animal.findUnique({
      where: { id: allDataForm.id },
      select: { weight: true, status: true, ownerId: true },
    });

    if (!existingAnimal) {
      return NextResponse.json({ message: 'Animal não encontrado' }, { status: 404 });
    }

    const data = await prisma.$transaction(async (tx) => {
      const updatedAnimal = await tx.animal.update({
        where: { id: allDataForm.id },
        data: allDataForm,
      });

      const hasWeightChanged =
        Number(existingAnimal.weight) !== Number(allDataForm.weight);
      const hasStatusChanged =
        String(existingAnimal.status ?? '') !== String(allDataForm.status ?? '');

      if (hasWeightChanged) {
        await tx.animalWeightHistory.create({
          data: {
            animalId: updatedAnimal.id,
            weight: Number(updatedAnimal.weight),
            recordType: recordType,
            measuredAt: measuredAt,
          },
        });
      }

      if (hasStatusChanged) {
        const changedAt =
          updatedAnimal.status === 'active'
            ? new Date(updatedAnimal.birthDate)
            : statusChangeDate
              ? new Date(statusChangeDate)
              : new Date();
        await tx.animalStatusHistory.create({
          data: {
            animalId: updatedAnimal.id,
            ownerId: updatedAnimal.ownerId,
            previousStatus: existingAnimal.status,
            newStatus: updatedAnimal.status,
            changedAt,
            year: changedAt.getFullYear(),
            month: changedAt.getMonth() + 1,
            reason: 'animal_update',
          },
        });
      } else if (statusChangeDate && updatedAnimal.status !== 'active') {
        const changedAt = new Date(statusChangeDate);
        const latestStatusHistory = await tx.animalStatusHistory.findFirst({
          where: {
            animalId: updatedAnimal.id,
            newStatus: updatedAnimal.status,
          },
          orderBy: {
            changedAt: 'desc',
          },
          select: { id: true },
        });

        if (latestStatusHistory) {
          await tx.animalStatusHistory.update({
            where: { id: latestStatusHistory.id },
            data: {
              changedAt,
              year: changedAt.getFullYear(),
              month: changedAt.getMonth() + 1,
              reason: 'status_date_adjustment',
            },
          });
        }
      }

      return updatedAnimal;
    });

    const dateNow = new Date();
    let createNotification;

    if (
      allDataForm.reproductiveStatus === 'pregnant' &&
      allDataForm.expectedDueDate != null &&
      new Date(allDataForm.expectedDueDate) >= dateNow
    ) {
      const expectedDueDate = new Date(allDataForm.expectedDueDate);

      const notifyAtOneMonth = new Date(expectedDueDate);
      notifyAtOneMonth.setMonth(notifyAtOneMonth.getMonth() - 1);

      const notifyAtFifteenDays = new Date(expectedDueDate);
      notifyAtFifteenDays.setDate(notifyAtFifteenDays.getDate() - 15);

      const existingBirthNotificationOneMonth =
        await prisma.notification.findFirst({
          where: {
            animalId: allDataForm.id,
            message: { contains: 'próximo ao parto' },
          },
        });

      if (!existingBirthNotificationOneMonth) {
        createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${allDataForm.manualId} está próximo ao parto.`,
            notifyAt: notifyAtOneMonth,
            read: false,
            userId: allDataForm.ownerId,
            animalId: allDataForm.id,
            createdAt: dateNow,
          },
        });
      }

      const existingBirthNotificationFifteenDays =
        await prisma.notification.findFirst({
          where: {
            animalId: allDataForm.id,
            message: { contains: '15 dias do parto' },
          },
        });

      if (!existingBirthNotificationFifteenDays) {
        await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${allDataForm.manualId} está a 15 dias do parto.`,
            notifyAt: notifyAtFifteenDays,
            read: false,
            userId: allDataForm.ownerId,
            animalId: allDataForm.id,
            createdAt: dateNow,
          },
        });
      }
    }

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      data,
      createNotification,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
