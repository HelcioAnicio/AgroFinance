import { fetchUsers } from '@/lib/fetchData';
import { FormLogin } from './(formLogin)/form';

const LoginPage = async () => {
  const fetchedUsers = await fetchUsers();

  return (
    <div className="m-auto flex h-dvh w-full max-w-2xl flex-col items-center justify-evenly">
      <FormLogin fetchedUsers={fetchedUsers} />
    </div>
  );
};

export default LoginPage;
