export const BILLING_PLANS = [
  {
    id: 'starter_monthly',
    name: 'Básico',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 4999,
    features: ['1 fazenda', 'Equipe basica', 'Controle de animais'],
  },
  {
    id: 'growth_monthly',
    name: 'Pró',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 14999,
    features: ['Manejo completo', 'Financeiro', 'Relatorios'],
  },
  {
    id: 'pro_monthly',
    name: 'Premium',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 29999,
    features: ['Equipe avancada', 'Auditoria', 'Suporte prioritario'],
  },
  {
    id: 'starter_yearly',
    name: 'Básico',
    interval: 'year',
    label: 'Anual',
    amountInCents: 49999,
    features: ['1 fazenda', 'Equipe basica', 'Controle de animais'],
  },
  {
    id: 'growth_yearly',
    name: 'Pró',
    interval: 'year',
    label: 'Anual',
    amountInCents: 99999,
    features: ['Manejo completo', 'Financeiro', 'Relatorios'],
  },
  {
    id: 'pro_yearly',
    name: 'Premium',
    interval: 'year',
    label: 'Anual',
    amountInCents: 349000,
    features: ['Equipe avancada', 'Auditoria', 'Suporte prioritario'],
  },
] as const;

export type BillingPlanId = (typeof BILLING_PLANS)[number]['id'];

export function getBillingPlan(planId: string) {
  return BILLING_PLANS.find((plan) => plan.id === planId);
}
