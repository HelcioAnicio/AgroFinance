// src/lib/fetchData.ts
import prisma from '@/lib/prisma';
import { Animal } from '@/types/animal';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';
import { Vaccine } from '@/types/vaccine';
import { Notification } from '@/types/notification';

export const fetchAnimals = async (ownerId?: string): Promise<Animal[]> => {
  try {
    const animals = await prisma.animal.findMany({
      where: { ownerId },
    });

    const sortedAnimals = animals.sort((a, b) => {
      const aIsNumber = !isNaN(Number(a.manualId));
      const bIsNumber = !isNaN(Number(b.manualId));

      if (aIsNumber && bIsNumber) {
        return Number(a.manualId) - Number(b.manualId);
      } else if (!aIsNumber && !bIsNumber) {
        return String(a.manualId).localeCompare(String(b.manualId));
      } else {
        return aIsNumber ? -1 : 1;
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

export const fetchNotifications = async (
  ownerId: string
): Promise<Notification[]> => {
  if (!ownerId) {
    throw new Error('ownerId is required');
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: ownerId,
    },
  });

  return notifications as Notification[];
};

export const fetchVaccines = async (animalId: string): Promise<Vaccine[]> => {
  if (!animalId) {
    throw new Error('animalId is required');
  }

  const vaccines = await prisma.vaccine.findMany({
    where: {
      animalId,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return vaccines as Vaccine[];
};

const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function normalizeGender(gender?: string | null): 'male' | 'female' | null {
  if (!gender) return null;
  const value = gender.toLowerCase();

  if (value === 'male' || value === 'macho') return 'male';
  if (value === 'female' || value === 'femea' || value === 'fêmea') {
    return 'female';
  }

  return null;
}

function isDeadStatus(status?: string | null): boolean {
  if (!status) return false;
  const value = status.toLowerCase();
  return value === 'dead' || value === 'morto';
}

function buildYear(year: number): LivestockStatsYear {
  return {
    year,
    totalMaleBirths: 0,
    totalFemaleBirths: 0,
    totalBirths: 0,
    totalDeaths: 0,
    totalStatusChanges: 0,
    months: MONTH_LABELS.map((label, index) => ({
      month: index + 1,
      label,
      maleBirths: 0,
      femaleBirths: 0,
      deaths: 0,
      statusChanges: 0,
    })),
  };
}

export const fetchLivestockStats = async (
  ownerId?: string
): Promise<LivestockStatsYear[]> => {
  if (!ownerId) return [];

  const [animals, statusHistory] = await Promise.all([
    prisma.animal.findMany({
      where: { ownerId },
      select: {
        id: true,
        gender: true,
        status: true,
        birthDate: true,
        updatedAt: true,
      },
    }),
    prisma.animalStatusHistory.findMany({
      where: { ownerId },
      select: {
        animalId: true,
        newStatus: true,
        year: true,
        month: true,
      },
    }),
  ]);

  const yearsMap = new Map<number, LivestockStatsYear>();
  const getYear = (year: number) => {
    if (!yearsMap.has(year)) yearsMap.set(year, buildYear(year));
    return yearsMap.get(year)!;
  };

  for (const animal of animals) {
    const birthYear = animal.birthDate.getFullYear();
    const birthMonth = animal.birthDate.getMonth();
    const yearRef = getYear(birthYear);
    const monthRef = yearRef.months[birthMonth];
    const gender = normalizeGender(animal.gender);

    if (gender === 'male') {
      monthRef.maleBirths += 1;
      yearRef.totalMaleBirths += 1;
      yearRef.totalBirths += 1;
    }

    if (gender === 'female') {
      monthRef.femaleBirths += 1;
      yearRef.totalFemaleBirths += 1;
      yearRef.totalBirths += 1;
    }
  }

  const deadFromHistory = new Set<string>();

  for (const history of statusHistory) {
    if (history.month < 1 || history.month > 12) continue;

    const yearRef = getYear(history.year);
    const monthRef = yearRef.months[history.month - 1];
    monthRef.statusChanges += 1;
    yearRef.totalStatusChanges += 1;

    if (isDeadStatus(history.newStatus)) {
      monthRef.deaths += 1;
      yearRef.totalDeaths += 1;
      deadFromHistory.add(history.animalId);
    }
  }

  for (const animal of animals) {
    if (!isDeadStatus(animal.status)) continue;
    if (deadFromHistory.has(animal.id)) continue;

    const year = animal.updatedAt.getFullYear();
    const month = animal.updatedAt.getMonth();
    const yearRef = getYear(year);
    const monthRef = yearRef.months[month];
    monthRef.deaths += 1;
    yearRef.totalDeaths += 1;
  }

  return Array.from(yearsMap.values()).sort((a, b) => a.year - b.year);
};
