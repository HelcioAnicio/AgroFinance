'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FaRegBuilding, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineMail } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';

interface DataUserState {
  name: string;
  farmName: string;
  email: string;
  cnpj: string;
  password: string;
  secondPassword: string;
}

const emptyForm: DataUserState = {
  name: '',
  farmName: '',
  email: '',
  cnpj: '',
  password: '',
  secondPassword: '',
};

const Register = () => {
  const router = useRouter();
  const [inviteToken, setInviteToken] = useState('');
  const [inputsError, setInputsError] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [userRegister, setUserRegister] = useState<DataUserState>(emptyForm);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInviteToken(params.get('invite') ?? '');
  }, []);

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserRegister((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendFormRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = inviteToken
      ? ['name', 'email', 'cnpj', 'password', 'secondPassword']
      : ['name', 'farmName', 'email', 'cnpj', 'password', 'secondPassword'];
    const newErrors = requiredFields.reduce<Record<string, boolean>>(
      (acc, field) => {
        acc[field] = !userRegister[field as keyof DataUserState]?.trim();
        return acc;
      },
      {}
    );

    if (Object.values(newErrors).some(Boolean)) {
      setInputsError(newErrors);
      toast.error('Por favor, preencha todos os campos obrigatorios');
      return;
    }

    if (userRegister.password !== userRegister.secondPassword) {
      setInputsError({ password: true, secondPassword: true });
      toast.error('As senhas estao diferentes.');
      return;
    }

    try {
      const { secondPassword: _secondPassword, ...payload } = userRegister;
      void _secondPassword;

      await axios.post(
        '/api/registerUser',
        { userRegister: { ...payload, inviteToken } },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setUserRegister(emptyForm);
      toast.success('Registrado com sucesso, redirecionando...');
      router.replace('/login');
    } catch (error) {
      console.error(error);
      toast.error('Erro, verifique os dados preenchidos e tente novamente.');
    }
  };

  const inputClass = (field: string) =>
    `h-12 w-full rounded-md border bg-[#f5f3ef] px-10 text-sm outline-none ${
      inputsError[field] ? 'border-destructive' : 'border-transparent'
    }`;

  return (
    <main className="grid min-h-screen bg-[#f7f6f1] md:grid-cols-[1.15fr_0.85fr]">
      <section className="relative hidden overflow-hidden bg-[#49651f] md:block">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(49,71,20,0.88),rgba(90,111,39,0.42)),url('/logo.png')] bg-[length:cover,420px] bg-center bg-no-repeat" />
        <div className="relative flex h-full flex-col justify-center gap-8 p-14 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.22em]">
            AgroFinance Intelligence
          </p>
          <h1 className="max-w-xl text-6xl font-bold leading-tight">
            O futuro da sua gestao comeca aqui.
          </h1>
          <p className="max-w-lg text-lg">
            Junte-se a elite do agronegocio e transforme dados em rentabilidade
            com a precisao que sua terra merece.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <form
          className="flex w-full max-w-md flex-col gap-5"
          onSubmit={sendFormRegister}
        >
          <div className="mb-4">
            <p className="mb-8 text-xl font-bold text-[#49651f]">
              AgroFinance
            </p>
            <h2 className="text-3xl font-bold">Crie sua conta</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece sua jornada de gestao de precisao hoje mesmo.
            </p>
          </div>

          <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
            Nome completo
            <CgProfile className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
            <input
              className={inputClass('name')}
              name="name"
              placeholder="Ex: Joao da Silva"
              value={userRegister.name}
              onChange={handleInputValues}
            />
          </label>

          {!inviteToken && (
            <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
              Nome da fazenda
              <FaRegBuilding className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
              <input
                className={inputClass('farmName')}
                name="farmName"
                placeholder="Ex: Fazenda Santa Fe"
                value={userRegister.farmName}
                onChange={handleInputValues}
              />
            </label>
          )}

          <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
            E-mail corporativo
            <MdOutlineMail className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
            <input
              className={inputClass('email')}
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={userRegister.email}
              onChange={handleInputValues}
            />
          </label>

          <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
            CNPJ/CPF
            <FaRegBuilding className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
            <input
              className={inputClass('cnpj')}
              name="cnpj"
              placeholder="Documento da conta"
              value={userRegister.cnpj}
              onChange={handleInputValues}
            />
          </label>

          <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
            Senha
            <IoLockClosedOutline className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
            <input
              className={inputClass('password')}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="********"
              value={userRegister.password}
              onChange={handleInputValues}
            />
            <button
              type="button"
              className="absolute right-3 top-[2.35rem] text-lg text-[#6a705e]"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>

          <label className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#6b705f]">
            Confirmar senha
            <IoLockClosedOutline className="absolute left-3 top-[2.45rem] text-lg text-[#8a8f80]" />
            <input
              className={inputClass('secondPassword')}
              type={confirmPassword ? 'text' : 'password'}
              name="secondPassword"
              placeholder="********"
              value={userRegister.secondPassword}
              onChange={handleInputValues}
            />
            <button
              type="button"
              className="absolute right-3 top-[2.35rem] text-lg text-[#6a705e]"
              onClick={() => setConfirmPassword((value) => !value)}
            >
              {confirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </label>

          <Button className="mt-2 h-12 bg-[#49651f] font-bold hover:bg-[#3d541b]">
            Criar Minha Conta
          </Button>

          <p className="pt-4 text-center text-sm">
            Ja possui uma conta?{' '}
            <Link href="/login" className="font-bold text-[#49651f]">
              Fazer Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
