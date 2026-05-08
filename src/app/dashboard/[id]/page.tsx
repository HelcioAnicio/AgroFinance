import React from 'react';
import { prisma } from '@/lib/prisma';
import { Animal } from '@/types/animal';
import EditableAnimalDetails from './(components)/editableAnimalDetails';
import {
  fetchAnimals,
  fetchExternalBulls,
  fetchUsers,
  fetchVaccines,
} from '@/lib/fetchData';
import { Vaccine } from '@/types/vaccine';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const DetailAnimalId = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const users = await fetchUsers();
  const session = await getServerSession(authOptions);
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const animals = await fetchAnimals(userEmail?.id ?? undefined);
  const externalBulls = await fetchExternalBulls(userEmail?.id ?? undefined);
  const animal = await prisma.animal.findUnique({
    where: { id },
    include: {
      bull: true,
      offspringFromBull: true,
      bullIatfRel: true,
      offspringFromBullIatf: true,
      externalBull: true,
      externalBullIatfRel: true,
      father: true,
      offspringFromFather: true,
      mother: true,
      offspringFromMother: true,
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
  const vaccines = await fetchVaccines(animal?.id as string);
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
