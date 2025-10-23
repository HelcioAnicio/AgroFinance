import prisma from '@/lib/useDataBase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { fetchUsers } from '@/lib/fetchData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Animal } from '@/types/animal';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const users = await fetchUsers();
  const userEmail = users.find((user) => user.email === session?.user?.email);
  function excelDateToJSDate(serial: number) {
    return new Date((serial - 25569) * 86400 * 1000); // 25569 = 1970-01-01 offset
  }

  if (!session || !userEmail) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();
    const items = Array.isArray(data) ? data : [data];

    const animals = items.map((item: Animal) => ({
      ...item,
      id: uuidv4(),
      status:
        item.status === 'ativo'
          ? 'active'
          : item.status === 'inativo'
            ? 'inactive'
            : item.status === 'morto'
              ? 'dead'
              : 'sold',
      manualId: item.manualId?.toLowerCase(),
      gender: item.gender === 'macho' ? 'male' : 'female',
      birthDate:
        typeof item.birthDate === 'number' &&
        new Date(excelDateToJSDate(item.birthDate).toISOString().split('T')[0]),
      breed: item.breed?.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
      expectedDueDate:
        typeof item.expectedDueDate === 'number'
          ? new Date(
              excelDateToJSDate(item.expectedDueDate)
                .toISOString()
                .split('T')[0]
            )
          : null,
      vaccineDate:
        typeof item.vaccineDate === 'number'
          ? new Date(
              excelDateToJSDate(item.vaccineDate).toISOString().split('T')[0]
            )
          : null,
      vaccineExpiry:
        typeof item.vaccineExpiry === 'number'
          ? new Date(
              excelDateToJSDate(item.vaccineExpiry).toISOString().split('T')[0]
            )
          : null,
      dewormingDate:
        typeof item.dewormingDate === 'number'
          ? new Date(
              excelDateToJSDate(item.dewormingDate).toISOString().split('T')[0]
            )
          : null,
      dewormingExpiry:
        typeof item.dewormingExpiry === 'number'
          ? new Date(
              excelDateToJSDate(item.dewormingExpiry)
                .toISOString()
                .split('T')[0]
            )
          : null,
      ownerId: userEmail.id,
    }));

    console.log('animais do primeiro console', animals);

    const allAnimalsUpdated = animals.map((animal) => {
      let fatherId: string | null;
      let motherId: string | null;
      let bullId: string | null;
      let bullIatf: string | null;

      fatherId = animal.fatherId;
      motherId = animal.motherId;
      bullId = animal.bullId;
      bullIatf = animal.bullIatf;

      if (typeof fatherId === 'string' && fatherId.trim() !== '') {
        const fatherIdManual = fatherId.toLowerCase().trim();
        const foundByManual = animals.find(
          (a) => a.manualId === fatherIdManual
        );
        if (foundByManual) {
          fatherId = foundByManual.id;
        } else return null;
      }
      if (typeof motherId === 'string' && motherId.trim() !== '') {
        const motherIdManual = motherId.toLowerCase().trim();
        const foundByManual = animals.find(
          (a) => a.manualId === motherIdManual
        );
        if (foundByManual) {
          motherId = foundByManual.id;
        } else return null;
      }
      if (typeof bullId === 'string' && bullId.trim() !== '') {
        const bullIdManual = bullId.toLowerCase().trim();
        const foundByManual = animals.find((a) => a.manualId === bullIdManual);
        if (foundByManual) {
          bullId = foundByManual.id;
        } else return null;
      }
      if (typeof bullIatf === 'string' && bullIatf.trim() !== '') {
        const bullIatfManual = bullIatf.toLowerCase().trim();
        const foundByManual = animals.find(
          (a) => a.manualId === bullIatfManual
        );
        if (foundByManual) {
          bullIatf = foundByManual.id;
        } else return null;
      }

      return {
        ...animal,
        fatherId,
        motherId,
        bullId,
        bullIatf,
      };
    });

    console.log('animais do segundo console', allAnimalsUpdated);

    await prisma.animal.createMany({
      data: allAnimalsUpdated as [],
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao importar animais:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
