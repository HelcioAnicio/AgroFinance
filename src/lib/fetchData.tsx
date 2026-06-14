// src/lib/fetchData.ts
import prisma from '@/lib/prisma';
import { Animal } from '@/types/animal';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';
import { Vaccine } from '@/types/vaccine';
import { Notification } from '@/types/notification';
import { ExternalBull } from '@/types/externalBull';

export const fetchAnimals = async (
  ownerId?: string,
  farmId?: string,
  extraOwnerIds?: string[]
): Promise<Animal[]> => {
  try {
    const allOwnerIds = [...new Set([ownerId, ...(extraOwnerIds ?? [])].filter(Boolean))] as string[];
    const ownerConditions = allOwnerIds.map((id) => ({ ownerId: id }));
    const animals = await prisma.animal.findMany({
      where: farmId
        ? { OR: [{ farmId }, ...ownerConditions] }
        : ownerConditions.length === 1
          ? { ownerId: allOwnerIds[0] }
          : { OR: ownerConditions },
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

export const fetchUserByEmail = async (
  email?: string | null
): Promise<User | null> => {
  if (!email) return null;

  return await prisma.user.findUnique({
    where: { email },
  });
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
    orderBy: {
      notifyAt: 'desc',
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

export const fetchExternalBulls = async (
  ownerId?: string,
  farmId?: string,
  extraOwnerIds?: string[]
): Promise<ExternalBull[]> => {
  if (!ownerId && !farmId && !extraOwnerIds?.length) return [];

  const allOwnerIds = [...new Set([ownerId, ...(extraOwnerIds ?? [])].filter(Boolean))] as string[];
  const ownerConditions = allOwnerIds.map((id) => ({ ownerId: id }));

  const externalBulls = await prisma.externalBull.findMany({
    where: farmId
      ? { OR: [{ farmId }, ...ownerConditions] }
      : ownerConditions.length === 1
        ? { ownerId: allOwnerIds[0] }
        : { OR: ownerConditions },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return externalBulls as ExternalBull[];
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

function normalizeStatus(status?: string | null): string {
  if (!status) return 'unknown';
  const value = status.toLowerCase();

  if (value === 'ativo') return 'active';
  if (value === 'inativo') return 'inactive';
  if (value === 'morto') return 'dead';
  if (value === 'perdida') return 'lost';
  if (value === 'descarte') return 'trash';
  if (value === 'vendido') return 'sold';

  return value;
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Ativo',
    inactive: 'Inativo',
    dead: 'Morto',
    lost: 'Perdido',
    trash: 'Descarte',
    sold: 'Vendido',
    empty: 'Vazia',
    pregnant: 'Prenha',
    waiting: 'Em espera',
    pev: 'PEV',
  };

  return labels[status] ?? status;
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
      statusBreakdown: [],
    })),
  };
}

export const fetchLivestockStats = async (
  ownerId?: string,
  farmId?: string,
  extraOwnerIds?: string[]
): Promise<LivestockStatsYear[]> => {
  if (!ownerId && !farmId && !extraOwnerIds?.length) return [];

  const allOwnerIds = [...new Set([ownerId, ...(extraOwnerIds ?? [])].filter(Boolean))] as string[];
  const ownerConditions = allOwnerIds.map((id) => ({ ownerId: id }));
  const ownerWhere = ownerConditions.length === 1 ? { ownerId: allOwnerIds[0] } : { OR: ownerConditions };

  const animals = await prisma.animal.findMany({
    where: farmId
      ? { OR: [{ farmId }, ...ownerConditions] }
      : ownerWhere,
    select: {
      id: true,
      gender: true,
      status: true,
      birthDate: true,
      updatedAt: true,
    },
  });
  const statusHistory = await prisma.animalStatusHistory.findMany({
    where: farmId
      ? { animalId: { in: animals.map((animal) => animal.id) } }
      : { ownerId },
    select: {
      animalId: true,
      newStatus: true,
      year: true,
      month: true,
      changedAt: true,
    },
  });

  // Build gender map for fast lookup during status history processing
  const animalGenderMap = new Map<string, 'male' | 'female' | null>(
    animals.map((a) => [a.id, normalizeGender(a.gender)])
  );

  type StatusCounter = { total: number; males: number; females: number };
  const yearsMap = new Map<number, LivestockStatsYear>();
  const monthStatusMap = new Map<string, Map<string, StatusCounter>>();

  const getYear = (year: number) => {
    if (!yearsMap.has(year)) yearsMap.set(year, buildYear(year));
    return yearsMap.get(year)!;
  };
  const getMonthStatusCounter = (year: number, month: number) => {
    const key = `${year}-${month}`;
    if (!monthStatusMap.has(key))
      monthStatusMap.set(key, new Map<string, StatusCounter>());
    return monthStatusMap.get(key)!;
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
    const normalizedStatus = normalizeStatus(history.newStatus);
    const gender = animalGenderMap.get(history.animalId);

    monthRef.statusChanges += 1;
    yearRef.totalStatusChanges += 1;

    const monthCounter = getMonthStatusCounter(history.year, history.month);
    const existing = monthCounter.get(normalizedStatus) ?? {
      total: 0,
      males: 0,
      females: 0,
    };
    existing.total += 1;
    if (gender === 'male') existing.males += 1;
    if (gender === 'female') existing.females += 1;
    monthCounter.set(normalizedStatus, existing);

    if (isDeadStatus(normalizedStatus)) {
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

  for (const [year, yearRef] of yearsMap.entries()) {
    for (const monthRef of yearRef.months) {
      const counter =
        monthStatusMap.get(`${year}-${monthRef.month}`) ??
        new Map<string, StatusCounter>();
      monthRef.statusBreakdown = Array.from(counter.entries())
        .map(([status, { total, males, females }]) => ({
          status,
          label: statusLabel(status),
          total,
          males,
          females,
        }))
        .sort((a, b) => b.total - a.total);
    }
  }

  return Array.from(yearsMap.values()).sort((a, b) => a.year - b.year);
};
