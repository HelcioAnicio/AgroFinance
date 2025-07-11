'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoApple } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
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
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [screenLoading, setScreenLoading] = useState(false);
  const [statusPassword, setStatusPassword] = useState(false);
  const [dataLoginUser, setDataLoginUser] = useState<LoginUser>(
    {} as LoginUser
  );

  const userEmail = React.useMemo(() => {
    return fetchedUsers.find((user) => user.email === dataLoginUser.email);
  }, [fetchedUsers, dataLoginUser.email]);

  // console.log(userEmail);

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

  const executeTimeout = (time: number) => {
    return setTimeout(() => {
      setScreenLoading(!screenLoading);
    }, time);
  };

  const handleLoginCredentials = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      email: dataLoginUser.email,
      password: dataLoginUser.password,
      redirect: false,
    });

    if (result?.error && userEmail?.email !== dataLoginUser.email) {
      setError({ email: true, password: true });
      toast.error('E-mail ou senha inválidos.');
      return;
    } else if (result?.error && userEmail?.email === dataLoginUser.email) {
      setError({ ...error, password: true });
      toast.error('Senha é inválida.');
      return;
    } else {
      toast.success('Sucesso no login, aguarde o carregamento...');
      executeTimeout(1);
      executeTimeout(7000);
      return;
    }
  };

  useEffect(() => {
    if (error.email || error.password) {
      setTimeout(() => {
        setError({ email: false, password: false });
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'authenticated') {
      setTimeout(() => {
        router.replace('/dashboard');
      }, 5000);
    }
  }, [status, router]);

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <>
      {screenLoading && <Loading />}
      {status === 'unauthenticated' && (
        <>
          <header className="flex flex-col items-center justify-center py-5">
            <figure className="flex flex-col items-center">
              <Image
                src="/logo.png"
                alt="Logo - Imagem de um touro e uma ovelha"
                width={200}
                height={200}
                className="size-40 xl:size-56"
              />

              <figcaption>Seu agronegócio descomplicado</figcaption>
            </figure>
          </header>

          <main className="h-max w-full rounded-t-3xl bg-secondary px-2 pb-12 sm:rounded-3xl">
            <section>
              <form
                className="mx-auto flex max-w-64 flex-col items-center gap-4 py-5"
                action=""
                onSubmit={handleLoginCredentials}
              >
                <div className="relative w-4/5 max-w-72">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                    <MdOutlineMail
                      className={`${error.email === true && 'text-destructive'}`}
                    />
                  </span>
                  <input
                    className={`w-full rounded-sm ${error.email === false && 'border-none outline-none'} px-3 py-2 pl-8 ${error.email === true && 'border border-destructive'}`}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={dataLoginUser.email}
                    required
                    onChange={handleInputValues}
                  />
                </div>
                <div className="w-4/5 max-w-72">
                  <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                      <IoLockClosedOutline
                        className={`${error.password === true && 'text-destructive'}`}
                      />
                    </span>
                    <input
                      className={`w-full rounded-sm ${error.password === false && 'border-none outline-none'} px-3 py-2 pl-8 ${error.password === true && 'border border-destructive'}`}
                      type={statusPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Senha"
                      required
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
                  {/* <p className="mt-4 text-xs text-primary-foreground underline">
                    Esqueci minha senha
                  </p> */}
                </div>
                <Button
                  className="bg-foreground text-lg hover:bg-foreground/80"
                  type="submit"
                  size={'lg'}
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
                  <FcGoogle className="text-3xl text-background drop-shadow-lg" />
                </button>
                <button type="button" onClick={handleLoginClick}>
                  <IoLogoApple className="text-3xl text-background drop-shadow-lg" />
                </button>
                <button type="button" onClick={handleLoginClick}>
                  <FaFacebook className="text-3xl text-[#1777F6] drop-shadow-lg" />
                </button>
              </div>
              <p>
                Ainda não tem conta?{' '}
                <Link
                  href="/register"
                  className="relative inline-block font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:hover:scale-x-100"
                >
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
