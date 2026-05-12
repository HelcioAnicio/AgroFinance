import { fetchUsers } from '@/lib/fetchData';
import { FormLogin } from './(formLogin)/form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  const fetchedUsers = await fetchUsers();

  return (
    <div className="min-h-screen w-full">
      <FormLogin fetchedUsers={fetchedUsers} />
    </div>
  );
};

export default LoginPage;
