import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const { userRegister } = json;

    const { data, error } = await supabase.from('User').insert([userRegister]);

    if (error) {
      console.error('Erro do Supabase:', error);
      return NextResponse.json(
        { message: 'Erro ao cadastrar usuario', error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Usuario cadastrado com sucesso',
      data,
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar usuario', error },
      { status: 500 }
    );
  }
}
