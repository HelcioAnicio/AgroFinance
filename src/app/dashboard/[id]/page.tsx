import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import {
  fetchAnimalById,
  fetchExternalBulls,
  fetchVaccines,
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

  const [animal, externalBulls, vaccines] = await Promise.all([
    fetchAnimalById(id, context.farm.id),
    fetchExternalBulls(undefined, context.farm.id),
    fetchVaccines(id, context.farm.id),
  ]);

  if (!animal) redirect('/dashboard');

  return <EditableAnimalDetails vaccines={vaccines} externalBulls={externalBulls} />;
};

export default DetailAnimalId;
