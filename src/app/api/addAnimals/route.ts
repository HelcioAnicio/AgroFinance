import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers } from '@/lib/fetchData';
import prisma from '@/lib/useDataBase';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await fetchUsers();
  const user = users.find((u) => u.email === session.user?.email);
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  try {
    const text = await req.text();
    console.log('raw request body:', text);

    const body = text ? JSON.parse(text) : {};
    console.log('parsed body:', body);

    // const json = await req.json();

    const { allDataForm } = body || {};
    if (!allDataForm) {
      return NextResponse.json(
        { message: 'Dados do formulário não enviados' },
        { status: 400 }
      );
    }

    const createAnimal = await prisma.animal.create({ data: allDataForm });

    return NextResponse.json({
      message: 'Animal cadastrado com sucesso',
      createAnimal,
    });
  } catch (error: unknown) {
    console.error('Erro ao cadastrar animal:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar animal', error: String(error) },
      { status: 500 }
    );
  }
}
