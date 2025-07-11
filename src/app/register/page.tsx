'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineMail } from 'react-icons/md';
import { FaRegBuilding } from 'react-icons/fa';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DataUserState {
  name: string;
  email: string;
  cnpj: string;
  password: string;
  secondPassword?: string;
}

const Register = () => {
  const router = useRouter();
  const [inputsError, setInputsError] = useState({
    name: false,
    email: false,
    cnpj: false,
    password: false,
    secondPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [userRegister, setUserRegister] = useState({} as DataUserState);

  const togglePasswordVisibility = (input: string) => {
    if (input === 'password') {
      setShowPassword(!showPassword);
      return;
    } else {
      setConfirmPassword(!confirmPassword);
      return;
    }
  };

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendFormRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = [
      'name',
      'email',
      'cnpj',
      'password',
      'secondPassword',
    ] as const;

    const resetErrors = requiredFields.reduce(
      (acc, field) => {
        acc[field] = false;
        return acc;
      },
      {} as Record<(typeof requiredFields)[number], boolean>
    );

    const newErrors = requiredFields.reduce(
      (acc, field) => {
        const value = userRegister[field]?.toString().trim();
        acc[field] = !value;
        return acc;
      },
      {} as Record<(typeof requiredFields)[number], boolean>
    );

    const hasAnyError = Object.values(newErrors).some((value) => value);
    console.log('hasAnyError: ', hasAnyError);
    setInputsError(newErrors);

    if (hasAnyError) {
      setTimeout(() => {
        setInputsError(resetErrors);
      }, 5000);
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (userRegister.password !== userRegister.secondPassword) {
      setInputsError({
        name: false,
        email: false,
        cnpj: false,
        password: true,
        secondPassword: true,
      });
      toast.error('A senha está diferente, favor verificar');
      setTimeout(() => {
        setInputsError(resetErrors);
      }, 5000);
      return;
    }

    const updateUser = {
      ...userRegister,
      id: uuidv4(),
      updatedAt: new Date(),
    };

    delete updateUser.secondPassword;

    try {
      await axios.post(
        '/api/registerUser',
        { userRegister: updateUser },
        {
          headers: {
            'Content-Type': 'aplication/json',
          },
        }
      );
      setUserRegister({} as DataUserState);
      toast.success('Registrado com sucesso, redirecionando...');
      router.replace('/login');
    } catch {
      toast.error('Erro, verifique os dados preenchidos e tente novamente.');
    }
  };

  return (
    <div className="flex h-dvh min-h-max flex-col items-center justify-start gap-5">
      <figure>
        <Image
          src="/logo.png"
          alt="Logo - Um boi e uma ovelha dentro de um círculo"
          className="m-auto size-40"
          width={300}
          height={300}
        />
        <figcaption className="-mt-4">Seu agronegocio descomplicado</figcaption>
      </figure>
      <section className="min-h-3/4 flex max-h-max w-full max-w-2xl flex-col items-center justify-center gap-5 rounded-t-3xl bg-secondary px-2 py-6 sm:rounded-3xl">
        {/* <h1 className="text-2xl font-bold text-background">Crie sua conta</h1> */}
        <form
          action=""
          className="flex w-full flex-col items-center justify-between gap-4"
        >
          <div className="relative w-4/5 max-w-72">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <CgProfile
                className={`${inputsError.name === true && 'text-destructive'}`}
              />
            </span>
            <input
              className={`w-full rounded-sm ${inputsError.name ? 'border border-destructive' : 'border-none outline-none'} px-3 py-2 pl-8`}
              type="text"
              name="name"
              placeholder="Nome"
              required
              value={userRegister.name}
              onChange={handleInputValues}
            />
          </div>
          <div className="relative w-4/5 max-w-72">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <MdOutlineMail
                className={`${inputsError.email === true && 'text-destructive'}`}
              />
            </span>
            <input
              className={`w-full rounded-sm ${inputsError.email ? 'border border-destructive' : 'border-none outline-none'} px-3 py-2 pl-8`}
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={userRegister.email}
              onChange={handleInputValues}
            />
          </div>
          <div className="relative w-4/5 max-w-72">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <FaRegBuilding
                className={`${inputsError.cnpj === true && 'text-destructive'}`}
              />
            </span>
            <input
              className={`w-full rounded-sm ${inputsError.cnpj ? 'border border-destructive' : 'border-none outline-none'} px-3 py-2 pl-8`}
              type="text"
              name="cnpj"
              placeholder="CNPJ/CPF"
              required
              value={userRegister.cnpj}
              onChange={handleInputValues}
            />
          </div>
          <div className="relative w-4/5 max-w-72">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <IoLockClosedOutline
                className={`${inputsError.password === true && 'text-destructive'}`}
              />
            </span>
            <input
              className={`w-full rounded-sm ${inputsError.password ? 'border border-destructive' : 'border-none outline-none'} px-3 py-2 pl-8`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Crie sua senha"
              required
              value={userRegister.password}
              onChange={handleInputValues}
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
          <div className="relative w-4/5 max-w-72">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              <IoLockClosedOutline
                className={`${inputsError.password === true && 'text-destructive'}`}
              />
            </span>
            <input
              className={`w-full rounded-sm ${inputsError.secondPassword ? 'border border-destructive' : 'border-none outline-none'} px-3 py-2 pl-8`}
              type={confirmPassword ? 'text' : 'password'}
              name="secondPassword"
              placeholder="Digite sua senha novamente"
              required
              value={userRegister.secondPassword}
              onChange={handleInputValues}
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

          <Button
            type="submit"
            className="rounded-sm bg-foreground px-6 py-1 text-lg text-primary-foreground"
            onClick={sendFormRegister}
          >
            Cadastrar
          </Button>
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
              Fazer login
            </Link>
          </p>
        </article>
      </section>
    </div>
  );
};

export default Register;
