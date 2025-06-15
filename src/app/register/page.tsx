'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
  return (
    <div className="flex h-dvh min-h-max flex-col items-center justify-center gap-10">
      <div>
        <Image
          src="/logo.png"
          alt="Logo - Um boi e uma ovelha dentro de um círculo"
          className="m-auto size-40"
          width={300}
          height={300}
        />
      </div>
      <section className="min-h-3/4 flex max-h-max w-full max-w-2xl flex-col items-center justify-between gap-10 rounded-t-3xl bg-secondary px-2 py-6 sm:rounded-3xl">
        <h1 className="text-3xl">Crie sua conta</h1>
        <form
          action=""
          className="flex w-full flex-col items-center justify-between gap-7"
        >
          <input
            className="w-4/5 max-w-sm rounded-lg px-3 py-2 pl-8"
            type="text"
            placeholder="Nome"
          />
          <input
            className="w-4/5 max-w-sm rounded-lg px-3 py-2 pl-8"
            type="email"
            placeholder="E-mail"
          />
          <input
            className="w-4/5 max-w-sm rounded-lg px-3 py-2 pl-8"
            type="text"
            name=""
            id=""
            placeholder="CNPJ/CPF"
          />
          <input
            className="w-4/5 max-w-sm rounded-lg px-3 py-2 pl-8"
            type="password"
            name=""
            id=""
            placeholder="Crie sua senha"
          />
          <input
            className="w-4/5 max-w-sm rounded-lg px-3 py-2 pl-8"
            type="password"
            name=""
            id=""
            placeholder="Digite sua senha novamente"
          />

          <button
            type="button"
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
