import { PrismaClient } from "@prisma/client";
import { toDate, format } from "date-fns-tz";

const prisma = new PrismaClient();
const timeZone = "America/Sao_Paulo";

async function main() {
  try {
    const now = new Date();
    const zonedDate = toDate(now, { timeZone });
    const createdAt = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
      timeZone,
    });

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name: "Elcio Souza",
        email: "elcio.souza@dominio.com",
        cnpj: "11.000.123/0001-10",
        password: "senhaSegura456",
        createdAt: createdAt,
      },
    });

    console.log("User created:", user);

    const animalsData = [
      {
        manualId: 1,
        gender: "Female",
        birthDate: toDate(new Date("2020-10-22 08:13:45.015"), { timeZone }),
        weight: 420.0, // Adicione a propriedade weight
        breed: "Hereford",
        category: "Corte",
        reproductiveStatus: "Empty",
        handlingType: "Artificial Insemination",
        bullId: null,
        protocol: null,
        andrological: "Positive",
        fetalGender: null,
        bodyConditionScore: 3.8,
        expectedDueDate: toDate(new Date("2022-10-22 08:13:45.015"), {
          timeZone,
        }),
        bullIatf: null,
        ownerId: user.id, // Associa o animal ao usuário criado
        createdAt: createdAt,
      },
      {
        manualId: 2,
        gender: "male",
        birthDate: toDate(new Date("2020-10-22 08:13:45.015"), { timeZone }),
        weight: 420.0, // Adicione a propriedade weight
        breed: "Hereford",
        category: "Corte",
        reproductiveStatus: "Empty",
        handlingType: "Artificial Insemination",
        bullId: null,
        protocol: null,
        andrological: "Positive",
        fetalGender: null,
        bodyConditionScore: 3.8,
        ownerId: user.id, // Associa o animal ao usuário criado
        createdAt: createdAt,
      },
      // Adicione outros animais conforme necessário
    ];

    // Cadastra os animais
    for (const animalData of animalsData) {
      await prisma.animal.create({
        data: animalData,
      });
    }
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seed data added successfully!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
