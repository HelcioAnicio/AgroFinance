import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import {
  fetchAnimals,
  // fetchAnimals,
  fetchExternalBulls,
  fetchVaccines,
} from '@/lib/fetchData';
import { Vaccine } from '@/types/vaccine';
import { requireFarmContext } from '@/lib/tenant';
import { redirect } from 'next/navigation';

// import { useAppGlobal } from '@/context/appContext';

const DetailAnimalId = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const { context } = await requireFarmContext('view_animals');
  if (!context) redirect('/login');

  const [animals, externalBulls] = await Promise.all([
    fetchAnimals(undefined, context.farm.id),
    fetchExternalBulls(undefined, context.farm.id),
  ]);

  const animal = animals.find((a) => a.id === id);
  if (!animal) redirect('/dashboard');

  const vaccines = await fetchVaccines(id);
  const vaccine = vaccines;

  return (
    <>
      <EditableAnimalDetails
        externalBulls={externalBulls}
        vaccines={vaccines}
        vaccine={vaccine as unknown as Vaccine}
      />
    </>
  );
};
export default DetailAnimalId;
