import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EditableUserProfile from './_components/editableUserProfile';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;
  if (!email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      cnpj: true,
      image: true,
      farmMemberships: {
        orderBy: { createdAt: 'asc' },
        select: {
          role: true,
          farm: { select: { id: true, name: true, trialEndsAt: true } },
        },
      },
    },
  });

  if (!user) redirect('/login');

  return <EditableUserProfile user={user} />;
};

export default ProfilePage;
