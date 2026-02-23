import { Suspense } from 'react';
import { MenuNavegation } from '@/components/ui/menu';
import { DashboardHeaderSkeleton } from './_components/dashboardHeaderSkeleton';
import { DashboardHeaderSection } from './_components/dashboardHeaderSection';
import { DashboardTableWithData } from './_components/dashboardTableWithData';

const Dashboard = () => {
  return (
    <div className="h-full overflow-hidden text-xs">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeaderSection />
      </Suspense>

      <DashboardTableWithData />

      <MenuNavegation />
    </div>
  );
};

export default Dashboard;
