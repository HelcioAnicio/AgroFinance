import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { dataOfVaccine } = json;
    const { animalId, ...rest } = dataOfVaccine;

    if (!dataOfVaccine || !dataOfVaccine.animalId) {
      return NextResponse.json(
        { message: 'ID do animal não fornecido' },
        { status: 400 }
      );
    }

    const createdVaccine = await prisma.vaccine.create({
      data: {
        ...rest,
        animal: {
          connect: { id: animalId },
        },
      },
    });

    let createNotification = null;

    try {
      const animal = await prisma.animal.findUnique({
        where: { id: createdVaccine.animalId },
        select: { id: true, manualId: true, ownerId: true },
      });

      if (animal && createdVaccine.expiryDate) {
        const notifyAt = dayjs(createdVaccine.expiryDate)
          .subtract(2, 'day')
          .toDate();

        createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `A vacina ${createdVaccine.name} do animal ${animal.manualId} irá expirar em ${dayjs(createdVaccine.expiryDate).format('DD/MM/YYYY')}.`,
            notifyAt,
            read: false,
            userId: animal.ownerId,
            animalId: animal.id,
          },
        });
      }
    } catch (notifError) {
      console.error('Erro de criação da notificação de vacina:', notifError);
    }

    return NextResponse.json({
      message: 'Vacina adicionada com sucesso',
      vaccine: createdVaccine,
      notification: createNotification,
    });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error: String(error) },
      { status: 500 }
    );
  }
}
