// import { Button } from '@/components/ui/button';

import { Header } from "@/components/ui/header";
import { MenuNavegation } from "@/components/ui/menu";
import { Table } from "@/components/ui/table";
import prisma from "@/lib/useDataBase";

interface Animal {
  id: string;
  manualId: number | null;
  gender: string | null;
  birthDate: Date | null;
  weight: number | null;
  breed: string | null;
  category: string | null;
  motherId: string | null;
  fatherId: string | null;
  reproductiveStatus: string | null;
  handlingType: string | null;
  bullId: string | null;
  protocol: string | null;
  andrological: string | null;
  fetalGender: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
}

const fetchAnimals = async (): Promise<Animal[]> => {
  const animals = await prisma.animal.findMany();

  return animals;
};

const Home = async () => {
  const animals = await fetchAnimals();

  return (
    <div className="h-full overflow-hidden text-xs">
      <Header animals={animals} />
      <Table animals={animals} />
      <MenuNavegation />
    </div>
  );
};

export default Home;
