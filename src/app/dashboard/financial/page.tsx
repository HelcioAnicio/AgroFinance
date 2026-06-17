import { redirect } from 'next/navigation';
import { FinancialDashboard } from './_components/financial-dashboard';
import { requireFarmContext } from '@/lib/tenant';

export default async function FinancialPage() {
  const { context, status } = await requireFarmContext('view_animals');

  if (!context) {
    if (status === 403) redirect('/dashboard');
    redirect('/');
  }

  return (
    <FinancialDashboard
      userId={context.user.id}
      userName={context.user.name ?? 'Produtor'}
      role={context.role as string}
    />
  );
}
