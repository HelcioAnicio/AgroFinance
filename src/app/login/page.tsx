import { fetchUsers } from '@/lib/fetchData';
import { FormLogin } from './(formLogin)/form';
import NoFarmContext from './noFarmContext';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getCurrentFarmContext } from '@/lib/tenant';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const context = await getCurrentFarmContext();

    if (context) {
      if (context.farm.subscriptionStatus !== 'ACTIVE') {
        redirect('/billing');
      }

      redirect('/dashboard');
    }

    return <NoFarmContext />;
  }

  const fetchedUsers = await fetchUsers();

  return (
    <div className="min-h-screen w-full">
      <FormLogin fetchedUsers={fetchedUsers} />
    </div>
  );
};

export default LoginPage;
