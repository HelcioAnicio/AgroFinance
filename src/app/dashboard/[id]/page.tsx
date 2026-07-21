import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import {
  fetchAnimalById,
  fetchAnimals,
  fetchExternalBulls,
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

  const [animal, animals, externalBulls] = await Promise.all([
    fetchAnimalById(id, context.farm.id),
    fetchAnimals(undefined, context.farm.id),
    fetchExternalBulls(undefined, context.farm.id),
  ]);

  if (!animal) redirect('/dashboard');

  return (
    <EditableAnimalDetails
      animal={animal}
      animals={animals}
      externalBulls={externalBulls}
    />
  );
};

export default DetailAnimalId;
