'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, BellOff, Check, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Notification } from '@/types/notification';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface Props {
  notifications: Notification[];
}

export function NotificationsPageClient({ notifications: initial }: Props) {
  const router = useRouter();
  const [list, setList] = useState<Notification[]>(() => {
    const now = new Date();
    return [...initial]
      .filter((n) => !n.notifyAt || new Date(n.notifyAt) <= now)
      .sort((a, b) => new Date(b.notifyAt).getTime() - new Date(a.notifyAt).getTime());
  });

  const { permission, isSubscribed, isSupported, loading, subscribe, unsubscribe } =
    usePushNotifications();

  async function markRead(id: string) {
    try {
      await axios.put(`/api/updateNotificationRead?id=${id}`);
      setList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch {
      toast.error('Erro ao marcar como lida');
    }
  }

  async function markAllRead() {
    const unread = list.filter((n) => !n.read);
    if (unread.length === 0) return;
    try {
      await Promise.all(unread.map((n) => axios.put(`/api/updateNotificationRead?id=${n.id}`)));
      setList((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('Todas marcadas como lidas');
    } catch {
      toast.error('Erro ao marcar notificações');
    }
  }

  async function remove(id: string) {
    try {
      await axios.delete(`/api/updateNotificationRead?id=${id}`);
      setList((prev) => prev.filter((n) => n.id !== id));
    } catch {
      toast.error('Erro ao excluir notificação');
    }
  }

  async function removeAll() {
    try {
      await Promise.all(list.map((n) => axios.delete(`/api/updateNotificationRead?id=${n.id}`)));
      setList([]);
      toast.success('Notificações removidas');
    } catch {
      toast.error('Erro ao remover notificações');
    }
  }

  const unreadCount = list.filter((n) => !n.read).length;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-foreground">Notificações</h1>
        <p className="text-sm text-muted-foreground">Gerencie seus alertas e avisos</p>
      </div>

      {/* Push toggle card */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              {isSubscribed ? (
                <Bell className="size-5 text-primary" />
              ) : (
                <BellOff className="size-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">Notificações no celular</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {!isSupported
                  ? 'Seu navegador não suporta notificações push.'
                  : isSubscribed
                    ? 'Você receberá alertas mesmo com o app fechado.'
                    : 'Ative para receber alertas de parto, vacinação e mais no seu celular.'}
              </p>
              {permission === 'denied' && (
                <p className="mt-1 text-xs text-red-500">
                  Permissão bloqueada. Acesse as configurações do navegador para liberar.
                </p>
              )}
            </div>
          </div>

          {isSupported && permission !== 'denied' && (
            <button
              onClick={isSubscribed ? unsubscribe : subscribe}
              disabled={loading}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
                isSubscribed
                  ? 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {loading ? 'Aguarde...' : isSubscribed ? 'Desativar' : 'Ativar'}
            </button>
          )}
        </div>
      </div>

      {/* Notification list */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Avisos recentes</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                <Check className="size-3.5" /> Marcar todas
              </button>
            )}
            {list.length > 0 && (
              <button
                onClick={removeAll}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 className="size-3.5" /> Limpar
              </button>
            )}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
            <Bell className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Nenhuma notificação por enquanto.</p>
          </div>
        ) : (
          <ul className="divide-y">
            {list.map((n) => {
              const href = n.animalId
                ? `/dashboard/${n.animalId}`
                : `/dashboard/profile`;
              return (
                <li
                  key={n.id}
                  className={`flex items-start gap-3 px-5 py-4 transition-colors ${
                    !n.read ? 'bg-primary/5' : ''
                  }`}
                >
                  {!n.read && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  )}
                  <div className={`min-w-0 flex-1 ${n.read ? 'pl-4' : ''}`}>
                    <p className="text-sm text-foreground">{n.message}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(n.notifyAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={href}
                      onClick={() => { if (!n.read) void router.refresh(); markRead(n.id); }}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title="Ver animal"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Marcar como lida"
                      >
                        <Check className="size-4" />
                      </button>
                    )}
                    <button
                      onClick={() => remove(n.id)}
                      className="rounded-md p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
