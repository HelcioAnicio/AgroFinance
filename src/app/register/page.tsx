'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineMail } from 'react-icons/md';
import { FaRegBuilding } from 'react-icons/fa';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);

  const togglePasswordVisibility = (input: string) => {
    if (input === 'password') {
      setShowPassword(!showPassword);
      return;
    } else if (input === 'passwordAgain') {
      setConfirmPassword(!confirmPassword);
      return;
    }
  };

  return (
    <div className="flex h-dvh min-h-max flex-col items-center justify-center gap-10 pb-10">
      <div>
        <Image
          src="/logo.png"
          alt="Logo - Um boi e uma ovelha dentro de um círculo"
          className="m-auto size-40"
          width={300}
          height={300}
        />
      </div>
      <section className="min-h-3/4 flex max-h-max w-full max-w-2xl flex-col items-center justify-center gap-10 rounded-3xl bg-secondary px-2 py-6">
        <h1 className="text-3xl font-bold text-background">Crie sua conta</h1>
        <form
          action=""
          className="flex w-full flex-col items-center justify-between gap-7"
        >
          <div className="relative w-4/5 max-w-sm">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <CgProfile className="text-foreground" />
            </span>
            <input
              className="w-full rounded-2xl px-3 py-2 pl-10"
              type="text"
              placeholder="Nome"
            />
          </div>
          <div className="relative w-4/5 max-w-sm">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <MdOutlineMail />
            </span>
            <input
              className="w-full rounded-2xl px-3 py-2 pl-10"
              type="email"
              placeholder="E-mail"
            />
          </div>
          <div className="relative w-4/5 max-w-sm">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <FaRegBuilding />
            </span>
            <input
              className="w-full rounded-2xl px-3 py-2 pl-10"
              type="text"
              placeholder="CNPJ/CPF"
            />
          </div>
          <div className="relative w-4/5 max-w-sm">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <IoLockClosedOutline />
            </span>
            <input
              className="w-full rounded-2xl px-3 py-2 pl-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie sua senha"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-400"
            >
              {showPassword ? (
                <FaRegEyeSlash
                  onClick={() => togglePasswordVisibility('password')}
                />
              ) : (
                <FaRegEye
                  onClick={() => togglePasswordVisibility('password')}
                />
              )}
            </button>
          </div>
          <div className="relative w-4/5 max-w-sm">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <IoLockClosedOutline />
            </span>
            <input
              className="w-full rounded-2xl px-3 py-2 pl-10"
              type={confirmPassword ? 'text' : 'password'}
              placeholder="Digite sua senha novamente"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-400"
            >
              {confirmPassword ? (
                <FaRegEyeSlash
                  onClick={() => togglePasswordVisibility('passwordAgain')}
                />
              ) : (
                <FaRegEye
                  onClick={() => togglePasswordVisibility('passwordAgain')}
                />
              )}{' '}
            </button>
          </div>

          <button
            type="submit"
            className="rounded-md bg-foreground px-6 py-1 text-lg text-popover"
          >
            Cadastrar
          </button>
        </form>

        <div className="flex w-full items-center gap-5 px-5">
          <hr className="flex-1 bg-black" />
          <span>ou</span>
          <hr className="flex-1 bg-black" />
        </div>

        <article className="flex flex-col items-center">
          <p>
            Já tem uma conta?{' '}
            <Link href="/login" className="font-bold underline">
              Fezer login
            </Link>
          </p>
        </article>
      </section>
    </div>
  );
};

export default Register;
