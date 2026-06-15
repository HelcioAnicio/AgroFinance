import { MenuNavegation } from '@/components/ui/menu';
import { AppSidebar } from '@/components/ui/app-sidebar';
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
    redirect('/billing');
  }

  if (!canFarmAccessDashboard(context.farm)) {
    redirect('/billing');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar — fixed left, hidden on mobile */}
      <AppSidebar />

      {/* Main area shifted right of sidebar on desktop */}
      <div className="flex min-h-screen flex-col lg:pl-56">
        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeaderSection />
        </Suspense>

        {/* pb-24 on mobile leaves room for the bottom nav */}
        <main className="flex-1 pb-24 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      <MenuNavegation />
    </div>
  );
}
