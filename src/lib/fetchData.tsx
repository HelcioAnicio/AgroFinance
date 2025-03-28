// src/lib/fetchData.ts
import prisma from '@/lib/useDataBase';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { Vaccine } from '@/types/vaccine';

export const fetchAnimals = async (ownerId?: string): Promise<Animal[]> => {
  try {
    const animals = await prisma.animal.findMany({
      where: { ownerId },
    });

    const sortedAnimals = animals.sort((a, b) => {
      const aIsNumber = !isNaN(Number(a.manualId));
      const bIsNumber = !isNaN(Number(b.manualId));

      if (!aIsNumber && !bIsNumber) {
        return String(a.manualId).localeCompare(String(b.manualId));
      } else if (aIsNumber && bIsNumber) {
        return Number(a.manualId) - Number(b.manualId);
      } else {
        return aIsNumber ? 1 : -1;
      }
    });

    return sortedAnimals;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw new Error('Could not fetch animals.');
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const fetchVaccines = async (): Promise<Vaccine[]> => {
  const vaccines = await prisma.vaccine.findMany();
  const vaccinesWithAnimal = await Promise.all(
    vaccines.map(async (vaccine) => ({
      ...vaccine,
      animalId: await prisma.animal.findUnique({
        where: { id: vaccine.animalId },
      }),
    }))
  );
  return vaccinesWithAnimal as Vaccine[];
};
