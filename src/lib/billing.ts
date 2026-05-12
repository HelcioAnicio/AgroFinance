export const BILLING_PLANS = [
  {
    id: 'starter_monthly',
    name: 'Essencial',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 9900,
    features: ['1 fazenda', 'Equipe basica', 'Controle de animais'],
  },
  {
    id: 'growth_monthly',
    name: 'Crescimento',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 19900,
    features: ['Manejo completo', 'Financeiro', 'Relatorios'],
  },
  {
    id: 'pro_monthly',
    name: 'Profissional',
    interval: 'month',
    label: 'Mensal',
    amountInCents: 34900,
    features: ['Equipe avancada', 'Auditoria', 'Suporte prioritario'],
  },
  {
    id: 'starter_yearly',
    name: 'Essencial',
    interval: 'year',
    label: 'Anual',
    amountInCents: 99000,
    features: ['1 fazenda', 'Equipe basica', 'Controle de animais'],
  },
  {
    id: 'growth_yearly',
    name: 'Crescimento',
    interval: 'year',
    label: 'Anual',
    amountInCents: 199000,
    features: ['Manejo completo', 'Financeiro', 'Relatorios'],
  },
  {
    id: 'pro_yearly',
    name: 'Profissional',
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
