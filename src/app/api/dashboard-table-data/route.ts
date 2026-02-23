import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers, fetchAnimals } from '@/lib/fetchData';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const users = await fetchUsers();
    const userEmail = users.find((user) => user.email === session?.user?.email);
    const animals = await fetchAnimals(userEmail?.id ?? undefined);

    return NextResponse.json({ animals, users });
  } catch (error) {
    console.error('Error fetching dashboard table data:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar dados' },
      { status: 500 }
    );
  }
}
