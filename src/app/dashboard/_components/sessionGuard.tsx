'use client';

import { useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';

/**
 * Detecta quando a sessão do usuário foi evictada por outra pessoa
 * que entrou na mesma fazenda e o limite de sessões simultâneas foi atingido.
 * Faz sign-out automático após mostrar aviso.
 */
export function SessionGuard() {
  const { data: session } = useSession();
  const handled = useRef(false);

  useEffect(() => {
    if ((session as Record<string, unknown> | null)?.evicted && !handled.current) {
      handled.current = true;
      toast.error(
        'Você foi desconectado pois outro usuário entrou na fazenda e o limite de sessões simultâneas do plano foi atingido.',
        { duration: 6000 }
      );
      setTimeout(() => {
        void signOut({ callbackUrl: '/login' });
      }, 2500);
    }
  }, [session]);

  return null;
}
