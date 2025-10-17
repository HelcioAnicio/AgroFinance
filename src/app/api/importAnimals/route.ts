import prisma from '@/lib/useDataBase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  console.log(req);
  try {
    const data = await req.json();
    console.log('Data', data);

    const items = Array.isArray(data) ? data : [data];

    const animals = items.map((item: any) => ({
      ...item,
      id: uuidv4(),
    }));

    await prisma.animal.createMany({
      data: animals,
      skipDuplicates: true, // evita inserir se já existir
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
