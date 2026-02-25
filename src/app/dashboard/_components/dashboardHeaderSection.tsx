import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers, fetchNotifications } from '@/lib/fetchData';
import { Header } from '@/components/ui/header';

const getCachedSession = cache(() => getServerSession(authOptions));
const getCachedUsers = cache(fetchUsers);

export async function DashboardHeaderSection() {
  const [session, users] = await Promise.all([
    getCachedSession(),
    getCachedUsers(),
  ]);
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const notifications = await fetchNotifications(userEmail?.id ?? '');

  return <Header notifications={notifications} />;
}
