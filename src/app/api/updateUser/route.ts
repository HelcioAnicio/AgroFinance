import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const json = await req.json();
    const raw = (json?.updateUser ?? json?.profileData ?? json) as Record<
      string,
      unknown
    >;

    const name =
      typeof raw?.name === 'string' ? raw.name.trim() : (undefined as never);
    const cnpj =
      typeof raw?.cnpj === 'string' ? raw.cnpj.trim() : (undefined as never);
    const image =
      typeof raw?.image === 'string' ? raw.image.trim() : (undefined as never);

    const data: { name?: string; cnpj?: string | null; image?: string | null } =
      {};

    if (typeof name === 'string' && name.length > 0) data.name = name;
    if (typeof cnpj === 'string') data.cnpj = cnpj.length > 0 ? cnpj : null;
    if (typeof image === 'string') data.image = image.length > 0 ? image : null;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: 'Nenhum campo válido para atualizar' },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: currentUser.id },
      data,
      select: { id: true, name: true, email: true, cnpj: true, image: true },
    });

    return NextResponse.json({ message: 'Perfil atualizado', user: updated });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { message: 'Campo único duplicado (e-mail ou cnpj já cadastrado)' },
        { status: 409 }
      );
    }

    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar perfil', error: String(error) },
      { status: 500 }
    );
  }
}

