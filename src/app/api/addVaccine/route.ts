import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { dataOfVaccine } = json;
    console.log('dataOfVaccine: ', dataOfVaccine);
    if (!dataOfVaccine) {
      return NextResponse.json(
        { message: 'Dados do formulário não enviados' },
        { status: 400 }
      );
    }

    let data;
    try {
      data = await prisma.vaccine.create(dataOfVaccine);
      console.log('createNotification =>', data);
    } catch (notifError) {
      console.error('Erro criando notificação:', notifError);
    }

    return NextResponse.json({
      message: 'Vacina atualizado com sucesso',
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
