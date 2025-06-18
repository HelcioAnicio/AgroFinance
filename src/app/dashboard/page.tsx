import { Header } from '@/components/ui/header';
import { MenuNavegation } from '@/components/ui/menu';
import { Table } from '@/components/ui/table';
import { fetchAnimals, fetchUsers } from '@/lib/fetchData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const users = await fetchUsers();
  const userEmail = users.find((user) => user.email === session?.user?.email);

  const animals = await fetchAnimals(userEmail?.id ?? undefined);

  return (
    <div className="h-full overflow-hidden text-xs">
      <Header />
      <Table animals={animals} users={users} />
      <MenuNavegation />
    </div>
  );
};

export default Dashboard;
