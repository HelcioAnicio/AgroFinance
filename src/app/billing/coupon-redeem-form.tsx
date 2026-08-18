'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CouponRedeemForm() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code.trim()) {
      toast.error('Informe o código do cupom.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/billing/redeem-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Nao foi possivel ativar o cupom.');
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel ativar o cupom.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-[#d9d5c8] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#49651f] text-white">
          <Ticket className="size-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d7f3d]">
            Acesso via cupom
          </p>
          <h2 className="mt-1 text-2xl font-bold">Ative seu acesso gratuito</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5e654f]">
            O AgroFinance ainda esta em fase de testes. Digite o codigo que
            voce recebeu para liberar o acesso — sem precisar cadastrar
            cartao.
          </p>
        </div>
      </div>

      <form
        className="mt-6 flex flex-col gap-3 md:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          className="h-11 flex-1 rounded-md border border-[#e1ded3] bg-[#f8f7f3] px-3 text-sm outline-none focus:border-[#49651f]"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Codigo do cupom"
          disabled={loading}
        />
        <Button
          type="submit"
          className="h-11 bg-[#49651f] text-white hover:bg-[#3f571b] md:w-fit"
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          {loading ? 'Ativando...' : 'Ativar acesso'}
        </Button>
      </form>
    </div>
  );
}
