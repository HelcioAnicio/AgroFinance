import { MenuNavegation } from '@/components/ui/menu';
import { Suspense } from 'react';
import { DashboardHeaderSkeleton } from './_components/dashboardHeaderSkeleton';
import { DashboardHeaderSection } from './_components/dashboardHeaderSection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { canFarmAccessDashboard, getCurrentFarmContext } from '@/lib/tenant';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const context = await getCurrentFarmContext();
  if (!context) {
    redirect('/login');
  }

  if (!canFarmAccessDashboard(context.farm)) {
    redirect('/billing');
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />
      </Suspense>
      <main className="pb-20">{children}</main>
      <MenuNavegation />
    </div>
  );
}
