import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import {
  parseWeightRecordDate,
  parseWeightRecordType,
} from '@/lib/weightHistory';
import { decrementExternalBullDosesForUsageDelta } from '@/lib/externalBullDoses';
import { createAuditLog, requireFarmContext } from '@/lib/tenant';

const createCalfLossHistorySafely = async (payload: {
  animalId: string;
  ownerId: string;
  previousStatus: string | null;
  newStatus: string;
  expectedDueDate: Date | null;
  lossDate: Date;
  reason: string | null;
  fatherType: string;
  fatherAnimalId: string | null;
  externalBullId: string | null;
}) => {
  const calfLossDelegate = (
    prisma as unknown as {
      animalCalfLossHistory?: {
        create: (args: { data: typeof payload }) => Promise<unknown>;
      };
    }
  ).animalCalfLossHistory;

  if (calfLossDelegate?.create) {
    await calfLossDelegate.create({
      data: payload,
    });
    return;
  }

  console.warn(
    'animalCalfLossHistory delegate indisponivel no Prisma Client. Registro de perda ignorado; execute migrate/generate.'
  );
};

export async function PUT(req: Request) {
  try {
    const { context, error, status } =
      await requireFarmContext('manage_animals');
    if (!context) return NextResponse.json({ error }, { status });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const allDataForm = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID nao fornecido' },
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
      'externalBull',
      'externalBullIatfRel',
      'dewormings',
      'diseases',
      'vaccines',
      'weightHistories',
      'calfLossHistories',
      'farm',
      'createdAt',
    ];
    fieldsToRemove.forEach((field) => delete allDataForm[field]);

    const calfLossEvent = allDataForm.calfLossEvent;
    const recordType = parseWeightRecordType(allDataForm.weightRecordType);
    const measuredAt = parseWeightRecordDate(allDataForm.weightRecordDate);
    const statusChangeDate = allDataForm.statusChangeDate;

    delete allDataForm.weightRecordType;
    delete allDataForm.weightRecordDate;
    delete allDataForm.statusChangeDate;
    delete allDataForm.calfLossEvent;
    delete allDataForm.ownerId;
    delete allDataForm.farmId;

    if (allDataForm.bodyConditionScore !== null) {
      allDataForm.bodyConditionScore = Number(allDataForm.bodyConditionScore);
    }

    if (allDataForm.expectedDueDate === '') {
      allDataForm.expectedDueDate = null;
    } else if (allDataForm.expectedDueDate != null) {
      const parsedExpectedDueDate = new Date(allDataForm.expectedDueDate);
      if (Number.isNaN(parsedExpectedDueDate.getTime())) {
        return NextResponse.json(
          { message: 'Data prevista para o parto invalida.' },
          { status: 400 }
        );
      }
      allDataForm.expectedDueDate = parsedExpectedDueDate;
    }

    const existingAnimal = await prisma.animal.findUnique({
      where: { id: allDataForm.id },
      select: {
        id: true,
        manualId: true,
        weight: true,
        status: true,
        reproductiveStatus: true,
        expectedDueDate: true,
        ownerId: true,
        externalBullId: true,
        externalBullIatfId: true,
        farmId: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const farmOwnerId = (context.farm as any).ownerUserId as string | null;
    const isInFarm =
      existingAnimal.farmId === context.farm.id ||
      // Allow editing animals not yet migrated (farmId null) if owned by the farm owner
      (existingAnimal.farmId === null &&
        (existingAnimal.ownerId === farmOwnerId ||
          existingAnimal.ownerId === context.user.id));

    if (!existingAnimal || !isInFarm) {
      return NextResponse.json(
        { message: 'Animal nao encontrado' },
        { status: 404 }
      );
    }

    const data = await prisma.$transaction(async (tx) => {
      await decrementExternalBullDosesForUsageDelta(
        tx,
        existingAnimal.ownerId,
        [existingAnimal.externalBullId, existingAnimal.externalBullIatfId],
        [allDataForm.externalBullId, allDataForm.externalBullIatfId]
      );

      const updatedAnimal = await tx.animal.update({
        where: { id: allDataForm.id },
        data: { ...allDataForm, farmId: context.farm.id },
      });

      const hasWeightChanged =
        Number(existingAnimal.weight) !== Number(allDataForm.weight);
      const hasStatusChanged =
        String(existingAnimal.status ?? '') !==
        String(allDataForm.status ?? '');

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

        // Auto-create a financial income entry when an animal is sold
        const isSold =
          updatedAnimal.status === 'sold' || updatedAnimal.status === 'vendido';
        if (isSold) {
          const saleDate = statusChangeDate ? new Date(statusChangeDate) : new Date();
          await tx.transaction.create({
            data: {
              userId: existingAnimal.ownerId,
              farmId: context.farm.id,
              type: 'income',
              category: 'Venda de Animal',
              amount: 0,
              date: saleDate,
              description: `Venda do animal ${existingAnimal.manualId} — preencha o valor recebido`,
              status: false,
            },
          });
        }
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

      await createAuditLog(tx, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: 'animal.update',
        entityType: 'Animal',
        entityId: updatedAnimal.id,
        before: JSON.parse(JSON.stringify(existingAnimal)),
        after: JSON.parse(JSON.stringify(updatedAnimal)),
      });

      return updatedAnimal;
    });

    const dateNow = new Date();
    let createNotification;
    const previousReproductiveStatus = String(
      existingAnimal.reproductiveStatus ?? ''
    ).toLowerCase();
    const currentReproductiveStatus = String(
      data.reproductiveStatus ?? allDataForm.reproductiveStatus ?? ''
    ).toLowerCase();
    const expectedDueDateValue =
      data.expectedDueDate ?? allDataForm.expectedDueDate;
    const expectedDueDate = expectedDueDateValue
      ? new Date(expectedDueDateValue)
      : null;
    const isPevEarlyBeforeDueDate =
      currentReproductiveStatus === 'pev' &&
      expectedDueDate != null &&
      expectedDueDate.getTime() - dateNow.getTime() >= 1000 * 60 * 60 * 24 * 60;
    const changedToEmptyBeforePev =
      previousReproductiveStatus === 'pregnant' &&
      currentReproductiveStatus === 'empty' &&
      existingAnimal.expectedDueDate != null;
    const shouldEvaluateCalfLoss =
      previousReproductiveStatus === 'pregnant' &&
      (currentReproductiveStatus === 'empty' || isPevEarlyBeforeDueDate);

    if (
      currentReproductiveStatus === 'pregnant' &&
      expectedDueDate != null &&
      expectedDueDate >= dateNow
    ) {
      const notifyAtOneMonth = new Date(expectedDueDate);
      notifyAtOneMonth.setMonth(notifyAtOneMonth.getMonth() - 1);

      const notifyAtFifteenDays = new Date(expectedDueDate);
      notifyAtFifteenDays.setDate(notifyAtFifteenDays.getDate() - 15);

      const existingBirthNotificationOneMonth =
        await prisma.notification.findFirst({
          where: {
            animalId: data.id,
            message: { contains: 'proximo ao parto' },
          },
        });

      if (existingBirthNotificationOneMonth) {
        createNotification = await prisma.notification.update({
          where: { id: existingBirthNotificationOneMonth.id },
          data: {
            message: 'Seu animal ' + data.manualId + ' esta proximo ao parto.',
            notifyAt: notifyAtOneMonth,
            read: false,
          },
        });
      } else {
        createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: 'Seu animal ' + data.manualId + ' esta proximo ao parto.',
            notifyAt: notifyAtOneMonth,
            read: false,
            userId: data.ownerId,
            animalId: data.id,
            createdAt: dateNow,
          },
        });
      }

      const existingBirthNotificationFifteenDays =
        await prisma.notification.findFirst({
          where: {
            animalId: data.id,
            message: { contains: '15 dias do parto' },
          },
        });

      if (existingBirthNotificationFifteenDays) {
        await prisma.notification.update({
          where: { id: existingBirthNotificationFifteenDays.id },
          data: {
            message:
              'Seu animal ' + data.manualId + ' esta a 15 dias do parto.',
            notifyAt: notifyAtFifteenDays,
            read: false,
          },
        });
      } else {
        await prisma.notification.create({
          data: {
            id: uuidv4(),
            message:
              'Seu animal ' + data.manualId + ' esta a 15 dias do parto.',
            notifyAt: notifyAtFifteenDays,
            read: false,
            userId: data.ownerId,
            animalId: data.id,
            createdAt: dateNow,
          },
        });
      }
    }

    if (changedToEmptyBeforePev) {
      await prisma.notification.deleteMany({
        where: {
          animalId: data.id,
          userId: data.ownerId,
          OR: [
            { message: { contains: 'proximo ao parto' } },
            { message: { contains: '15 dias do parto' } },
          ],
        },
      });
    }

    if (shouldEvaluateCalfLoss && calfLossEvent?.confirmed === true) {
      const lossDate = calfLossEvent.lossDate
        ? new Date(calfLossEvent.lossDate)
        : new Date();
      const fatherType =
        calfLossEvent.fatherType === 'external' ? 'external' : 'internal';
      const fatherAnimalId =
        fatherType === 'internal'
          ? (calfLossEvent.fatherAnimalId ?? null)
          : null;
      const externalBullId =
        fatherType === 'external'
          ? (calfLossEvent.externalBullId ?? null)
          : null;

      if (Number.isNaN(lossDate.getTime())) {
        return NextResponse.json(
          { message: 'Data de perda invalida.' },
          { status: 400 }
        );
      }

      if (
        (fatherType === 'internal' && !fatherAnimalId) ||
        (fatherType === 'external' && !externalBullId)
      ) {
        return NextResponse.json(
          { message: 'Pai da cria deve ser informado.' },
          { status: 400 }
        );
      }

      await createCalfLossHistorySafely({
        animalId: data.id,
        ownerId: data.ownerId,
        previousStatus: existingAnimal.reproductiveStatus,
        newStatus: currentReproductiveStatus,
        expectedDueDate: expectedDueDate ?? null,
        lossDate,
        reason: calfLossEvent.reason ?? null,
        fatherType,
        fatherAnimalId,
        externalBullId,
      });
    }

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      data,
      createNotification,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('EXTERNAL_BULL_DOSES_UNAVAILABLE')
    ) {
      return NextResponse.json(
        {
          message: 'Nao ha doses suficientes para o touro externo selecionado.',
        },
        { status: 400 }
      );
    }

    console.log(error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
