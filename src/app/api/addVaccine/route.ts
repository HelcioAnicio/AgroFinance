import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { dataOfVaccine } = json;

    const { data, error } = await supabase
      .from('Vaccine')
      .insert(dataOfVaccine);

    if (error) {
      console.error('Erro do Supabase:', error);
      return NextResponse.json(
        { message: 'Erro ao adicionar Vacina', error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Vacina atualizado com sucesso',
      data,
    });
  } catch (error) {
    console.error('Erro no handler:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
