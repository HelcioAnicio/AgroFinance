'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de convite não encontrado no link.');
      return;
    }

    fetch('/api/farm-invites/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('success');
          toast.success('Convite aceito! Bem-vindo à fazenda.');
          // Hard redirect so the server re-reads activeFarmId and loads the correct farm
          setTimeout(() => { window.location.href = '/dashboard'; }, 2500);
        } else {
          setStatus('error');
          setMessage(data.error ?? 'Erro ao aceitar convite.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Erro de conexão. Tente novamente.');
      });
  }, [searchParams, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <Image
        src="/logo.png"
        alt="AgroFinance"
        width={80}
        height={80}
        className="size-16"
      />
      <h1 className="text-2xl font-bold text-foreground">AgroFinance</h1>

      {status === 'loading' && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            <span
              className="size-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="size-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="size-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Processando convite...
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-lg font-semibold text-foreground">
            Convite aceito com sucesso!
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecionando para o painel...
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-semibold text-destructive">{message}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground"
          >
            Ir para o painel
          </button>
        </div>
      )}
    </main>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense>
      <AcceptInviteContent />
    </Suspense>
  );
}
