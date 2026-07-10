import { MenuNavegation } from '@/components/ui/menu';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Suspense } from 'react';
import { DashboardHeaderSkeleton } from './_components/dashboardHeaderSkeleton';
import { DashboardHeaderSection } from './_components/dashboardHeaderSection';
import { SessionGuard } from './_components/sessionGuard';
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
      {/* Detecta evicção de sessão e faz sign-out automático */}
      <SessionGuard />

      {/* Fixed full-width header */}
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />
      </Suspense>

      {/* Content wrapper: centers on large screens, sidebar + main side by side */}
      <div className="mx-auto flex max-w-[1600px] pt-14">
        <AppSidebar />
        <main className="min-w-0 flex-1 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MenuNavegation />
    </div>
  );
}
