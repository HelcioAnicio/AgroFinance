'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Copy, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'OWNER' | 'EMPLOYEE' | 'CAREGIVER_VETERINARIAN' | 'FINANCIAL';

type TeamData = {
  members: {
    id: string;
    role: Role;
    createdAt: string;
    user: { name: string | null; email: string | null };
  }[];
  invites: {
    id: string;
    email: string;
    role: Role;
    status: string;
    link: string;
    expiresAt: string;
    token: string;
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
  EMPLOYEE: 'Funcionário',
  CAREGIVER_VETERINARIAN: 'Cuidador/Veterinário',
  FINANCIAL: 'Financeiro',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: 'text-amber-600' },
  ACCEPTED: { label: 'Aceito', color: 'text-green-600' },
  REVOKED: { label: 'Revogado', color: 'text-red-500' },
  EXPIRED: { label: 'Expirado', color: 'text-gray-400' },
};

export default function TeamAccess() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('EMPLOYEE');
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const loadData = async () => {
    setDataLoading(true);
    const response = await fetch('/api/farm-invites');
    if (response.ok) setData(await response.json());
    setDataLoading(false);
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
      toast.success('Convite criado. Copie o link abaixo e envie para o usuário.');
      setEmail('');
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao convidar.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (link: string, token: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link para novo cadastro copiado.');
    void token;
  };

  const copyAcceptLink = (token: string) => {
    const base =
      typeof window !== 'undefined'
        ? window.location.origin
        : '';
    navigator.clipboard.writeText(
      `${base}/dashboard/accept-invite?token=${token}`
    );
    toast.success('Link para usuário existente copiado.');
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
        <h2 className="mb-3 font-bold">Convidar novo membro</h2>
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
            type="email"
            placeholder="email@fazenda.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <select
            className="rounded-md border px-3 py-2 outline-none"
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
        <p className="mt-3 text-xs text-muted-foreground">
          Após criar o convite, copie o link e envie para o usuário.{' '}
          <strong>Novo usuário</strong> → link de cadastro.{' '}
          <strong>Usuário existente</strong> → link de aceite.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold">Membros vinculados</h2>
            <button
              onClick={loadData}
              className="text-muted-foreground hover:text-foreground"
              title="Atualizar"
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {dataLoading && (
              <p className="text-xs text-muted-foreground">Carregando...</p>
            )}
            {!dataLoading && data?.members.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum membro vinculado.
              </p>
            )}
            {data?.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-md bg-[#f7f6f1] px-3 py-2"
              >
                <div>
                  <p className="font-medium">
                    {member.user.name ?? member.user.email}
                  </p>
                  {member.user.name && (
                    <p className="text-xs text-muted-foreground">
                      {member.user.email}
                    </p>
                  )}
                </div>
                <span className="text-xs font-semibold text-primary">
                  {roleLabels[member.role]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold">Convites enviados</h2>
          <div className="flex flex-col gap-3 text-sm">
            {dataLoading && (
              <p className="text-xs text-muted-foreground">Carregando...</p>
            )}
            {!dataLoading && data?.invites.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum convite enviado ainda.
              </p>
            )}
            {data?.invites.map((invite) => {
              const statusInfo = statusLabels[invite.status] ?? {
                label: invite.status,
                color: 'text-gray-500',
              };
              const isExpired = new Date(invite.expiresAt) < new Date();

              return (
                <div
                  key={invite.id}
                  className="rounded-md border bg-[#f7f6f1] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{invite.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {roleLabels[invite.role]} ·{' '}
                        <span className={statusInfo.color}>
                          {statusInfo.label}
                        </span>
                        {isExpired && invite.status === 'PENDING' && (
                          <span className="text-red-500"> (expirado)</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {invite.status === 'PENDING' && !isExpired && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copyLink(invite.link, invite.token)}
                        className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs shadow-sm hover:bg-muted"
                        title="Copiar link de cadastro (novo usuário)"
                      >
                        <Copy className="size-3" />
                        Link novo usuário
                      </button>
                      <button
                        type="button"
                        onClick={() => copyAcceptLink(invite.token)}
                        className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs shadow-sm hover:bg-muted"
                        title="Copiar link de aceite (usuário já cadastrado)"
                      >
                        <Copy className="size-3" />
                        Link usuário existente
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-md border bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold">Log de alterações</h2>
        <div className="flex flex-col gap-2 text-sm">
          {data?.auditLogs.length === 0 && (
            <p className="text-xs text-muted-foreground">Sem registros.</p>
          )}
          {data?.auditLogs.map((log) => (
            <div
              key={log.id}
              className="grid gap-1 rounded-md bg-[#f7f6f1] p-3 text-xs md:grid-cols-[1fr_1fr_180px]"
            >
              <span>{log.actor?.name ?? log.actor?.email ?? 'Sistema'}</span>
              <span>
                {log.action} em {log.entityType}
              </span>
              <span className="text-muted-foreground">
                {new Date(log.createdAt).toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
