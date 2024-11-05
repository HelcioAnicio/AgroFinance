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
  ownerId: string;
}

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

export const fetchAnimals = async (): Promise<Animal[]> => {
  const animals = await prisma.animal.findMany();
  return animals;
};

export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

const Dashboard = async () => {
  const animals = await fetchAnimals();
  const users = await fetchUsers();
  console.log("Lista de Animais:", animals);
  animals.forEach((animal) => {
    console.log(`Animal ID: ${animal.id}, Owner ID: ${animal.ownerId}`);
  });

  return (
    <div className="h-full overflow-hidden text-xs">
      <Header animals={animals} users={users} />
      <Table animals={animals} />
      <MenuNavegation />
    </div>
  );
};

export default Dashboard;
