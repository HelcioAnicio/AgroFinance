'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function NoFarmContext() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.push('/');
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-[#f7f6f1] px-4 py-8">
      <section className="grid w-full max-w-3xl gap-6 rounded-md bg-white p-10 text-center shadow-2xl">
        <div>
          <h1 className="text-3xl font-bold text-[#202417]">
            Problema de acesso
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#52534f]">
            Sua sessão está ativa, mas não foi possível carregar os dados da
            fazenda. Por favor, faça logout e tente entrar novamente.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleSignOut}
          className="mx-auto bg-[#49651f] text-white hover:bg-[#3f571b]"
        >
          Sair e tentar novamente
        </Button>
      </section>
    </main>
  );
}
