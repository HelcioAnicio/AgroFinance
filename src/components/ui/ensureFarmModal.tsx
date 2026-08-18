'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Building2, Link2, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function extractInviteToken(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  try {
    const url = new URL(trimmed);
    return url.searchParams.get('invite') ?? url.searchParams.get('token') ?? '';
  } catch {
    // Não é uma URL — assume que o usuário colou o token puro
    return trimmed;
  }
}

export default function EnsureFarmModal({
  userName,
  initialCnpj,
  mode = 'blocking',
}: {
  userName: string;
  initialCnpj?: string | null;
  mode?: 'blocking' | 'closable';
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<'create' | 'join'>('create');

  const [farmName, setFarmName] = useState(
    userName ? `${userName} Fazenda` : 'Minha Fazenda'
  );
  const [cnpj, setCnpj] = useState(initialCnpj ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const [inviteInput, setInviteInput] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  if (!open) return null;

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/farms/ensure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmName, cnpj }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Nao foi possivel cadastrar a fazenda.');
      }

      toast.success('Fazenda vinculada com sucesso.');
      router.refresh();
      if (mode === 'closable') setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel cadastrar a fazenda.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = extractInviteToken(inviteInput);
    if (!token) {
      toast.error('Cole o link ou o codigo do convite.');
      return;
    }

    setIsJoining(true);

    try {
      const response = await fetch('/api/farm-invites/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Nao foi possivel entrar na fazenda.');
      }

      toast.success('Voce entrou na fazenda com sucesso.');
      setInviteInput('');
      router.refresh();
      if (mode === 'closable') setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel entrar na fazenda.'
      );
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#202417]/80 p-4 backdrop-blur-sm ${
        mode === 'blocking' ? 'min-h-screen' : ''
      }`}
    >
      <div
        className={`relative w-full rounded-md border border-[#d9d5c8] bg-[#f8f7f3] p-5 text-[#202417] shadow-2xl ${
          mode === 'blocking' ? 'max-w-2xl' : 'max-w-lg'
        }`}
      >
        {mode === 'closable' ? (
          <button
            type="button"
            className="absolute right-4 top-4 rounded-md p-2 text-[#6b705c] hover:bg-white"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        ) : null}

        <div className="flex items-start gap-3">
          <div className="rounded-md bg-[#e8efdc] p-3 text-[#49651f]">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d7f3d]">
              Fazenda obrigatoria
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Crie uma fazenda ou entre em uma existente
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5e654f]">
              Sua conta ainda nao esta vinculada a nenhuma fazenda. Cadastre
              uma nova ou, se alguem ja te convidou, cole o link do convite.
            </p>
          </div>
        </div>

        <div className="mt-5 flex w-fit rounded-md border border-[#d9d5c8] bg-white p-1">
          <button
            type="button"
            onClick={() => setTab('create')}
            className={`rounded px-4 py-2 text-sm font-semibold ${
              tab === 'create' ? 'bg-[#49651f] text-white' : 'text-[#4d543f]'
            }`}
          >
            Criar fazenda
          </button>
          <button
            type="button"
            onClick={() => setTab('join')}
            className={`rounded px-4 py-2 text-sm font-semibold ${
              tab === 'join' ? 'bg-[#49651f] text-white' : 'text-[#4d543f]'
            }`}
          >
            Tenho um convite
          </button>
        </div>

        {tab === 'create' ? (
          <form className="mt-4 grid gap-4" onSubmit={handleCreate}>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
                Nome da fazenda
              </span>
              <input
                className="h-11 rounded-md border border-[#e1ded3] bg-white px-3 text-sm font-medium outline-none transition focus:border-[#49651f]"
                value={farmName}
                onChange={(event) => setFarmName(event.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
                CPF ou CNPJ
              </span>
              <input
                className="h-11 rounded-md border border-[#e1ded3] bg-white px-3 text-sm font-medium outline-none transition focus:border-[#49651f]"
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
              />
            </label>

            <Button
              type="submit"
              className="h-11 bg-[#49651f] text-white hover:bg-[#3f571b]"
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Cadastrar fazenda
            </Button>
          </form>
        ) : (
          <form className="mt-4 grid gap-4" onSubmit={handleJoin}>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
                Link ou codigo do convite
              </span>
              <input
                className="h-11 rounded-md border border-[#e1ded3] bg-white px-3 text-sm font-medium outline-none transition focus:border-[#49651f]"
                value={inviteInput}
                onChange={(event) => setInviteInput(event.target.value)}
                placeholder="Cole aqui o link que voce recebeu"
                required
              />
            </label>

            <Button
              type="submit"
              className="h-11 bg-[#49651f] text-white hover:bg-[#3f571b]"
              disabled={isJoining}
            >
              {isJoining ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Link2 className="mr-2 size-4" />
              )}
              Entrar na fazenda
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
