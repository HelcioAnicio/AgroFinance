'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signOut, useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
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

const EditableUserProfile: React.FC<EditableUserProfileProps> = ({ user }) => {
  const { data } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [form, setForm] = useState<ProfileUser>(user);
  const [initial, setInitial] = useState<ProfileUser>(user);
  const membership = form.farmMemberships?.[0];

  const formatDate = (dateValue: Date | string | null | undefined) => {
    if (!dateValue) return '—';
    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  const handleBack = () => router.back();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
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
      if (updated) {
        const next = { ...form, ...updated };
        setForm(next);
        setInitial(next);
      }

      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro ao atualizar o perfil.');
    }
  };

  const handleCancel = () => {
    setForm(initial);
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação excluirá todos os seus animais e não pode ser desfeita.'
    );
    if (!confirmed) return;

    try {
      await axios.delete('/api/deleteAccount');
      toast.success('Conta excluída com sucesso.');
      await signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao excluir a conta.');
    }
  };

  return (
    <div className="pb-14">
      <section className="sticky top-0 bg-background">
        <div className="flex items-center justify-between px-2 py-3">
          <button onClick={handleBack}>
            <ArrowLeft />
          </button>
          <h1 className="w-full max-w-32 text-center text-xl sm:max-w-none">
            Perfil
          </h1>
          <div className="flex items-center gap-4 lg:gap-10">
            {!isEditing ? (
              <>
                <button
                  onClick={handleDeleteAccount}
                  aria-label="Excluir conta"
                >
                  <Trash2 className="text-red-500" />
                </button>
                <Button onClick={() => setIsEditing(true)}>Editar dados</Button>
              </>
            ) : (
              <div className="flex flex-col-reverse gap-5">
                <Button type="button" onClick={handleSave}>
                  Salvar
                </Button>
                <Button type="button" onClick={handleCancel} variant="ghost">
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-foreground" />
      </section>

      <div className="m-auto flex w-full max-w-lg flex-col gap-6 pb-10 pt-5">
        {!isEditing ? (
          <Card className="px-2 py-5">
            <CardHeader className="pb-10">
              <CardTitle className="text-base">Seus dados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-1 text-sm">
              <div className="flex items-end">
                <strong>Imagem (URL): </strong>
                <Avatar className="size-32">
                  <AvatarImage
                    src={data?.user?.image ?? undefined}
                    alt="Image from google profile"
                  />
                  <AvatarFallback className="text-foreground">
                    {data?.user?.name?.charAt(0)}{' '}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <strong>Nome: </strong>
                <span>{form.name}</span>
              </div>
              <div>
                <strong>E-mail: </strong>
                <span>{form.email}</span>
              </div>
              <div>
                <strong>CNPJ/CPF: </strong>
                <span>{form.cnpj ?? '—'}</span>
              </div>
              <div>
                <strong>Fazenda: </strong>
                <span>{membership?.farm.name ?? 'Nao vinculada'}</span>
              </div>
              <div>
                <strong>Acesso: </strong>
                <span>{membership?.role ?? 'Sem acesso'}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form className="flex flex-col gap-5 px-2">
            <Card className="px-2 py-5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Editar dados</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-1">
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="image">
                    Imagem (URL):
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="image"
                    name="image"
                    value={form.image ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="name">
                    Nome:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="name"
                    name="name"
                    value={form.name ?? ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="email">
                    E-mail:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent opacity-70 outline-none"
                    id="email"
                    name="email"
                    value={form.email ?? ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="cnpj">
                    CNPJ/CPF:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="cnpj"
                    name="cnpj"
                    value={form.cnpj ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="farmName">
                    Nome da fazenda:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="farmName"
                    name="farmName"
                    value={membership?.farm.name ?? ''}
                    onChange={(event) =>
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
                                    subscriptionStatus: 'TRIALING',
                                  },
                            },
                          ],
                        };
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        )}

        {!isEditing && (
          <Card className="border-[#e1ded3] bg-white px-2 py-5 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2 pb-4">
              <FaRegMoneyBillAlt className="size-5 text-[#49651f]" />
              <CardTitle className="text-base font-bold">
                Assinatura e Planos
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-1 text-sm">
              {!membership ? (
                <div className="rounded-md bg-amber-500/10 p-3 text-amber-800">
                  <p className="font-semibold">Nenhuma fazenda vinculada</p>
                  <p className="mt-1 text-xs">
                    Você precisa estar vinculado a uma fazenda para gerenciar
                    assinaturas.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6d7f3d]">
                      Status Atual
                    </span>
                    <div className="flex items-center gap-2">
                      {membership.farm.subscriptionStatus === 'TRIALING' && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                          Período de Avaliação (30 dias)
                        </span>
                      )}
                      {membership.farm.subscriptionStatus === 'ACTIVE' && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-600/30">
                          Ativa / Premium
                        </span>
                      )}
                      {membership.farm.subscriptionStatus === 'CANCELED' && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
                          Cancelada
                        </span>
                      )}
                      {membership.farm.subscriptionStatus === 'PAST_DUE' && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          Pagamento Pendente
                        </span>
                      )}
                      {!['TRIALING', 'ACTIVE', 'CANCELED', 'PAST_DUE'].includes(
                        membership.farm.subscriptionStatus
                      ) && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-600/20">
                          Sem Assinatura Ativa
                        </span>
                      )}
                    </div>
                  </div>

                  {membership.farm.subscriptionStatus === 'TRIALING' && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Sua fazenda está no período de avaliação de 30 dias. A
                      cobrança do plano escolhido só será efetuada após o
                      término do período de testes em{' '}
                      <strong>{formatDate(membership.farm.trialEndsAt)}</strong>
                      .
                    </p>
                  )}

                  {membership.farm.subscriptionStatus === 'ACTIVE' && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Sua assinatura está ativa e regularizada. Obrigado por ser
                      nosso cliente! Próximo vencimento em{' '}
                      <strong>{formatDate(membership.farm.trialEndsAt)}</strong>
                      .
                    </p>
                  )}

                  {membership.farm.subscriptionStatus === 'PAST_DUE' && (
                    <p className="text-xs font-medium leading-relaxed text-amber-700">
                      Atenção: Houve uma falha no processamento do seu
                      pagamento. Por favor, selecione um plano abaixo ou
                      atualize suas informações de faturamento no Stripe para
                      evitar a suspensão do acesso.
                    </p>
                  )}

                  {membership.farm.subscriptionStatus === 'CANCELED' && (
                    <p className="text-xs font-medium leading-relaxed text-red-600">
                      Sua assinatura foi cancelada. Seu acesso aos recursos
                      avançados pode expirar ou ser suspenso em breve. Escolha
                      um plano abaixo para reativá-la.
                    </p>
                  )}

                  {!['TRIALING', 'ACTIVE', 'CANCELED', 'PAST_DUE'].includes(
                    membership.farm.subscriptionStatus
                  ) && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Selecione um plano abaixo para iniciar seu período de
                      testes gratuito de 30 dias e liberar o acesso total ao
                      sistema de gestão AgroFinance.
                    </p>
                  )}

                  {membership.farm.trialEndsAt && (
                    <div className="mt-1 flex justify-between border-t border-[#e1ded3] pt-3 text-xs text-muted-foreground">
                      <span>Vencimento do Período/Cobrança:</span>
                      <span className="font-semibold text-foreground">
                        {formatDate(membership.farm.trialEndsAt)}
                      </span>
                    </div>
                  )}

                  {/* Gerenciamento de Planos */}
                  {membership.role === 'OWNER' ? (
                    <div className="mt-4 flex flex-col gap-4 border-t border-[#e1ded3] pt-4">
                      <Button
                        type="button"
                        onClick={() => setShowPlans(!showPlans)}
                        className="w-full bg-[#49651f] text-white hover:bg-[#3f571b]"
                      >
                        {showPlans
                          ? 'Ocultar Planos de Assinatura'
                          : 'Alterar / Escolher Novo Plano'}
                      </Button>

                      {showPlans && (
                        <div className="mt-2 flex flex-col gap-4 duration-300 animate-in fade-in slide-in-from-top-4">
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Ao assinar ou alterar seu plano, você será
                            redirecionado para o checkout seguro do Stripe.{' '}
                            <strong>Lembre-se:</strong> a cobrança real só
                            ocorrerá após o término dos 30 dias do período de
                            avaliação. Se você já tem uma assinatura ativa, ela
                            será substituída pela nova.
                          </p>
                          <BillingPlans plans={BILLING_PLANS} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 border-t border-[#e1ded3] pt-4 text-xs italic text-muted-foreground">
                      Apenas o proprietário (OWNER) da fazenda pode alterar os
                      planos e gerenciar o faturamento do Stripe.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="border-amber-500/40 bg-amber-500/5 px-2 py-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Aviso</CardTitle>
          </CardHeader>
          <CardContent className="px-1 text-sm text-muted-foreground">
            Sua conta será monitorada. Se você não fizer nenhuma alteração (em
            animais ou no seu perfil) dentro de 6 meses, a conta poderá ser
            excluída automaticamente. (Ainda não está ativo — apenas aviso.)
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditableUserProfile;
