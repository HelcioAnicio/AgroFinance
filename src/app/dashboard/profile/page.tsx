import { Header } from '@/components/ui/header';
import { authOptions } from '@/lib/auth';
import { fetchNotifications } from '@/lib/fetchData';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EditableUserProfile from './_components/editableUserProfile';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;
  if (!email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, cnpj: true, image: true },
  });

  if (!user) redirect('/login');

  const notifications = await fetchNotifications(user.id);

  return (
    <>
      <Header notifications={notifications} />
      <EditableUserProfile user={user} />
    </>
  );
};

export default ProfilePage;
