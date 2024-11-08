import { Header } from "@/components/ui/header";
import { MenuNavegation } from "@/components/ui/menu";
import { Table } from "@/components/ui/table";
import prisma from "@/lib/useDataBase";
import { Animal } from "@/types/animal";
import { User } from "@/types/user";

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

  return (
    <div className="h-full overflow-hidden text-xs">
      <Header animals={animals} users={users} />
      <Table animals={animals} />
      <MenuNavegation />
    </div>
  );
};

export default Dashboard;
