import { fetchUsers } from '@/lib/fetchData';
import { FormLogin } from './(formLogin)/form';

const LoginPage = async () => {
  const fetchedUsers = await fetchUsers();

  return (
    <div className="w-lwv">
      <FormLogin fetchedUsers={fetchedUsers} />
    </div>
  );
};

export default LoginPage;
