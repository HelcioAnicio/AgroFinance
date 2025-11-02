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

    // const { data, error } = await supabase
    //   .from('Animal')
    //   .update(allDataForm)
    //   .eq('id', id)
    //   .select('*');

    const data = await prisma.animal.update({
      where: { id: allDataForm.id },
      data: allDataForm,
    });

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
