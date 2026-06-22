import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import prisma from '@/lib/prisma';
import { createAuditLog, requireFarmContext } from '@/lib/tenant';

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

    if (!animalId || !lossDateRaw || !reason || !fatherType) {
      return NextResponse.json(
        { message: 'Campos obrigatorios: animalId, lossDate, reason, fatherType.' },
        { status: 400 }
      );
    }

    const lossDate = new Date(lossDateRaw);
    if (Number.isNaN(lossDate.getTime())) {
      return NextResponse.json({ message: 'Data de perda invalida.' }, { status: 400 });
    }

    const expectedDueDate = expectedDueDateRaw ? new Date(expectedDueDateRaw) : null;
    if (expectedDueDate && Number.isNaN(expectedDueDate.getTime())) {
      return NextResponse.json({ message: 'Previsao de parto invalida.' }, { status: 400 });
    }

    if (fatherType === 'internal' && !fatherAnimalId) {
      return NextResponse.json({ message: 'Pai interno requer fatherAnimalId.' }, { status: 400 });
    }
    if (fatherType === 'external' && !externalBullId) {
      return NextResponse.json({ message: 'Pai externo requer externalBullId.' }, { status: 400 });
    }

    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      select: { id: true, ownerId: true, farmId: true, reproductiveStatus: true },
    });

    if (!animal || animal.farmId !== context.farm.id) {
      return NextResponse.json({ message: 'Animal nao encontrado.' }, { status: 404 });
    }

    const calfLossDelegate = (
      prisma as unknown as {
        animalCalfLossHistory?: {
          create: (args: { data: object }) => Promise<{ id: string }>;
        };
      }
    ).animalCalfLossHistory;

    if (!calfLossDelegate?.create) {
      return NextResponse.json(
        { message: 'Funcionalidade indisponivel. Execute prisma generate.' },
        { status: 503 }
      );
    }

    const payload = {
      animalId: animal.id,
      ownerId: animal.ownerId,
      previousStatus: animal.reproductiveStatus,
      newStatus: animal.reproductiveStatus ?? 'empty',
      expectedDueDate,
      lossDate,
      reason: reason ?? null,
      fatherType,
      fatherAnimalId: fatherType === 'internal' ? (fatherAnimalId ?? null) : null,
      externalBullId: fatherType === 'external' ? (externalBullId ?? null) : null,
    };

    const created = await prisma.$transaction(async (tx) => {
      const record = await (
        tx as unknown as {
          animalCalfLossHistory: { create: (args: { data: object }) => Promise<{ id: string }> };
        }
      ).animalCalfLossHistory.create({ data: payload });

      await tx.animalStatusHistory.create({
        data: {
          animalId: animal.id,
          ownerId: animal.ownerId,
          previousStatus: animal.reproductiveStatus,
          newStatus: animal.reproductiveStatus ?? 'empty',
          changedAt: lossDate,
          year: lossDate.getFullYear(),
          month: lossDate.getMonth() + 1,
          reason: 'historical_calf_loss',
        },
      });

      await createAuditLog(tx, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: 'animal.calf_loss_create',
        entityType: 'AnimalCalfLossHistory',
        entityId: record.id,
        after: JSON.parse(JSON.stringify(payload)),
      });

      return record;
    });

    const full = await (
      prisma as unknown as {
        animalCalfLossHistory: {
          findUnique: (args: object) => Promise<unknown>;
        };
      }
    ).animalCalfLossHistory.findUnique({
      where: { id: (created as { id: string }).id },
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

export async function PUT(req: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID nao fornecido.' }, { status: 400 });

    const body = await req.json();
    const { lossDate: lossDateRaw, reason, expectedDueDate: expectedDueDateRaw, fatherType, fatherAnimalId, externalBullId } = body;

    if (!lossDateRaw || !reason || !fatherType) {
      return NextResponse.json({ message: 'Campos obrigatorios: lossDate, reason, fatherType.' }, { status: 400 });
    }

    const lossDate = new Date(lossDateRaw);
    if (Number.isNaN(lossDate.getTime())) return NextResponse.json({ message: 'Data invalida.' }, { status: 400 });

    const expectedDueDate = expectedDueDateRaw ? new Date(expectedDueDateRaw) : null;

    const calfLossDelegate = (
      prisma as unknown as {
        animalCalfLossHistory?: {
          findUnique: (args: object) => Promise<{ id: string; animalId: string; animal: { farmId: string } } | null>;
          update: (args: object) => Promise<unknown>;
        };
      }
    ).animalCalfLossHistory;

    if (!calfLossDelegate?.findUnique) {
      return NextResponse.json({ message: 'Funcionalidade indisponivel.' }, { status: 503 });
    }

    const record = await calfLossDelegate.findUnique({
      where: { id },
      include: { animal: { select: { farmId: true } } },
    } as object);

    if (!record || record.animal.farmId !== context.farm.id) {
      return NextResponse.json({ message: 'Registro nao encontrado.' }, { status: 404 });
    }

    const updated = await calfLossDelegate.update({
      where: { id },
      data: {
        lossDate,
        reason: reason ?? null,
        expectedDueDate,
        fatherType,
        fatherAnimalId: fatherType === 'internal' ? (fatherAnimalId ?? null) : null,
        externalBullId: fatherType === 'external' ? (externalBullId ?? null) : null,
      },
      include: {
        fatherAnimal: { select: { id: true, manualId: true } },
        externalBull: { select: { id: true, name: true } },
      },
    } as object);

    revalidateTag(`animal-${record.animalId}`);
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error('Erro ao editar perda de cria:', err);
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID nao fornecido.' }, { status: 400 });
    }

    const calfLossDelegate = (
      prisma as unknown as {
        animalCalfLossHistory?: {
          findUnique: (args: object) => Promise<{ id: string; animalId: string; animal: { farmId: string } } | null>;
          delete: (args: object) => Promise<unknown>;
        };
      }
    ).animalCalfLossHistory;

    if (!calfLossDelegate?.findUnique) {
      return NextResponse.json({ message: 'Funcionalidade indisponivel.' }, { status: 503 });
    }

    const record = await calfLossDelegate.findUnique({
      where: { id },
      include: { animal: { select: { farmId: true } } },
    } as object);

    if (!record || record.animal.farmId !== context.farm.id) {
      return NextResponse.json({ message: 'Registro nao encontrado.' }, { status: 404 });
    }

    await calfLossDelegate.delete({ where: { id } } as object);

    revalidateTag(`animal-${record.animalId}`);
    return NextResponse.json({ message: 'Registro removido.' });
  } catch (err) {
    console.error('Erro ao deletar perda de cria:', err);
    return NextResponse.json({ message: 'Erro interno.' }, { status: 500 });
  }
}
