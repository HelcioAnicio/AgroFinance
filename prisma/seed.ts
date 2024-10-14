import { PrismaClient } from "@prisma/client";
import { format, toDate } from "date-fns-tz";

const prisma = new PrismaClient();
const timeZone = "America/Sao_Paulo"; // Ajuste para o fuso horário desejado

async function main() {
  try {
    // Ajusta a data de criação para o fuso horário do usuário
    const now = new Date();
    const zonedDate = toDate(now, { timeZone });
    const createdAt = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
      timeZone,
    });

    // Cria o segundo usuário
    const user2 = await prisma.user.create({
      data: {
        name: "Anna Souza",
        email: "anna.souze@dominio.com",
        cnpj: "12.345.678/0001-34",
        password: "senhaSegura456", // Lembre-se de hashear a senha em produção
        createdAt: createdAt,
      },
    });

    console.log("User created:", user2);

    // Cria animais associados ao segundo usuário
    // //   const animals2 = await prisma.animal.createMany({
    // //     data: [
    // //       {
    // //         manualId: "03",
    // //         gender: "Female",
    // //         birthDate: toZonedTime(new Date("2021-03-10"), timeZone),
    // //         weight: 420.0,
    // //         breed: "Hereford",
    // //         category: "Corte",
    // //         reproductiveStatus: "Pregnant",
    // //         handlingType: "Artificial Insemination",
    // //         bullId: null,
    // //         protocol: null,
    // //         andrological: "Positive",
    // //         bodyConditionScore: 3.8,
    // //         ownerId: user2.id, // Associa o animal ao usuário criado
    // //         createdAt: createdAt,
    // //       },
    // //       {
    // //         manualId: "04",
    // //         gender: "Male",
    // //         birthDate: toZonedTime(new Date("2020-11-05"), timeZone),
    // //         weight: 480.0,
    // //         breed: "Hereford",
    // //         category: "Corte",
    // //         reproductiveStatus: "Waiting",
    // //         handlingType: "Bull Covering",
    // //         bullId: null,
    // //         protocol: null,
    // //         andrological: "Negative",
    // //         bodyConditionScore: 4.2,
    // //         ownerId: user2.id, // Associa o animal ao usuário criado
    // //         createdAt: createdAt,
    // //       },
    // //     ],
    // //   });

    // //   console.log("Animals created:", animals2);
  } catch (error) {
    console.error("Error creating data:", error);
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
