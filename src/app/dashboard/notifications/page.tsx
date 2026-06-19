import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { fetchNotifications, fetchUserByEmail } from '@/lib/fetchData';
import { NotificationsPageClient } from './_components/notificationsPageClient';

const getCachedSession = cache(() => getServerSession(authOptions));

export default async function NotificationsPage() {
  const session = await getCachedSession();
  if (!session?.user?.email) redirect('/');

  const user = await fetchUserByEmail(session.user.email);
  if (!user) redirect('/');

  const notifications = await fetchNotifications(user.id);

  return <NotificationsPageClient notifications={notifications} />;
}
