import React from 'react';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { Animal } from '@/types/animal';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import {
  fetchAnimals,
  fetchExternalBulls,
  fetchVaccines,
} from '@/lib/fetchData';
import { Vaccine } from '@/types/vaccine';
import { requireFarmContext } from '@/lib/tenant';
import { redirect } from 'next/navigation';

const DetailAnimalId = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const { context } = await requireFarmContext('view_animals');
  if (!context) redirect('/login');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const farmOwnerId = (context.farm as any).ownerUserId as string | null;

  const fetchAnimalDetail = unstable_cache(
    async (animalId: string, farmId: string, ownerId: string | null) =>
      prisma.animal.findFirst({
        where: {
          id: animalId,
          OR: [
            { farmId },
            ...(ownerId ? [{ farmId: null, ownerId }] : []),
          ],
        },
        include: {
          bull: true,
          offspringFromBull: { include: { weightHistories: { where: { recordType: 'PD' } } } },
          bullIatfRel: true,
          offspringFromBullIatf: { include: { weightHistories: { where: { recordType: 'PD' } } } },
          externalBull: true,
          externalBullIatfRel: true,
          father: true,
          offspringFromFather: { include: { weightHistories: { where: { recordType: 'PD' } } } },
          mother: true,
          offspringFromMother: { include: { weightHistories: { where: { recordType: 'PD' } } } },
          owner: true,
          weightHistories: { orderBy: { measuredAt: 'desc' } },
          calfLossHistories: {
            include: { fatherAnimal: true, externalBull: true },
            orderBy: { lossDate: 'desc' },
          },
          dewormings: { orderBy: { date: 'desc' } },
          diseases: { orderBy: { date: 'desc' } },
          vaccines: { orderBy: { date: 'desc' } },
        },
      }),
    ['animal-detail'],
    { revalidate: 60, tags: [`animal-${id}`] }
  );

  const [animals, externalBulls, animal] = await Promise.all([
    fetchAnimals(undefined, context.farm.id),
    fetchExternalBulls(undefined, context.farm.id),
    fetchAnimalDetail(id, context.farm.id, farmOwnerId),
  ]);
  if (!animal) redirect('/dashboard');

  const vaccines = await fetchVaccines(animal.id);
  const vaccine = vaccines;

  return (
    <>
      <EditableAnimalDetails
        animal={animal as Animal}
        animals={animals}
        externalBulls={externalBulls}
        vaccines={vaccines}
        vaccine={vaccine as unknown as Vaccine}
      />
    </>
  );
};
export default DetailAnimalId;
