import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import { fetchAnimals, fetchExternalBulls } from '@/lib/fetchData';
import { Vaccine } from '@/types/vaccine';
import {
  fetchAnimalById,

  fetchExternalBulls,https://github.com/HelcioAnicio/AgroFinance/pull/142/conflict?name=src%252Fapp%252Fdashboard%252F%255Bid%255D%252Fpage.tsx&ancestor_oid=5e2e8d04d57749f4a8809d4ef4a00c7f562e9c54&base_oid=ab89bbea75b3b9ee0e4a9fc389ce61c94b105c35&head_oid=18c2587ec4fbd6074ffe1662ce3d878f2ce10f62
  fetchVaccines
} from '@/lib/fetchData';
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

  // Os três já vêm em paralelo numa única viagem ao banco cada um — as vacinas
  // já estão inclusas no fetchAnimalDetail acima, então não repetimos a busca.
  const [animals, externalBulls, animal] = await Promise.all([
    fetchAnimals(undefined, context.farm.id),
  const [animal, externalBulls, vaccines] = await Promise.all([
    fetchAnimalById(id, context.farm.id),
    // fetchAnimals(undefined, context.farm.id),
    fetchExternalBulls(undefined, context.farm.id),
    fetchVaccines(id, context.farm.id),
  ]);

  const vaccines = (animal.vaccines ?? []) as Vaccine[];

  return (
    <>
      <EditableAnimalDetails
        animal={animal as Animal}
        animals={animals}
        externalBulls={externalBulls}
        vaccines={vaccines}
        vaccine={vaccines as unknown as Vaccine}
      />
    </>
  if (!animal) redirect('/dashboard');

  return (
    <EditableAnimalDetails
      // animal={animal}
      // animalsLocal={animals}
      vaccines={vaccines}
      externalBulls={externalBulls}
    />
  );
};

export default DetailAnimalId;
