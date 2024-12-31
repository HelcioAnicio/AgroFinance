import { Header } from "@/components/ui/header";
import { prisma } from "@/lib/useDataBase";
import { Animal } from "@/types/animal";
import EditableAnimalDetails from "./(components)/editableAnimalDetails";
import { fetchAnimals } from '@/lib/fetchData';


const DetailAnimalId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const animals = await fetchAnimals();
  // const users = await fetchUsers();

  const id = (await params).id;
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

  return (
    <>
      <Header />
      <EditableAnimalDetails animal={animal as Animal} animals={animals} />
    </>
  );
};
export default DetailAnimalId;
