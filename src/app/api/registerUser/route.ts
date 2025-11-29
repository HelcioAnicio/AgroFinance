import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const raw = json.userRegister ?? json.updateUser;
    console.log('userRegister: ', raw);

    if (!raw || typeof raw !== 'object') {
      return NextResponse.json(
        { message: 'Payload inválido' },
        { status: 400 }
      );
    }

    const allowed = ['name', 'email', 'cnpj', 'password', 'image'] as const;

    type CreatePayloadOptional = Partial<{
      name: string;
      email: string;
      cnpj: string;
      password: string;
      image: string;
    }>;

    type CreatePayload = {
      name: string;
      email: string;
      cnpj?: string;
      password?: string;
      image?: string;
    };

    const partialPayload = allowed.reduce<CreatePayloadOptional>((acc, key) => {
      const val = (raw as Record<string, unknown>)[key];
      if (typeof val === 'string' && val !== '') acc[key] = val;
      return acc;
    }, {} as CreatePayloadOptional);

    if (!partialPayload.name || !partialPayload.email) {
      return NextResponse.json(
        { message: 'Campos obrigatórios ausentes: name e email' },
        { status: 400 }
      );
    }

    const createPayload: CreatePayload = {
      name: partialPayload.name!,
      email: partialPayload.email!,
      ...(partialPayload.cnpj ? { cnpj: partialPayload.cnpj } : {}),
      ...(partialPayload.password ? { password: partialPayload.password } : {}),
      ...(partialPayload.image ? { image: partialPayload.image } : {}),
    };

    console.log('createPayload:', createPayload);

    const registerNewUser = await prisma.user.create({ data: createPayload });

    return NextResponse.json(
      {
        message: 'Usuario cadastrado com sucesso',
        user: {
          id: registerNewUser.id,
          name: registerNewUser.name,
          email: registerNewUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Erro ao cadastrar usuario:', error);

    // tratar erro de campo único (e-mail/cnpj duplicado)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error as Prisma.PrismaClientKnownRequestError).code === 'P2002'
    ) {
      return NextResponse.json(
        { message: 'Campo único duplicado (e-mail ou cnpj já cadastrado)' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Erro ao cadastrar usuario', error: String(error) },
      { status: 500 }
    );
  }
}
