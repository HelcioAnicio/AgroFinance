import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { createAuditLog, requireFarmContext } from '@/lib/tenant';


// ... (keep POST, PUT, DELETE functions the same, but apply the fix below)

export async function POST(req: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const {
      animalId,
      lossDate: lossDateRaw,
      reason,
      expectedDueDate: expectedDueDateRaw,
      fatherType,
      fatherAnimalId,
      externalBullId,
    } = body;

    // ... (keep validation logic)

    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      select: { id: true, ownerId: true, farmId: true, reproductiveStatus: true },
    });

    if (!animal || animal.farmId !== context.farm.id) {
      return NextResponse.json({ message: 'Animal nao encontrado.' }, { status: 404 });
    }

    const payload = {
      animalId: animal.id,
      ownerId: animal.ownerId,
      previousStatus: animal.reproductiveStatus,
      newStatus: animal.reproductiveStatus ?? 'empty',
      expectedDueDate: expectedDueDateRaw ? new Date(expectedDueDateRaw) : null,
      lossDate: new Date(lossDateRaw),
      reason: reason ?? null,
      fatherType,
      fatherAnimalId: fatherType === 'internal' ? fatherAnimalId ?? null : null,
      externalBullId: fatherType === 'external' ? externalBullId ?? null : null,
    };

    const created = await prisma.$transaction(async (tx) => {
      const record = await tx.animalCalfLossHistory.create({ data: payload as any });

      await tx.animalStatusHistory.create({
        data: {
          animalId: animal.id,
          ownerId: animal.ownerId,
          previousStatus: animal.reproductiveStatus,
          newStatus: animal.reproductiveStatus ?? 'empty',
          changedAt: new Date(lossDateRaw),
          year: new Date(lossDateRaw).getFullYear(),
          month: new Date(lossDateRaw).getMonth() + 1,
          reason: 'historical_calf_loss',
        },
      });

      await createAuditLog(tx as any, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: 'animal.calf_loss_create',
        entityType: 'AnimalCalfLossHistory',
        entityId: record.id,
        after: JSON.parse(JSON.stringify(payload)),
      });

      return record;
    });

    const full = await prisma.animalCalfLossHistory.findUnique({
      where: { id: created.id },
      include: {
        fatherAnimal: { select: { id: true, manualId: true } },
        externalBull: { select: { id: true, name: true } },
      },
    });

    revalidateTag(`animal-${animalId}`);
    return NextResponse.json({ data: full }, { status: 201 });
  } catch (err) {
    console.error('Erro ao registrar perda de cria:', err);
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 });
  }
}

// ... (Include the original, unchanged PUT and DELETE functions here)
