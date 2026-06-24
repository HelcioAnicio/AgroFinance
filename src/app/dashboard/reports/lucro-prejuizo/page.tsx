import { redirect } from 'next/navigation';
import { requireFarmContext } from '@/lib/tenant';
import { LucroPrejuizoReport } from './_components/LucroPrejuizoReport';

export default async function Page() {
  const { context, status } = await requireFarmContext('view_finance');

  if (!context) {
    if (status === 403) redirect('/dashboard');
    redirect('/');
  }

  return <LucroPrejuizoReport />;
}
