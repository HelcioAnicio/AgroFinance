import { cache } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchUsers, fetchAnimals } from '@/lib/fetchData';
import { Table } from '@/components/ui/table';

const getCachedSession = cache(() => getServerSession(authOptions));
const getCachedUsers = cache(fetchUsers);

export async function DashboardTableSection() {
  const [session, users] = await Promise.all([
    getCachedSession(),
    getCachedUsers(),
  ]);
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const animals = await fetchAnimals(userEmail?.id ?? undefined);

  return <Table animals={animals} users={users} />;
}
