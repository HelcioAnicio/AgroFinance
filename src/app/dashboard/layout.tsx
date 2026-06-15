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
      {/* Fixed full-width header (z-30) — spans edge to edge */}
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />
      </Suspense>

      {/* Desktop sidebar — fixed, starts below the header (top-14) */}
      <AppSidebar />

      {/* Main content — offset top by header height, offset left by sidebar on desktop */}
      <div className="pt-14 lg:pl-56">
        <main className="w-full pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MenuNavegation />
    </div>
  );
}
