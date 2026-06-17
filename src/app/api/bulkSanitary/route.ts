import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { requireFarmContext } from '@/lib/tenant';

type SanitaryType = 'vaccine' | 'deworming' | 'disease';

interface BulkSanitaryPayload {
  animalIds: string[];
  type: SanitaryType;
  name: string;
  date: string;
  expiryDate?: string | null;
  description?: string | null;
}

export async function POST(req: NextRequest) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const payload = (await req.json()) as BulkSanitaryPayload;
  const { animalIds, type, name, date, expiryDate, description } = payload;

  if (!animalIds?.length || !type || !name || !date) {
    return NextResponse.json({ error: 'Dados obrigatórios não informados.' }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }

  const parsedExpiry = expiryDate ? new Date(expiryDate) : null;
  if (expiryDate && parsedExpiry && isNaN(parsedExpiry.getTime())) {
    return NextResponse.json({ error: 'Data de vencimento inválida.' }, { status: 400 });
  }

  // Verify all animals belong to this farm
  const animals = await prisma.animal.findMany({
    where: { id: { in: animalIds }, farmId: context.farm.id },
    select: { id: true, manualId: true, ownerId: true },
  });

  if (animals.length === 0) {
    return NextResponse.json({ error: 'Nenhum animal encontrado nesta fazenda.' }, { status: 404 });
  }

  const validIds = animals.map((a) => a.id);

  try {
    await prisma.$transaction(async (tx) => {
      if (type === 'vaccine') {
        await tx.vaccine.createMany({
          data: validIds.map((animalId) => ({
            id: uuidv4(),
            animalId,
            name,
            description: description ?? null,
            date: parsedDate,
            expiryDate: parsedExpiry ?? parsedDate,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        });
      }

      if (type === 'deworming') {
        await tx.deworming.createMany({
          data: validIds.map((animalId) => ({
            animalId,
            name,
            date: parsedDate,
          })),
        });

        await tx.animal.updateMany({
          where: { id: { in: validIds } },
          data: {
            dewormingName: name,
            dewormingDate: parsedDate,
            dewormingExpiry: parsedExpiry,
          },
        });
      }

      if (type === 'disease') {
        await tx.disease.createMany({
          data: validIds.map((animalId) => ({
            id: uuidv4(),
            animalId,
            name,
            description: description ?? null,
            date: parsedDate,
          })),
        });
      }

      // Create notifications for expiry (only when there's an expiry date)
      if (parsedExpiry) {
        const notifyAt = dayjs(parsedExpiry).subtract(2, 'day').toDate();
        await tx.notification.createMany({
          data: animals.map((animal) => ({
            id: uuidv4(),
            message: `O registro sanitário "${name}" do animal ${animal.manualId} vence em ${dayjs(parsedExpiry).format('DD/MM/YYYY')}.`,
            notifyAt,
            read: false,
            userId: animal.ownerId,
            animalId: animal.id,
          })),
        });
      }
    }, { timeout: 30000 });

    return NextResponse.json({
      message: `Registro sanitário aplicado em ${validIds.length} animais.`,
      count: validIds.length,
    });
  } catch (err) {
    console.error('Erro ao criar registros sanitários em massa:', err);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
