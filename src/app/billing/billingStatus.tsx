'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BillingStatus() {
  const [status, setStatus] = useState<'pending' | 'active' | 'error'>(
    'pending'
  );
  const [message, setMessage] = useState(
    'Seu pagamento foi iniciado. Aguardando confirmação do Stripe...'
  );
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function checkStatus() {
      try {
        const response = await fetch('/api/billing/status');
        if (!response.ok) throw new Error('Falha ao consultar status.');

        const data = await response.json();
        if (data.subscriptionStatus === 'ACTIVE') {
          if (mounted) setStatus('active');
          window.location.href = '/dashboard';
          return;
        }

        if (mounted) {
          setMessage(
            'A assinatura ainda não foi confirmada. O sistema continuará verificando automaticamente.'
          );
        }
      } catch (error) {
        if (mounted) {
          setStatus('error');
          setMessage(
            error instanceof Error
              ? error.message
              : 'Erro ao verificar o status do pagamento.'
          );
        }
      }
    }

    checkStatus();
    const intervalId = window.setInterval(() => {
      setRetryCount((prev) => prev + 1);
      checkStatus();
    }, 5000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="rounded-xl border border-[#d9d5c8] bg-white p-8 text-[#202417] shadow-sm">
      <div className="flex items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#49651f]" />
        <div>
          <p className="text-lg font-semibold text-[#2f6a33]">
            Aguardando confirmação do pagamento
          </p>
          <p className="mt-2 text-sm text-[#5e654f]">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[#4d543f]">
        <span>Verificação automática a cada 5 segundos</span>
        <span>{retryCount} tentativas</span>
      </div>

      {status === 'error' ? (
        <div className="mt-6 rounded-lg bg-[#fff3f3] p-4 text-[#7a2a2a]">
          <p className="font-semibold">Não foi possível verificar o status.</p>
          <p className="mt-1 text-sm">
            Recarregue a página ou tente novamente mais tarde.
          </p>
          <Button
            type="button"
            className="mt-3 bg-[#49651f] text-white hover:bg-[#3f571b]"
            onClick={() => window.location.reload()}
          >
            Recarregar
          </Button>
        </div>
      ) : null}
    </div>
  );
}
