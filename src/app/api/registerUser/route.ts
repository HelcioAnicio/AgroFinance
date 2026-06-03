import { NextResponse, NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const raw = json.userRegister;

    if (!raw || typeof raw !== 'object') {
      return NextResponse.json(
        { message: 'Payload inválido' },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      cnpj,
      password,
      image,
    } = raw as Record<string, string>;

    if (!name || !email) {
      return NextResponse.json(
        { message: 'Campos obrigatórios ausentes: name e email' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        ...(cnpj && { cnpj }),
        ...(password && { password }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(
      {
        message: 'Usuario cadastrado com sucesso',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Erro ao cadastrar usuario:', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = (error.meta?.target as string[])?.join(', ');
      return NextResponse.json(
        { message: `Campo único duplicado: ${target} já cadastrado.` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Erro ao cadastrar usuario', error: String(error) },
      { status: 500 }
    );
  }
}
