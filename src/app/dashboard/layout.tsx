import { MenuNavegation } from '@/components/ui/menu';
import { Suspense } from 'react';
import { DashboardHeaderSkeleton } from './_components/dashboardHeaderSkeleton';
import { DashboardHeaderSection } from './_components/dashboardHeaderSection';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
