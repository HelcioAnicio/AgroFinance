import prisma from '@/lib/useDataBase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '@/types/animal';

export async function POST(req: Request) {
  console.log(req);
  try {
    const data = await req.json();
    console.log('Data', data);

    const items = Array.isArray(data) ? data : [data];

    const animals = items.map((item: Animal) => ({
      ...item,
      id: uuidv4(),
      birthDate: new Date(item.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
      expectedDueDate: item.expectedDueDate
        ? new Date(item.expectedDueDate)
        : null,
      vaccineDate: item.vaccineDate ? new Date(item.vaccineDate) : null,
      vaccineExpiry: item.vaccineExpiry ? new Date(item.vaccineExpiry) : null,
      dewormingDate: item.dewormingDate ? new Date(item.dewormingDate) : null,
      dewormingExpiry: item.dewormingExpiry
        ? new Date(item.dewormingExpiry)
        : null,
    }));

    await prisma.animal.createMany({
      data: animals,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
