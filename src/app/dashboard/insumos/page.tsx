import { redirect } from 'next/navigation';
import { requireFarmContext } from '@/lib/tenant';
import { InsumosPage } from './_components/InsumosPage';

export default async function Page() {
  const { context, status } = await requireFarmContext('view_animals');

  if (!context) {
    if (status === 403) redirect('/dashboard');
    redirect('/');
  }

  return <InsumosPage role={context.role as string} />;
}
