import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

type SanitaryType = 'vaccine' | 'deworming' | 'disease';

interface SanitaryPayload {
  type: SanitaryType;
  animalId: string;
  name: string;
  date: string;
  description?: string | null;
  expiryDate?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as SanitaryPayload;
    const { type, animalId, name, date, description, expiryDate } = payload;

    if (!type || !animalId || !name || !date) {
      return NextResponse.json(
        { message: 'Dados obrigatorios nao informados.' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json({ message: 'Data invalida.' }, { status: 400 });
    }

    const parsedExpiry = expiryDate ? new Date(expiryDate) : null;
    if (expiryDate && parsedExpiry && Number.isNaN(parsedExpiry.getTime())) {
      return NextResponse.json(
        { message: 'Data de vencimento invalida.' },
        { status: 400 }
      );
    }

    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      select: { id: true, manualId: true, ownerId: true },
    });

    if (!animal) {
      return NextResponse.json(
        { message: 'Animal nao encontrado.' },
        { status: 404 }
      );
    }

    let data: unknown = null;

    if (type === 'vaccine') {
      data = await prisma.vaccine.create({
        data: {
          id: uuidv4(),
          animalId,
          name,
          description: description ?? null,
          date: parsedDate,
          expiryDate: parsedExpiry ?? parsedDate,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    if (type === 'deworming') {
      data = await prisma.$transaction(async (tx) => {
        const created = await tx.deworming.create({
          data: {
            animalId,
            name,
            date: parsedDate,
          },
        });

        await tx.animal.update({
          where: { id: animalId },
          data: {
            dewormingName: name,
            dewormingDate: parsedDate,
            dewormingExpiry: parsedExpiry,
          },
        });

        return created;
      });
    }

    if (type === 'disease') {
      data = await prisma.disease.create({
        data: {
          animalId,
          name,
          description: description ?? null,
          date: parsedDate,
        },
      });
    }

    let notification = null;
    if (parsedExpiry) {
      const notifyAt = dayjs(parsedExpiry).subtract(2, 'day').toDate();
      notification = await prisma.notification.create({
        data: {
          id: uuidv4(),
          message: `O registro sanitario "${name}" do animal ${animal.manualId} vence em ${dayjs(parsedExpiry).format('DD/MM/YYYY')}.`,
          notifyAt,
          read: false,
          userId: animal.ownerId,
          animalId: animal.id,
        },
      });
    }

    return NextResponse.json({
      message: 'Registro sanitario criado com sucesso.',
      data,
      notification,
    });
  } catch (error) {
    console.error('Erro ao criar registro sanitario:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error: String(error) },
      { status: 500 }
    );
  }
}
