import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/useDataBase';

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const allDataForm = await req.json();
    console.log('allDataForm: ', allDataForm);

    if (!id) {
      return NextResponse.json(
        { message: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const fieldsToRemove = [
      'bull',
      'offspringFromBull',
      'father',
      'offspringFromFather',
      'mother',
      'offspringFromMother',
      'owner',
      'dewormings',
      'diseases',
      'vaccines',
    ];
    fieldsToRemove.forEach((field) => delete allDataForm[field]);

    const { data } = await supabase
      .from('Animal')
      .update(allDataForm)
      .eq('id', id)
      .select('*');

    const dateNow = new Date();
    const expectedDueDate = new Date(allDataForm.expectedDueDate);
    const monthOfExpectedDueDate = expectedDueDate.getMonth();

    let createNotification;

    if (allDataForm.reproductiveStatus === 'pregnant') {
      createNotification = await prisma.notification.create({
        data: {
          id: uuidv4(),
          message: `Seu animal ${allDataForm.manualId} está próximo ao parto.`,
          notifyAt: new Date(
            expectedDueDate.setMonth(monthOfExpectedDueDate - 1)
          ),
          read: false,
          userId: allDataForm.ownerId,
          animalId: allDataForm.id,
          createdAt: dateNow,
        },
      });
      console.log('createNotification: ', createNotification);
    }

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      data,
      createNotification,
    });
  } catch (error) {
    console.error('Erro no handler:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
