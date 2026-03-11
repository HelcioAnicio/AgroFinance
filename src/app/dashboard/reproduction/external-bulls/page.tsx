import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchNotifications, fetchUsers } from '@/lib/fetchData';
import { Header } from '@/components/ui/header';
import { MenuNavegation } from '@/components/ui/menu';
import { ExternalBullsTable } from './_components/externalBullsTable';

const ExternalBullsPage = async () => {
  const session = await getServerSession(authOptions);
  const users = await fetchUsers();
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const notifications = await fetchNotifications(userEmail?.id ?? '');

  return (
    <div className="h-full text-xs">
      <Header notifications={notifications} />
      <ExternalBullsTable />
      <MenuNavegation />
    </div>
  );
};

export default ExternalBullsPage;
