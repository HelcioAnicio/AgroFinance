'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }
  return output;
}

function isIosNonStandalone() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  // iOS só entrega Web Push quando o site foi adicionado à Tela de Início
  // (modo standalone) — numa aba comum do Safari, o subscribe falha ou a
  // permissão concedida não gera push nenhum.
  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true;
  return isIos && !isStandalone;
}

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const [needsHomeScreenInstall, setNeedsHomeScreenInstall] = useState(false);

  const checkSubscription = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setIsSubscribed(!!sub);
    } catch {
      // not available
    }
  }, []);

  useEffect(() => {
    const supported = typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window;
    setIsSupported(supported);
    setNeedsHomeScreenInstall(isIosNonStandalone());
    if (supported) {
      setPermission(Notification.permission);
      checkSubscription();
    }
  }, [checkSubscription]);

  async function subscribe() {
    if (!isSupported) return;
    if (needsHomeScreenInstall) {
      toast.error(
        'No iPhone, adicione o AgroFinance à Tela de Início antes de ativar (Compartilhar → Adicionar à Tela de Início). Fora disso, o iOS não entrega notificações.'
      );
      return;
    }
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') {
        toast.error('Permissão de notificação não foi concedida.');
        return;
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        console.error('NEXT_PUBLIC_VAPID_PUBLIC_KEY não configurada.');
        toast.error(
          'Notificações push não estão configuradas neste ambiente.'
        );
        return;
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!response.ok) {
        throw new Error(`Falha ao salvar inscrição (${response.status})`);
      }
      setIsSubscribed(true);
    } catch (err) {
      console.error('Erro ao ativar notificações:', err);
      toast.error(
        'Não foi possível ativar as notificações neste dispositivo.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    if (!isSupported) return;
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        const endpoint = encodeURIComponent(sub.endpoint);
        await sub.unsubscribe();
        await fetch(`/api/push/subscribe?endpoint=${endpoint}`, { method: 'DELETE' });
      }
      setIsSubscribed(false);
    } catch (err) {
      console.error('Erro ao desativar notificações:', err);
    } finally {
      setLoading(false);
    }
  }

  return {
    permission,
    isSubscribed,
    isSupported,
    loading,
    needsHomeScreenInstall,
    subscribe,
    unsubscribe,
  };
}
