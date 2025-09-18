import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/useDataBase';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { allDataForm } = json;

    if (!allDataForm) {
      return NextResponse.json(
        { message: 'Dados do formulário não enviados' },
        { status: 400 }
      );
    }

    const dateNow = new Date();
    const expectedDute = new Date(allDataForm.expectedDute);
    const monthOfExpectedDute = expectedDute.getMonth();

    // const createAnimal = await prisma.animal.create({ data: allDataForm });

    const { data } = await supabase.from('Animal').insert([allDataForm]);

    let createNotification;

    if (allDataForm.reproductiveStatus === 'pregnant') {
      createNotification = await prisma.notification.create({
        data: {
          id: uuidv4(),
          message: `Seu animal ${allDataForm.manualId} está próximo ao parto.`,
          notifyAt: new Date(expectedDute.setMonth(monthOfExpectedDute - 1)),
          read: false,
          userId: allDataForm.ownerId,
          animalId: allDataForm.id,
          createdAt: dateNow,
        },
      });
    }

    return NextResponse.json({
      message: 'Animal cadastrado com sucesso',
      data,
      createNotification,
    });
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar animal', error: String(error) },
      { status: 500 }
    );
  }
}
