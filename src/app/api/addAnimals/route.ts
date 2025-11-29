import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers } from '@/lib/fetchData';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await fetchUsers();
  const user = users.find((u) => u.email === session.user?.email);
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  try {
    const json = await req.json();

    const { allDataForm } = json;
    if (!allDataForm) {
      return NextResponse.json(
        { message: 'Dados do formulário não enviados' },
        { status: 400 }
      );
    }

    const createAnimal = await prisma.animal.create({ data: allDataForm });

    let createNotification;

    if (
      allDataForm.reproductiveStatus === 'pregnant' &&
      allDataForm.expectedDueDate !== null &&
      allDataForm.expectedDueDate! >= new Date()
    ) {
      const expectedDueDate = new Date(allDataForm.expectedDueDate);
      const notifyAt = expectedDueDate.setMonth(expectedDueDate.getMonth() - 1);

      const animalIdToUse = createAnimal.id;
      const ownerIdToUse = createAnimal.ownerId ?? allDataForm.ownerId;
      try {
        console.log('Creating notification for', {
          animalIdToUse,
          ownerIdToUse,
          notifyAt,
        });
        createNotification = await prisma.notification.create({
          data: {
            id: uuidv4(),
            message: `Seu animal ${createAnimal.manualId} está próximo ao parto.`,
            notifyAt: new Date(notifyAt),
            read: false,
            userId: ownerIdToUse,
            animalId: animalIdToUse,
          },
        });
        console.log('createNotification =>', createNotification);
      } catch (notifError) {
        console.error('Erro criando notificação:', notifError);
      }
    }

    return NextResponse.json({
      message: 'Animal cadastrado com sucesso',
      createAnimal,
      createNotification,
    });
  } catch (error: unknown) {
    console.error('Erro ao cadastrar animal:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar animal', error: String(error) },
      { status: 500 }
    );
  }
}
