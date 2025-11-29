import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const notificationClicked = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const updateNotification = await prisma.notification.update({
      where: { id: notificationClicked.id },
      data: { read: true },
    });

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      updateNotification,
    });
  } catch (error) {
    console.error('Erro no handler:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
