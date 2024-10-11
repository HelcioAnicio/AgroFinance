import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.animal.createMany({
    data: [
      {
        id: "ANM001",
        gender: "Female",
        birthDate: new Date("2020-05-12"),
        weight: 350.5,
        breed: "Nelore",
        category: "Corte",
        reproductiveStatus: "Pregnant",
        handlingType: "Artificial Insemination",
        bullId: "BULL001",
        protocol: "Protocolo A",
        andrological: "Positive",
        expectedDueDate: new Date("2024-02-12"),
        bodyConditionScore: 3.5,
        ownerId: "USR001", // ID do usuário dono do animal
      },
      {
        id: "ANM002",
        gender: "Male",
        birthDate: new Date("2019-08-22"),
        weight: 500.0,
        breed: "Angus",
        category: "Corte",
        reproductiveStatus: "Waiting",
        handlingType: "Bull Covering",
        bullId: null, // Não aplicável para esse animal
        protocol: null, // Não aplicável
        andrological: "Negative",
        bodyConditionScore: 4.0,
        ownerId: "USR002",
      },
      // Adicione mais animais conforme a necessidade
    ],
  });
}

main()
  .then(() => {
    console.log("Seed data added successfully!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
