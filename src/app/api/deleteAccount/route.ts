import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function DELETE() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const animals = await prisma.animal.findMany({
      where: { ownerId: user.id },
      select: { id: true },
    });

    const animalIds = animals.map((a) => a.id);

    await prisma.$transaction(async (tx) => {
      if (animalIds.length > 0) {
        await tx.vaccine.deleteMany({ where: { animalId: { in: animalIds } } });
        await tx.disease.deleteMany({ where: { animalId: { in: animalIds } } });
        await tx.deworming.deleteMany({
          where: { animalId: { in: animalIds } },
        });

        // Notificações já têm cascade no schema, mas isso evita conflito caso haja FK diferente.
        await tx.notification.deleteMany({
          where: { animalId: { in: animalIds } },
        });

        await tx.animal.deleteMany({ where: { ownerId: user.id } });
      }

      await tx.user.delete({ where: { id: user.id } });
    });

    return NextResponse.json({ message: 'Conta excluída com sucesso' });
  } catch (error: unknown) {
    console.error('Erro ao excluir conta:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir conta', error: String(error) },
      { status: 500 }
    );
  }
}
