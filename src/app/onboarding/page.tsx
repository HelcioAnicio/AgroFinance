'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const [inviteLink, setInviteLink] = useState('');

  const handleCreateFarm = async () => {
    // Lógica para criar uma nova fazenda
    // Esta funcionalidade pode ser implementada em uma rota de API
    // que cria a fazenda e a associação, e então redireciona
    // para o dashboard.
    toast.info('Funcionalidade de criar fazenda ainda não implementada.');
  };

  const handleJoinFarm = () => {
    if (inviteLink) {
      // Redireciona para o link de convite, que deve lidar com a associação
      router.push(inviteLink);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-[#f7f6f1] px-4 py-8">
      <section className="grid w-full max-w-lg gap-8 rounded-md bg-white p-10 text-center shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-[#202417]">
            Você ainda não está em uma fazenda
          </h1>
          <p className="mt-3 text-sm text-[#52534f]">
            Para continuar, crie uma nova fazenda ou insira um link de convite para se juntar a uma equipe existente.
          </p>
        </div>

        <div className="grid gap-4">
          <Button
            type="button"
            onClick={handleCreateFarm}
            className="w-full bg-[#49651f] text-white hover:bg-[#3f571b]"
          >
            Criar Minha Fazenda
          </Button>

          <div className="flex items-center gap-3">
            <hr className="flex-grow" />
            <span className="text-xs text-gray-400">OU</span>
            <hr className="flex-grow" />
          </div>

          <div className="grid gap-2 text-left">
            <label htmlFor="inviteLink" className="text-sm font-medium">
              Cole um link de convite
            </label>
            <div className="flex gap-2">
              <input
                id="inviteLink"
                type="text"
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                placeholder="https://app.example.com/register?invite=..."
                className="flex-grow rounded-md border bg-gray-50 px-3 py-2 text-sm outline-none"
              />
              <Button
                type="button"
                onClick={handleJoinFarm}
                disabled={!inviteLink}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:bg-transparent"
        >
          Sair e fazer login com outra conta
        </Button>
      </section>
    </main>
  );
}
