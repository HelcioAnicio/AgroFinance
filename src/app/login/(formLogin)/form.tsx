'use client';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineMail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { User } from '@/types/user';

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

  const [statusPassword, setStatusPassword] = useState(false);
  const [dataLoginUser, setDataLoginUser] = useState<LoginUser>(
    {} as LoginUser
  );

  const userEmail = React.useMemo(() => {
    return fetchedUsers.find((user) => user.email === dataLoginUser.email);
  }, [fetchedUsers, dataLoginUser.email]);

  console.log(userEmail);
  const togglePasswordVisibility = () => {
    setStatusPassword(!statusPassword);
  };

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataLoginUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginCredentials = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = (await signIn('credentials', {
      // id: dataLoginUser.
      email: dataLoginUser.email,
      password: dataLoginUser.password,
      redirect: false,
    })) as { error?: string } | undefined;

    if (result?.error) {
      console.error('Login error:', result?.error);
      return;
    }

    console.log('deu certo!!', status);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <>
      {status === 'unauthenticated' && (
        <>
          <header className="flex items-center justify-center py-5">
            <figure className="flex flex-col items-center">
              <Image
                src="/logo.png"
                alt="Logo - Imagem de um touro e uma ovelha"
                width={200}
                height={200}
                className="size-40"
              />

              <figcaption>Seu agronegócio descomplicado</figcaption>
            </figure>
          </header>

          <main className="rounded-t-3xl bg-secondary px-2 py-6">
            <section>
              <form
                className="m-auto flex max-w-64 flex-col items-center gap-4 py-5"
                action=""
                onSubmit={handleLoginCredentials}
              >
                <div className="relative w-4/5 max-w-72">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                    <MdOutlineMail />
                  </span>
                  <input
                    className="w-full rounded-sm px-3 py-2 pl-8"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={dataLoginUser.email}
                    onChange={handleInputValues}
                  />
                </div>
                <div className="w-4/5 max-w-72">
                  <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                      <IoLockClosedOutline />
                    </span>
                    <input
                      className="w-full rounded-sm px-3 py-2 pl-8"
                      type={statusPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Crie sua senha"
                      value={dataLoginUser.password}
                      onChange={handleInputValues}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-400"
                    >
                      {' '}
                      {statusPassword ? (
                        <FaRegEyeSlash
                          onClick={() => togglePasswordVisibility()}
                        />
                      ) : (
                        <FaRegEye onClick={() => togglePasswordVisibility()} />
                      )}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-primary-foreground underline">
                    Esqueci minha senha
                  </p>
                </div>
                <Button
                  className="m-auto mt-5 w-40 bg-foreground text-lg"
                  type="submit"
                >
                  Entrar
                </Button>
              </form>
            </section>

            <div className="flex items-center gap-5 px-5">
              <hr className="flex-1 bg-black" />
              <span>ou</span>
              <hr className="flex-1 bg-black" />
            </div>

            <section className="flex flex-col items-center">
              <div className="flex justify-center gap-3 py-8">
                <button type="button" onClick={handleLoginClick}>
                  <FcGoogle className="text-3xl text-background" />
                </button>
              </div>
              <p>
                Ainda não tem conta?{' '}
                <Link href="/register" className="underline">
                  Cadastre-se
                </Link>
              </p>
            </section>
          </main>
        </>
      )}
    </>
  );
};
