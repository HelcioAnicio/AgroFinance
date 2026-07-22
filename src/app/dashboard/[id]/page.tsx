import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import { fetchExternalBulls, fetchVaccines } from '@/lib/fetchData';
import { requireFarmContext } from '@/lib/tenant';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const DetailAnimalId = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const { context } = await requireFarmContext('view_animals');
  if (!context) redirect('/login');

  // Só confirma que o animal existe (query leve, sem relações) — os dados
  // completos (mãe, pai, histórico, filhos...) são buscados no cliente em
  // paralelo com a navegação, pra tela mudar instantaneamente ao clicar em
  // vez de esperar essa consulta pesada terminar no servidor.
  const [exists, externalBulls, vaccines] = await Promise.all([
    prisma.animal.findFirst({
      where: { id, farmId: context.farm.id },
      select: { id: true },
    }),
    fetchExternalBulls(undefined, context.farm.id),
    fetchVaccines(id, context.farm.id),
  ]);

  if (!exists) redirect('/dashboard');

  return (
    <EditableAnimalDetails
      animalId={id}
      vaccines={vaccines}
      externalBulls={externalBulls}
    />
  );
};

export default DetailAnimalId;
