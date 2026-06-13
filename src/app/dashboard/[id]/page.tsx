import React from 'react';
import { prisma } from '@/lib/prisma';
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

  const animals = await fetchAnimals(context.user.id, context.farm.id);
  const externalBulls = await fetchExternalBulls(
    context.user.id,
    context.farm.id
  );
  const animal = await prisma.animal.findFirst({
    where: { id, farmId: context.farm.id },
    include: {
      bull: true,
      offspringFromBull: {
        include: {
          weightHistories: { where: { recordType: 'PD' } },
        },
      },
      bullIatfRel: true,
      offspringFromBullIatf: {
        include: {
          weightHistories: { where: { recordType: 'PD' } },
        },
      },
      externalBull: true,
      externalBullIatfRel: true,
      father: true,
      offspringFromFather: {
        include: {
          weightHistories: { where: { recordType: 'PD' } },
        },
      },
      mother: true,
      offspringFromMother: {
        include: {
          weightHistories: { where: { recordType: 'PD' } },
        },
      },
      owner: true,
      weightHistories: {
        orderBy: {
          measuredAt: 'desc',
        },
      },
      calfLossHistories: {
        include: {
          fatherAnimal: true,
          externalBull: true,
        },
        orderBy: {
          lossDate: 'desc',
        },
      },
      dewormings: {
        orderBy: {
          date: 'desc',
        },
      },
      diseases: {
        orderBy: {
          date: 'desc',
        },
      },
      vaccines: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
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
