import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? null;

    if (!email) {
      return NextResponse.json({ message: 'Nao autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'ID nao fornecido' },
        { status: 400 }
      );
    }

    const updateNotification = await prisma.notification.updateMany({
      where: { id, userId: user.id },
      data: { read: true },
    });

    if (updateNotification.count === 0) {
      return NextResponse.json(
        { message: 'Notificacao nao encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Notificacao marcada como lida com sucesso',
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? null;

    if (!email) {
      return NextResponse.json({ message: 'Nao autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'ID nao fornecido' },
        { status: 400 }
      );
    }

    const deletedNotification = await prisma.notification.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    if (deletedNotification.count === 0) {
      return NextResponse.json(
        { message: 'Notificacao nao encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Notificacao excluida com sucesso',
    });
  } catch (error) {
    console.error('Erro no handler:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
