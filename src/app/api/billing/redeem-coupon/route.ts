import { NextResponse } from 'next/server';
import { getBillingPlan } from '@/lib/billing';
import { requireFarmContext } from '@/lib/tenant';
import { createCheckoutSession } from '@/lib/stripeCheckout';

// Enquanto o acesso pago não está disponível (conta Stripe pendente de
// verificação), cupons liberam o tier Empresarial — sem limite de membros —
// para não travar ninguém em limite de assento durante o beta.
const COUPON_PLAN_ID = 'enterprise_monthly';

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_farm');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const code = String(body.code ?? '').trim();

  if (!code) {
    return NextResponse.json(
      { error: 'Informe um código de cupom.' },
      { status: 400 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY nao configurada.' },
      { status: 500 }
    );
  }

  const promoResponse = await fetch(
    `https://api.stripe.com/v1/promotion_codes?code=${encodeURIComponent(code)}&active=true`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );
  const promoData = await promoResponse.json();
  const promotionCodeId: string | undefined = promoResponse.ok
    ? promoData.data?.[0]?.id
    : undefined;

  if (!promotionCodeId) {
    return NextResponse.json(
      { error: 'Cupom inválido ou expirado.' },
      { status: 400 }
    );
  }

  const plan = getBillingPlan(COUPON_PLAN_ID);
  if (!plan) {
    return NextResponse.json(
      { error: 'Plano de cupom nao configurado.' },
      { status: 500 }
    );
  }

  const result = await createCheckoutSession({
    farm: context.farm,
    user: context.user,
    plan,
    installmentsEnabled: false,
    paymentMethodCollection: 'if_required',
    promotionCodeId,
    extraMetadata: { viaCoupon: 'true' },
  });

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ url: result.url });
}
