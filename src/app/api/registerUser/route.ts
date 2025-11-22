import prisma from '@/lib/useDataBase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const { userRegister } = json;

    const registerNewUser = await prisma.user.create(userRegister);

    return NextResponse.json({
      message: 'Usuario cadastrado com sucesso',
      registerNewUser,
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar usuario', error },
      { status: 500 }
    );
  }
}
