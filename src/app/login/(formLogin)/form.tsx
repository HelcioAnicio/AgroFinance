'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoApple } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { Loading } from '@/components/ui/loading';

interface LoginUser {
  email: string;
  password: string;
}

interface FormLoginProps {
  fetchedUsers: User[];
}

export const FormLogin: React.FC<FormLoginProps> = ({ fetchedUsers }) => {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState({ email: false, password: false });
  const [screenLoading, setScreenLoading] = useState(false);
  const [statusPassword, setStatusPassword] = useState(false);
  const [dataLoginUser, setDataLoginUser] = useState<LoginUser>(
    {} as LoginUser
  );

  const userEmail = React.useMemo(
    () => fetchedUsers.find((user) => user.email === dataLoginUser.email),
    [fetchedUsers, dataLoginUser.email]
  );

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataLoginUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginCredentials = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      email: dataLoginUser.email,
      password: dataLoginUser.password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.error && userEmail?.email !== dataLoginUser.email) {
      setError({ email: true, password: true });
      toast.error('E-mail ou senha invalidos.');
      return;
    }

    if (result?.error) {
      setError({ email: false, password: true });
      toast.error('Senha invalida.');
      return;
    }

    toast.success('Sucesso no login, aguarde o carregamento...');
    setScreenLoading(true);
    router.replace('/dashboard');
  };

  useEffect(() => {
    if (error.email || error.password) {
      setTimeout(() => setError({ email: false, password: false }), 5000);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'authenticated') router.replace('/dashboard');
  }, [status, router]);

  return (
    <>
      {screenLoading && <Loading />}
      {status === 'unauthenticated' && (
        <main className="grid min-h-screen w-full place-items-center bg-[#f7f6f1] px-4 py-8">
          <section className="grid w-full max-w-6xl overflow-hidden rounded-md bg-white shadow-2xl md:grid-cols-[1.05fr_1fr]">
            <aside className="relative hidden min-h-[640px] overflow-hidden bg-[#415d1d] md:block">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,214,129,0.52),rgba(55,81,23,0.88)),url('/logo.png')] bg-[length:cover,360px] bg-center bg-no-repeat opacity-95" />
              <div className="relative flex h-full flex-col justify-between p-10 text-white">
                <strong className="text-lg">AgroFinance</strong>
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold">
                    O futuro da gestao rural e digital.
                  </h1>
                  <p className="mt-5 text-base font-medium">
                    Acesse sua plataforma AgroFinance e acompanhe o crescimento
                    do seu patrimonio com precisao.
                  </p>
                </div>
              </div>
            </aside>

            <section className="flex min-h-[640px] flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
              <div className="mb-10">
                <p className="mb-10 text-lg font-bold text-[#49651f] md:hidden">
                  AgroFinance
                </p>
                <h2 className="text-3xl font-bold">Bem-vindo de volta</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Insira suas credenciais para acessar sua conta.
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleLoginCredentials}>
                <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5b614c]">
                  E-mail corporativo
                  <span className="relative">
                    <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#8a8f80]" />
                    <input
                      className={`h-12 w-full rounded-md border bg-[#fbfaf8] px-10 text-sm font-normal tracking-normal outline-none ${
                        error.email ? 'border-destructive' : 'border-[#cfcbbc]'
                      }`}
                      type="email"
                      name="email"
                      placeholder="nome@fazenda.com.br"
                      value={dataLoginUser.email ?? ''}
                      required
                      onChange={handleInputValues}
                    />
                  </span>
                </label>

                <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5b614c]">
                  Senha
                  <span className="relative">
                    <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#8a8f80]" />
                    <input
                      className={`h-12 w-full rounded-md border bg-[#fbfaf8] px-10 text-sm font-normal tracking-normal outline-none ${
                        error.password
                          ? 'border-destructive'
                          : 'border-[#cfcbbc]'
                      }`}
                      type={statusPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="********"
                      required
                      value={dataLoginUser.password ?? ''}
                      onChange={handleInputValues}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-[#6a705e]"
                      onClick={() => setStatusPassword((value) => !value)}
                    >
                      {statusPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </span>
                </label>

                <Button className="h-12 bg-[#49651f] font-bold hover:bg-[#3d541b]">
                  Entrar na Plataforma
                </Button>
              </form>

              <div className="my-8 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8a8f80]">
                <span className="h-px flex-1 bg-[#e7e2d7]" />
                ou continue com
                <span className="h-px flex-1 bg-[#e7e2d7]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border bg-[#f5f3ef] text-sm font-semibold"
                  onClick={() => signIn('google')}
                >
                  <FcGoogle className="text-xl" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border bg-[#f5f3ef] text-sm font-semibold"
                >
                  <IoLogoApple className="text-xl" />
                  Apple ID
                </button>
              </div>

              <p className="mt-9 text-center text-sm">
                Nao possui uma conta?{' '}
                <Link href="/register" className="font-bold text-[#49651f]">
                  Criar conta agora
                </Link>
              </p>
            </section>
          </section>
        </main>
      )}
    </>
  );
};
