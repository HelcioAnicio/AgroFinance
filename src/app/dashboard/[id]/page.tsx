import React from 'react';
import { Header } from '@/components/ui/header';
import { prisma } from '@/lib/useDataBase';
import { Animal } from '@/types/animal';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import { fetchAnimals, fetchVaccines } from '@/lib/fetchData';
import { Vaccine } from '@/types/vaccine';

const DetailAnimalId = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const animals = await fetchAnimals();
  const animal = await prisma.animal.findUnique({
    where: { id },
    include: {
      bull: true,
      offspringFromBull: true,
      father: true,
      offspringFromFather: true,
      mother: true,
      offspringFromMother: true,
      owner: true,
    },
  });
  const vaccines = await fetchVaccines(animal?.id as string);
  const vaccine = vaccines;
  return (
    <>
      <Header />
      <EditableAnimalDetails
        animal={animal as Animal}
        animals={animals}
        vaccines={vaccines}
        vaccine={vaccine as unknown as Vaccine}
      />
    </>
  );
};
export default DetailAnimalId;
