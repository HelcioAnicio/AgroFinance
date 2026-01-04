import { PrismaClient } from '@prisma/client';
import { toDate } from 'date-fns-tz';

const prisma = new PrismaClient();
const timeZone = 'America/Sao_Paulo';

async function main() {
  try {
    const now = new Date();
    // const zonedDate = toDate(now, { timeZone });
    // const createdAt = format(zonedDate, 'yyyy-MM-dd"T"HH:mm:ss.SSSXXX', {
    //   timeZone,
    // });

    // Cria o usuário
    // const user = await prisma.user.create({
    //   data: {
    //     name: "Elcio Souza",
    //     email: "elcio.souza@dominio.com",
    //     cnpj: "11.000.123/0001-10",
    //     password: "senhaSegura456",
    //     createdAt: createdAt,
    //   },
    // });

    // console.log("User created:", user);

    const animals = await prisma.animal.createMany({
      data: [
        {
          manualId: '1',
          gender: 'Female',
          birthDate: toDate(new Date('2020-10-22 '), { timeZone }),
          weight: 200.0,
          breed: 'Hereford',
          category: '',
          reproductiveStatus: 'Empty',
          handlingType: null,
          bullId: null,
          protocol: null,
          andrological: 'Positive',
          fetalGender: null,
          bodyConditionScore: 3.8,
          expectedDueDate: new Date('2022-10-22'),
          bullIatfId: null,
          ownerId: '8832f4f1-4486-41d5-b62b-47d8fba25ee7',
          createdAt: now,
        },
        {
          manualId: '2',
          gender: 'male',
          birthDate: toDate(new Date('2020-10-22 08:13:45.015'), { timeZone }),
          weight: 420.0,
          breed: 'Hereford',
          category: 'Corte',
          reproductiveStatus: null,
          handlingType: null,
          bullId: null,
          protocol: null,
          andrological: 'Positive',
          fetalGender: null,
          bodyConditionScore: 2.8,
          expectedDueDate: new Date('2022-10-22'),
          bullIatfId: null,
          ownerId: '8832f4f1-4486-41d5-b62b-47d8fba25ee7',
          createdAt: now,
        },
      ],
    });

    console.log('Animals created:', animals);
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('Seed data added successfully!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
