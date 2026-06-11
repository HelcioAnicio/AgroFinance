'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BillingStatus() {
  const [status, setStatus] = useState<
    'pending' | 'active' | 'error' | 'syncing'
  >('pending');
  const [message, setMessage] = useState(
    'A validacao do cartao foi iniciada. Aguardando confirmacao do Stripe...'
  );
  const [retryCount, setRetryCount] = useState(0);
  console.log('retryCount: ', retryCount);

  useEffect(() => {
    let mounted = true;

    async function checkStatus() {
      try {
        const response = await fetch('/api/billing/status');
        if (!response.ok) throw new Error('Falha ao consultar status.');

        const data = await response.json();
        const isTrialValid =
          data.subscriptionStatus === 'TRIALING' &&
          data.stripeSubscriptionId &&
          data.trialEndsAt &&
          new Date(data.trialEndsAt).getTime() > Date.now();

        if (data.subscriptionStatus === 'ACTIVE' || isTrialValid) {
          if (mounted) {
            setStatus('active');
            setMessage('Assinatura confirmada! Redirecionando...');
          }
          // Wait a bit before redirecting to show the message
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
          return;
        }

        if (mounted) {
          setMessage(
            'A assinatura ainda nao foi confirmada. O sistema continuara verificando automaticamente.'
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

    async function syncWithStripe() {
      if (!mounted) return;

      try {
        setStatus('syncing');
        setMessage('Sincronizando dados com Stripe...');

        const response = await fetch('/api/billing/sync-status');
        if (!response.ok) throw new Error('Falha ao sincronizar com Stripe.');

        const data = await response.json();

        const isTrialValid =
          data.subscriptionStatus === 'TRIALING' &&
          data.stripeSubscriptionId &&
          data.trialEndsAt &&
          new Date(data.trialEndsAt).getTime() > Date.now();

        if (
          (data.subscriptionStatus === 'ACTIVE' || isTrialValid) &&
          data.synced
        ) {
          if (mounted) {
            setStatus('active');
            setMessage('Assinatura confirmada! Redirecionando...');
          }
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
          return;
        }

        if (mounted) {
          setStatus('pending');
          setMessage(
            'Continuando verificacao. Isso pode levar alguns minutos...'
          );
        }
      } catch (error) {
        if (mounted) {
          setStatus('pending');
          setMessage(
            'Retornando ao modo de verificacao automatica. ' +
              (error instanceof Error
                ? error.message
                : 'Erro na sincronizacao.')
          );
        }
      }
    }

    checkStatus();
    const intervalId = window.setInterval(async () => {
      setRetryCount((prev) => {
        const newCount = prev + 1;
        // After 6 attempts (30 seconds), try to sync with Stripe
        if (newCount === 6) {
          syncWithStripe();
        }
        // After 15 attempts (75 seconds), try sync again
        if (newCount % 15 === 0) {
          syncWithStripe();
        }
        return newCount;
      });
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
        {status === 'active' ? (
          <div className="h-6 w-6 rounded-full bg-[#2f6a33]" />
        ) : (
          <Loader2 className="h-6 w-6 animate-spin text-[#49651f]" />
        )}
        <div>
          <p className="text-lg font-semibold text-[#2f6a33]">
            {status === 'active' && 'Assinatura Ativada!'}
            {status === 'syncing' && 'Sincronizando com Stripe'}
            {status === 'pending' && 'Aguardando confirmacao do Stripe'}
            {status === 'error' && 'Erro ao processar'}
          </p>
          <p className="mt-2 text-sm text-[#5e654f]">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[#4d543f]">
        <span>
          Verificando status
          {status === 'syncing' ? ' (sincronizando)' : ''}
        </span>
      </div>

      {status === 'error' ? (
        <div className="mt-6 rounded-lg bg-[#fff3f3] p-4 text-[#7a2a2a]">
          <p className="font-semibold">Nao foi possivel verificar o status.</p>
          <p className="mt-1 text-sm">
            Recarregue a pagina ou tente novamente mais tarde.
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
