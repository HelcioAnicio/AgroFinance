import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { FinancialDashboard } from './_components/financial-dashboard';

export default async function FinancialPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    redirect('/');
  }

  return (
    <FinancialDashboard userId={user.id} userName={user.name ?? 'Produtor'} />
  );
}
