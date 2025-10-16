import prisma from '@/lib/useDataBase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    await prisma.animal.createMany({
      data,
      skipDuplicates: true, // evita inserir se já existir
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
