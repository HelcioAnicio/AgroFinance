import React from 'react';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
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

  // Nenhuma outra query aqui: a tela muda na hora ao clicar, e todos os
  // dados (animal completo, touros externos) são buscados no cliente em
  // paralelo — ver EditableAnimalDetails. Se o animal não existir/não for
  // desta fazenda, o fetch do cliente recebe 404 e redireciona.
  return <EditableAnimalDetails animalId={id} />;
};

export default DetailAnimalId;
