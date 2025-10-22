import prisma from '@/lib/useDataBase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { fetchUsers } from '@/lib/fetchData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// import { Prisma } from '@prisma/client';
// import { Animal } from '@/types/animal';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const users = await fetchUsers();
  const userEmail = users.find((user) => user.email === session?.user?.email);

  if (!session || !userEmail) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();
    const items = Array.isArray(data) ? data : [data];

    const animals = items.map((item) => ({
      ...item,
      id: uuidv4(),
      manualId: item.manualId?.toLowerCase() ?? uuidv4(),
      birthDate: item.birthDate ? new Date(item.birthDate) : null,
      breed: item.breed?.toLowerCase() ?? 'desconhecida',
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
      ownerId: userEmail.id,
    }));

    // 1️⃣ Cria todos os animais
    // await prisma.animal.createMany({
    //   data: animals as Prisma.AnimalCreateManyInput[],
    //   skipDuplicates: true,
    // });

    // // 2️⃣ Cria o mapa manualId → id
    // const nameToId = new Map(animals.map((a) => [a.manualId, a.id]));

    // // 3️⃣ Atualiza os vínculos pai/mãe em paralelo
    // await Promise.all(
    //   animals.map(async (a) => {
    //     const paiId = a.fatherId ? nameToId.get(a.fatherId) : undefined;
    //     const maeId = a.motherId ? nameToId.get(a.motherId) : undefined;

    //     if (paiId || maeId) {
    //       const updateData: Record<string, Animal> = {};
    //       if (paiId) updateData.fatherId = paiId;
    //       if (maeId) updateData.motherId = maeId;

    //       await prisma.animal.update({
    //         where: {
    //           manualId_ownerId: { manualId: a.manualId, ownerId: a.ownerId },
    //         },
    //         data: updateData,
    //       });
    //     }
    //   })
    // );

    await prisma.animal.createMany({
      data: animals,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao importar animais:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
