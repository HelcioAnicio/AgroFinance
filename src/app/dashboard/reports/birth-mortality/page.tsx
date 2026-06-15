import { redirect } from 'next/navigation';
import { requireFarmContext } from '@/lib/tenant';
import { BirthMortalityReport } from './_components/BirthMortalityReport';

export default async function BirthMortalityPage() {
  const { context, status } = await requireFarmContext('view_animals');

  if (!context) {
    if (status === 403) redirect('/dashboard');
    redirect('/');
  }

  return <BirthMortalityReport />;
}
