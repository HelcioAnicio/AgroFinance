'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { IdCard, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompleteBillingProfile({
  initialName,
  email,
}: {
  initialName: string | null;
  email: string;
}) {
  const [name, setName] = useState(initialName ?? '');
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cnpj.trim()) {
      toast.error('Informe seu CPF ou CNPJ para continuar.');
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        '/api/updateUser',
        { updateUser: { name, cnpj } },
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success('Dados atualizados. Agora escolha seu plano.');
      window.location.href = '/billing';
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar seus dados.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-[#d9d5c8] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#49651f] text-white">
          <IdCard className="size-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d7f3d]">
            Cadastro incompleto
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            Informe CPF ou CNPJ antes de escolher o plano
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5e654f]">
            Contas criadas com Google podem chegar sem esse dado. Depois de
            salvar, voce sera direcionado para os planos e para a validacao do
            cartao no Stripe.
          </p>
        </div>
      </div>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
            Nome completo
          </label>
          <input
            className="h-11 rounded-md border border-[#e1ded3] bg-[#f8f7f3] px-3 text-sm outline-none focus:border-[#49651f]"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
            CPF ou CNPJ
          </label>
          <input
            className="h-11 rounded-md border border-[#e1ded3] bg-[#f8f7f3] px-3 text-sm outline-none focus:border-[#49651f]"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            placeholder="Digite somente numeros ou no formato usual"
          />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
            E-mail
          </label>
          <input
            className="h-11 rounded-md border border-[#e1ded3] bg-[#f8f7f3] px-3 text-sm opacity-70 outline-none"
            value={email}
            disabled
            readOnly
          />
        </div>
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="bg-[#49651f] text-white hover:bg-[#3f571b]"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Salvar e escolher plano
          </Button>
        </div>
      </form>
    </div>
  );
}
