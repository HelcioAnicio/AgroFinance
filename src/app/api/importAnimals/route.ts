import prisma from '@/lib/prisma';
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
        item.status === 'ativo' || item.status === 'active'
          ? 'active'
          : item.status === 'inativo' || item.status === 'inactive'
            ? 'inactive'
            : item.status === 'morto' || item.status === 'dead'
              ? 'dead'
              : item.status === 'vendido' || item.status === 'sold'
                ? 'sold'
                : item.status === 'perdida' || item.status === 'lost'
                  ? 'lost'
                  : item.status === 'descarte' || item.status === 'trash'
                    ? 'trash'
                    : 'active',
      manualId: item.manualId?.toLowerCase(),
      gender: item.gender === 'macho' ? 'male' : 'female',
      birthDate:
        typeof item.birthDate === 'number' &&
        new Date(excelDateToJSDate(item.birthDate).toISOString().split('T')[0]),
      breed: item.breed?.toLowerCase(),
      category:
        item.category === 'dependente'
          ? 'neonate'
          : item.category === 'bezerro'
            ? 'calf'
            : item.category === 'novilho' || item.category === 'garrote'
              ? 'steer'
              : item.category === 'vaca'
                ? 'cow'
                : item.category === 'vaca velha'
                  ? 'old cow'
                  : item.category === 'boi'
                    ? 'ox'
                    : item.category === 'boi velho'
                      ? 'old ox'
                      : 'bull',
      reproductiveStatus:
        item.reproductiveStatus === 'vazio'
          ? 'empty'
          : item.reproductiveStatus === 'prenha'
            ? 'pregnant'
            : item.reproductiveStatus === 'espera'
              ? 'waiting'
              : item.reproductiveStatus === 'pev'
                ? 'pev'
                : null,
      handlingType:
        item.handlingType === 'monta natural'
          ? 'handlingType'
          : item.handlingType === 'inseminação artificial'
            ? 'artificialInsemination'
            : item.handlingType === 'todos os metodos'
              ? 'allMethods'
              : null,
      protocol:
        item.protocol === '3 manejos'
          ? '3 handlings'
          : item.protocol === '4 manejos'
            ? '4 handlings'
            : item.protocol === 'misto'
              ? 'mixed'
              : null,
      andrological:
        item.andrological === 'positivo'
          ? 'positive'
          : item.andrological === 'negativo'
            ? 'negative'
            : item.andrological === 'não realizado'
              ? 'notDone'
              : null,
      fetalGender:
        item.fetalGender === 'macho'
          ? 'male'
          : item.andrological === 'femea'
            ? 'female'
            : null,
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

    const allAnimalsUpdated = animals.map((animal) => {
      let fatherId: string | null;
      let motherId: string | null;
      let bullId: string | null;
      let bullIatfId: string | null;

      fatherId = animal.fatherId;
      motherId = animal.motherId;
      bullId = animal.bullId;
      bullIatfId = animal.bullIatfId;

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
      if (typeof bullIatfId === 'string' && bullIatfId.trim() !== '') {
        const bullIatfIdManual = bullIatfId.toLowerCase().trim();
        const foundByManual = animals.find(
          (a) => a.manualId === bullIatfIdManual
        );
        if (foundByManual) {
          bullIatfId = foundByManual.id;
        } else return null;
      }

      return {
        ...animal,
        fatherId,
        motherId,
        bullId,
        bullIatfId,
      };
    });

    await prisma.animal.createMany({
      data: allAnimalsUpdated as [],
      skipDuplicates: true,
    });

    const validAnimals = allAnimalsUpdated.filter((a) => a !== null);

    for (const animal of validAnimals) {
      try {
        if (
          (animal?.reproductiveStatus === 'pregnant' ||
            animal?.reproductiveStatus === 'prenha') &&
          animal.expectedDueDate! >= new Date()
        ) {
          let expectedDute;

          if (animal.expectedDueDate !== null) {
            expectedDute = new Date(animal?.expectedDueDate);
          } else {
            return console.log('Expectativa está vazia');
          }
          const monthOfExpectedDute = expectedDute.getMonth();

          const notifyAt = new Date(
            expectedDute.setMonth(monthOfExpectedDute - 1)
          );

          notifyAt.setMonth(notifyAt.getMonth() - 1);

          if (!userEmail?.id) {
            throw new Error('Usuário não encontrado');
          }

          const existingBirthNotification = await prisma.notification.findFirst({
            where: {
              animalId: animal.id,
              message: { contains: 'próximo ao parto' },
            },
          });

          if (!existingBirthNotification) {
            await prisma.notification.create({
              data: {
                id: uuidv4(),
                message: `Seu animal ${animal.manualId} está próximo ao parto.`,
                notifyAt: notifyAt,
                read: false,
                userId: userEmail.id,
                animalId: animal.id,
                createdAt: new Date(),
              },
            });
          }
        }
      } catch (error) {
        console.log('Erro ao tentar cadastrar', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao importar animais:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
