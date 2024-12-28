import { Header } from "@/components/ui/header";
import { prisma } from "@/lib/useDataBase";
import { Animal } from "@/types/animal";
import EditableAnimalDetails from "./(components)/editableAnimalDetails";
import { fetchData } from 'next-auth/client/_utils';
import { fetchAnimals } from '@/lib/fetchData';

interface AnimalDetailsProps {
  params: { id: string };
}

const DetailAnimalId = async ({ params }: AnimalDetailsProps) => {
  const animals = await fetchAnimals()
  const { id } = await params;
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
      dewormings: true,
      diseases: true,
      vaccines: true,
    },
  });

  return (
    <>
      <Header />
      <EditableAnimalDetails animal={animal as Animal} animals={animals} />
    </>
  );
};
export default DetailAnimalId;
