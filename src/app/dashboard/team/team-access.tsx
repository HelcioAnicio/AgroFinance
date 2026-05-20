'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Copy, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'OWNER' | 'EMPLOYEE' | 'CAREGIVER_VETERINARIAN' | 'FINANCIAL';

type TeamData = {
  members: {
    id: string;
    role: Role;
    user: { name: string | null; email: string | null };
  }[];
  invites: {
    id: string;
    email: string;
    role: Role;
    status: string;
    link: string;
  }[];
  auditLogs: {
    id: string;
    action: string;
    entityType: string;
    entityId: string | null;
    createdAt: string;
    actor: { name: string | null; email: string | null } | null;
  }[];
};

const roleLabels: Record<Role, string> = {
  OWNER: 'Dono',
  EMPLOYEE: 'Funcionario',
  CAREGIVER_VETERINARIAN: 'Cuidador/Veterinario',
  FINANCIAL: 'Financeiro',
};

export default function TeamAccess() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('EMPLOYEE');
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const response = await fetch('/api/farm-invites');
    if (!response.ok) return;
    setData(await response.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const createInvite = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/farm-invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const payload = await response.json();

      if (!response.ok) throw new Error(payload.error ?? 'Erro ao convidar.');

      await navigator.clipboard.writeText(payload.invite.link);
      toast.success('Convite criado e link copiado.');
      setEmail('');
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao convidar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-24 pt-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Equipe
        </p>
        <h1 className="text-2xl font-bold">Acessos da fazenda</h1>
      </section>

      <section className="rounded-md border bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input
            className="rounded-md border px-3 py-2"
            type="email"
            placeholder="email@fazenda.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <select
            className="rounded-md border px-3 py-2"
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
          >
            {Object.entries(roleLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Button onClick={createInvite} disabled={loading || !email}>
            <Send className="mr-2 size-4" />
            Convidar
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold">Usuarios vinculados</h2>
          <div className="flex flex-col gap-2 text-sm">
            {data?.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-md bg-[#f7f6f1] p-3"
              >
                <span>{member.user.name ?? member.user.email}</span>
                <strong>{roleLabels[member.role]}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold">Convites</h2>
          <div className="flex flex-col gap-2 text-sm">
            {data?.invites.map((invite) => (
              <div key={invite.id} className="rounded-md bg-[#f7f6f1] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span>{invite.email}</span>
                  <button
                    type="button"
                    aria-label="Copiar link"
                    onClick={() => {
                      navigator.clipboard.writeText(invite.link);
                      toast.success('Link copiado.');
                    }}
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {roleLabels[invite.role]} - {invite.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-md border bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold">Logs de alteracoes em animais</h2>
        <div className="flex flex-col gap-2 text-sm">
          {data?.auditLogs.map((log) => (
            <div
              key={log.id}
              className="grid gap-1 rounded-md bg-[#f7f6f1] p-3 md:grid-cols-[1fr_1fr_180px]"
            >
              <span>{log.actor?.name ?? log.actor?.email ?? 'Sistema'}</span>
              <span>
                {log.action} em {log.entityType}
              </span>
              <span>{new Date(log.createdAt).toLocaleString('pt-BR')}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
