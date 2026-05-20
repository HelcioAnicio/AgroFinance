'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Cloud,
  CreditCard,
  IdCard,
  Loader2,
  Save,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BILLING_PLANS } from '@/lib/billing';
import BillingPlans from '@/app/billing/plans';

type ProfileUser = {
  id: string;
  name: string;
  email: string;
  cnpj: string | null;
  image: string | null;
  farmMemberships?: {
    role: string;
    farm: {
      id: string;
      name: string;
      trialEndsAt: Date | string;
      stripeCustomerId: string | null;
      stripeSubscriptionId: string | null;
      subscriptionStatus: string;
    };
  }[];
};

interface EditableUserProfileProps {
  user: ProfileUser;
}

const statusLabels: Record<string, string> = {
  ACTIVE: 'Assinatura ativa',
  TRIALING: 'Teste ativo',
  PAST_DUE: 'Pagamento pendente',
  CANCELED: 'Assinatura cancelada',
  INCOMPLETE: 'Aguardando validacao',
};

const EditableUserProfile: React.FC<EditableUserProfileProps> = ({ user }) => {
  const router = useRouter();
  const [form, setForm] = useState<ProfileUser>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const membership = form.farmMemberships?.[0];
  const farm = membership?.farm;
  const hasDocument = Boolean(form.cnpj?.trim());
  const hasValidatedTrial =
    farm?.subscriptionStatus === 'TRIALING' &&
    Boolean(farm.stripeSubscriptionId) &&
    new Date(farm.trialEndsAt).getTime() > Date.now();
  const hasActiveSubscription = farm?.subscriptionStatus === 'ACTIVE';
  const hasValidatedPlan = hasActiveSubscription || hasValidatedTrial;
  const statusLabel = !farm
    ? 'Sem fazenda vinculada'
    : hasValidatedPlan
      ? hasValidatedTrial
        ? statusLabels.TRIALING
        : statusLabels.ACTIVE
      : farm.subscriptionStatus === 'PAST_DUE' ||
          farm.subscriptionStatus === 'CANCELED'
        ? statusLabels[farm.subscriptionStatus]
        : statusLabels.INCOMPLETE;

  const formatDate = (dateValue: Date | string | null | undefined) => {
    if (!dateValue) return '-';
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return '-';

    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFarmNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      const currentMembership = prev.farmMemberships?.[0];

      return {
        ...prev,
        farmMemberships: [
          {
            role: currentMembership?.role ?? 'OWNER',
            farm: currentMembership
              ? {
                  ...currentMembership.farm,
                  name: event.target.value,
                }
              : {
                  id: '',
                  name: event.target.value,
                  trialEndsAt: new Date().toISOString(),
                  stripeCustomerId: null,
                  stripeSubscriptionId: null,
                  subscriptionStatus: 'INCOMPLETE',
                },
          },
        ],
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const payload = {
        name: form.name,
        cnpj: form.cnpj ?? '',
        image: form.image ?? '',
        farmName: form.farmMemberships?.[0]?.farm.name ?? '',
      };

      const res = await axios.put(
        '/api/updateUser',
        { updateUser: payload },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const updated = res.data?.user as ProfileUser | undefined;
      const next = updated ? { ...form, ...updated } : form;
      setForm(next);
      toast.success('Perfil atualizado com sucesso.');
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro ao atualizar o perfil.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa acao excluira todos os seus animais e nao pode ser desfeita.'
    );
    if (!confirmed) return;

    try {
      await axios.delete('/api/deleteAccount');
      toast.success('Conta excluida com sucesso.');
      await signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao excluir a conta.');
    }
  };

  const helperCards = [
    {
      icon: ShieldCheck,
      title: 'Seguranca de Dados',
      text: 'Revise suas informacoes essenciais e mantenha seus dados fiscais completos.',
      action: 'Revisar seguranca',
    },
    {
      icon: Bell,
      title: 'Notificacoes',
      text: 'Os avisos de assinatura aparecem somente depois da validacao no Stripe.',
      action: 'Configurar alertas',
    },
    {
      icon: Cloud,
      title: 'Backup Automatico',
      text: 'Seus dados da fazenda ficam sincronizados com as rotinas do sistema.',
      action: 'Ver historico',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f3] px-4 pb-20 pt-6 text-[#202417]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <button
              type="button"
              className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6d7f3d]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
              Configuracoes / Perfil do usuario
            </button>
            <h1 className="text-3xl font-bold tracking-normal">
              Conta e Fazenda
            </h1>
          </div>
          <Button
            type="button"
            className="w-full bg-[#49651f] text-white hover:bg-[#3f571b] md:w-auto"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            Salvar alteracoes
          </Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
          <aside className="h-fit rounded-md border-l-4 border-[#49651f] bg-white p-6 shadow-sm">
            <Avatar className="mx-auto size-28 border-4 border-[#f1efe8]">
              <AvatarImage src={form.image ?? undefined} alt={form.name} />
              <AvatarFallback className="bg-[#e9eddf] text-3xl font-bold text-[#49651f]">
                {form.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="mt-5 text-center">
              <p className="font-bold">{form.name}</p>
              <p className="text-xs text-[#6b705c]">{form.email}</p>
            </div>
            <div className="mt-6 space-y-3 border-t border-[#e1ded3] pt-4 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold uppercase text-[#8a907c]">
                  Membro desde
                </span>
                <span className="font-bold text-[#49651f]">2026</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold uppercase text-[#8a907c]">
                  Nivel de acesso
                </span>
                <span className="font-bold text-[#49651f]">
                  {membership?.role ?? 'Sem acesso'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold uppercase text-[#8a907c]">
                  Assinatura
                </span>
                <span className="text-right font-bold text-[#49651f]">
                  {statusLabel}
                </span>
              </div>
            </div>
          </aside>

          <main className="flex flex-col gap-7">
            <div className="border-b border-[#e1ded3]">
              <div className="flex flex-wrap gap-7 text-xs font-bold uppercase tracking-[0.18em] text-[#9aa08d]">
                <span className="border-b-2 border-[#49651f] pb-3 text-[#202417]">
                  Dados pessoais
                </span>
                <span className="pb-3">Seguranca</span>
                <span className="pb-3">Propriedade rural</span>
              </div>
            </div>

            <section className="grid gap-4 md:grid-cols-2">
              <ProfileField
                label="Nome completo"
                name="name"
                value={form.name ?? ''}
                onChange={handleChange}
              />
              <ProfileField label="E-mail" value={form.email} disabled />
              <ProfileField
                label="CPF ou CNPJ"
                name="cnpj"
                value={form.cnpj ?? ''}
                onChange={handleChange}
              />
              <ProfileField
                label="Imagem do perfil (URL)"
                name="image"
                value={form.image ?? ''}
                onChange={handleChange}
              />
            </section>

            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#49651f]">
                <IdCard className="size-4" />
                Detalhes da propriedade
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <ProfileField
                  label="Nome da fazenda"
                  value={farm?.name ?? ''}
                  onChange={handleFarmNameChange}
                />
                <ProfileField
                  label="Status de faturamento"
                  value={statusLabel}
                  disabled
                />
              </div>
            </section>

            <section className="rounded-md border border-[#e1ded3] bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#49651f]">
                    <CreditCard className="size-4" />
                    Assinatura e planos
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-[#5e654f]">
                    A liberacao do acesso acontece somente depois que o Stripe
                    valida o cartao e confirma a assinatura.
                  </p>
                </div>
                {hasValidatedPlan ? (
                  <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="size-4" />
                    {hasValidatedTrial
                      ? `Teste ativo ate ${formatDate(farm?.trialEndsAt)}`
                      : 'Plano ativo'}
                  </span>
                ) : (
                  <span className="rounded-md bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                    Validacao pendente
                  </span>
                )}
              </div>

              {!hasDocument ? (
                <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Informe CPF ou CNPJ e salve as alteracoes antes de escolher um
                  plano.
                </div>
              ) : membership?.role === 'OWNER' ? (
                <div className="mt-5 flex flex-col gap-4">
                  <Button
                    type="button"
                    className="w-full bg-[#49651f] text-white hover:bg-[#3f571b] md:w-fit"
                    onClick={() => setShowPlans((current) => !current)}
                  >
                    {showPlans ? 'Ocultar planos' : 'Escolher ou alterar plano'}
                  </Button>
                  {showPlans ? <BillingPlans plans={BILLING_PLANS} /> : null}
                </div>
              ) : (
                <div className="mt-5 rounded-md border border-[#e1ded3] bg-[#f8f7f3] p-4 text-sm text-[#5e654f]">
                  Apenas o proprietario da fazenda pode gerenciar planos.
                </div>
              )}
            </section>
          </main>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {helperCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-md border border-[#e1ded3] bg-white p-5 shadow-sm"
              >
                <Icon className="size-5 text-[#49651f]" />
                <h2 className="mt-5 text-sm font-bold">{card.title}</h2>
                <p className="mt-3 min-h-12 text-xs leading-relaxed text-[#5e654f]">
                  {card.text}
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#49651f]">
                  {card.action}
                </p>
              </article>
            );
          })}
        </section>

        <section className="flex flex-col gap-3 rounded-md border border-red-200 bg-white p-5 text-sm text-[#5e654f] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-red-700">Zona de seguranca</p>
            <p className="mt-1">
              Excluir a conta remove seus dados e nao pode ser desfeito.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            className="md:w-fit"
            onClick={handleDeleteAccount}
          >
            <Trash2 className="mr-2 size-4" />
            Excluir conta
          </Button>
        </section>
      </section>
    </div>
  );
};

function ProfileField({
  label,
  name,
  value,
  disabled = false,
  onChange,
}: {
  label: string;
  name?: string;
  value: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7f3d]">
        {label}
      </span>
      <input
        className="h-11 rounded-md border border-[#e1ded3] bg-white px-3 text-sm font-medium outline-none transition focus:border-[#49651f] disabled:bg-[#f1f0eb] disabled:text-[#202417]"
        name={name}
        value={value}
        disabled={disabled}
        readOnly={disabled}
        onChange={onChange}
      />
    </label>
  );
}

export default EditableUserProfile;
