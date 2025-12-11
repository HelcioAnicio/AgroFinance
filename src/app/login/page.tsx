import { fetchUsers } from '@/lib/fetchData';
import { FormLogin } from './(formLogin)/form';

const LoginPage = async () => {
  const fetchedUsers = await fetchUsers();

  return (
    <div className="m-auto flex h-screen w-full max-w-2xl flex-col items-center justify-between md:justify-evenly md:pb-5">
      <FormLogin fetchedUsers={fetchedUsers} />
    </div>
  );
};

export default LoginPage;
