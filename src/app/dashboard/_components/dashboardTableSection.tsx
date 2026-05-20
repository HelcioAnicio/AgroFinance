import { cache } from 'react';
import { fetchUsers, fetchAnimals, fetchExternalBulls } from '@/lib/fetchData';
import { Table } from '@/components/ui/table';
import { requireFarmContext } from '@/lib/tenant';

const getCachedUsers = cache(fetchUsers);

export async function DashboardTableSection() {
  const [{ context }, users] = await Promise.all([
    requireFarmContext('view_animals'),
    getCachedUsers(),
  ]);

  const animals = await fetchAnimals(context?.user.id, context?.farm.id);
  const externalBulls = await fetchExternalBulls(
    context?.user.id,
    context?.farm.id
  );

  return (
    <Table animals={animals} users={users} externalBulls={externalBulls} />
  );
}
