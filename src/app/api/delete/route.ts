import { NextResponse } from 'next/server';
import prisma from '@/lib/useDataBase';

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const allDataForm = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const deleteAnimal = await prisma.animal.delete({
      where: {
        id: allDataForm.id,
      },
    });

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      deleteAnimal,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
