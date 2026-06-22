import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { requireFarmContext } from '@/lib/tenant';
import { updateStripeSeats, getBillableSeatCount } from '@/lib/stripeSeats';
import { getSeatLimitForTier } from '@/lib/billing';
import prisma from '@/lib/prisma';
import { getAppUrl } from '@/lib/appUrl';

const VALID_ROLES = [
  'OWNER',
  'MANAGER',
  'EMPLOYEE',
  'CAREGIVER_VETERINARIAN',
  'FINANCIAL',
  'VIEWER',
] as const;

export async function GET(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const appUrl = getAppUrl(request);
  const [members, invites, auditLogs, farmData] = await Promise.all([
    prisma.farmMembership.findMany({
      where: { farmId: context.farm.id },
      include: { user: { select: { name: true, email: true, image: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.farmInvite.findMany({
      where: { farmId: context.farm.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.auditLog.findMany({
      where: { farmId: context.farm.id },
      include: { actor: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prisma.farm.findUnique as any)({
      where: { id: context.farm.id },
      select: { stripePlanTier: true },
    }) as Promise<{ stripePlanTier: string | null } | null>,
  ]);

  const { getSeatLimitForTier: getLimit } = await import('@/lib/billing');
  const planTier = farmData?.stripePlanTier ?? null;
  const seatLimit = planTier ? getLimit(planTier) : null;
  const billableCount = members.filter((m) => m.role !== 'VIEWER').length;

  return NextResponse.json({
    members,
    invites: invites.map((invite) => ({
      ...invite,
      link: `${appUrl}/register?invite=${invite.token}`,
    })),
    auditLogs,
    seatInfo: {
      planTier,
      seatLimit,
      billableCount,
    },
  });
}

export async function PATCH(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const { type, memberId, inviteId, role } = body;

  if (type === 'member') {
    if (!memberId || !VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }
    const membership = await prisma.farmMembership.findFirst({
      where: { id: memberId, farmId: context.farm.id },
    });
    if (!membership) return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 });
    if (membership.role === 'OWNER') return NextResponse.json({ error: 'Não é possível alterar o dono.' }, { status: 403 });
    await prisma.farmMembership.update({ where: { id: memberId }, data: { role } });

    // Atualiza assentos no Stripe conforme transição de/para VIEWER
    const wasViewer = membership.role === 'VIEWER';
    const isNowViewer = role === 'VIEWER';
    if (wasViewer && !isNowViewer) {
      void updateStripeSeats(context.farm.id, +1); // VIEWER → cobrado
    } else if (!wasViewer && isNowViewer) {
      void updateStripeSeats(context.farm.id, -1); // cobrado → VIEWER (gratuito)
    }

    return NextResponse.json({ ok: true });
  }

  if (type === 'invite') {
    if (!inviteId || !VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }
    const invite = await prisma.farmInvite.findFirst({ where: { id: inviteId, farmId: context.farm.id } });
    if (!invite) return NextResponse.json({ error: 'Convite não encontrado.' }, { status: 404 });
    await prisma.farmInvite.update({ where: { id: inviteId }, data: { role } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Tipo inválido.' }, { status: 400 });
}

export async function DELETE(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const inviteId = searchParams.get('inviteId');
  const memberId = searchParams.get('memberId');

  if (inviteId) {
    const invite = await prisma.farmInvite.findFirst({ where: { id: inviteId, farmId: context.farm.id } });
    if (!invite) return NextResponse.json({ error: 'Convite não encontrado.' }, { status: 404 });
    await prisma.farmInvite.delete({ where: { id: inviteId } });
    return NextResponse.json({ ok: true });
  }

  if (memberId) {
    const membership = await prisma.farmMembership.findFirst({ where: { id: memberId, farmId: context.farm.id } });
    if (!membership) return NextResponse.json({ error: 'Membro não encontrado.' }, { status: 404 });
    if (membership.role === 'OWNER') return NextResponse.json({ error: 'Não é possível remover o dono.' }, { status: 403 });
    await prisma.farmMembership.delete({ where: { id: memberId } });
    // VIEWER é gratuito — só decrementa se era um membro cobrado
    if (membership.role !== 'VIEWER') {
      void updateStripeSeats(context.farm.id, -1);
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Informe inviteId ou memberId.' }, { status: 400 });
}

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const email = String(body.email ?? '')
    .trim()
    .toLowerCase();
  const role = String(body.role ?? '').trim();

  if (!email || !VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) {
    return NextResponse.json(
      { error: 'Informe email e nivel de acesso validos.' },
      { status: 400 }
    );
  }

  // Verifica limite de assentos do plano — VIEWER não conta
  if (role !== 'VIEWER') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const farm = await (prisma.farm.findUnique as any)({
      where: { id: context.farm.id },
      select: { stripePlanTier: true },
    }) as { stripePlanTier: string | null } | null;

    const tier = farm?.stripePlanTier ?? null;
    const seatLimit = tier ? getSeatLimitForTier(tier) : null;

    if (seatLimit !== null) {
      const currentSeats = await getBillableSeatCount(context.farm.id);
      if (currentSeats >= seatLimit) {
        return NextResponse.json(
          {
            error: `Limite de ${seatLimit} membros atingido para o plano ${tier}. Faça upgrade para adicionar mais membros.`,
          },
          { status: 403 }
        );
      }
    }
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const invite = await prisma.farmInvite.create({
    data: {
      farmId: context.farm.id,
      email,
      role: role as (typeof VALID_ROLES)[number],
      invitedById: context.user.id,
      token: randomBytes(24).toString('hex'),
      expiresAt,
    },
  });

  const appUrl = getAppUrl(request);

  return NextResponse.json({
    invite: {
      ...invite,
      link: `${appUrl}/register?invite=${invite.token}`,
    },
  });
}
