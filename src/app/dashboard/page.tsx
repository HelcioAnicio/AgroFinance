import { Header } from "@/components/ui/header";
import { MenuNavegation } from "@/components/ui/menu";
import { Table } from "@/components/ui/table";
import { fetchAnimals, fetchUsers } from "@/lib/fetchData";

const Dashboard = async () => {
  const animals = await fetchAnimals();
  const users = await fetchUsers();

  return (
    <div className="h-full overflow-hidden text-xs">
      <Header animals={animals} users={users} />
      <Table animals={animals} users={users} />
      <MenuNavegation />
    </div>
  );
};

export default Dashboard;
