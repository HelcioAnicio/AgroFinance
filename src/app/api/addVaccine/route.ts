import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
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

    // let createNotification = null;

    // const ownerIdToUse = user.id;

    // if (ownerIdToUse) {
    //   try {
    //     createNotification = await prisma.notification.create({
    //       data: {
    //         message: `A vacina ${createdVaccine.name} do animal vence hoje.`,
    //         notifyAt: new Date(createdVaccine.expiryDate),
    //         read: false,
    //         userId: ownerIdToUse,
    //         animalId: createdVaccine.animalId,
    //       },
    //     });
    //   } catch (notifError) {
    //     console.error('Erro de criação da notificação:', notifError);
    //   }
    // }

    return NextResponse.json({
      message: 'Vacina adicionada com sucesso',
      vaccine: createdVaccine,
      // notification: createNotification,
    });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error: String(error) },
      { status: 500 }
    );
  }
}
