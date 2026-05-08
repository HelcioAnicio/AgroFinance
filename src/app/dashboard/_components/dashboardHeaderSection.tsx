import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchNotifications, fetchUserByEmail } from '@/lib/fetchData';
import { Header } from '@/components/ui/header';

const getCachedSession = cache(() => getServerSession(authOptions));

export async function DashboardHeaderSection() {
  const session = await getCachedSession();
  const user = await fetchUserByEmail(session?.user?.email);
  const notifications = user?.id ? await fetchNotifications(user.id) : [];

  return <Header notifications={notifications} />;
}
