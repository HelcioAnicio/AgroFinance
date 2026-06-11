import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';
import { getAppUrl } from '@/lib/appUrl';

const VALID_ROLES = [
  'OWNER',
  'EMPLOYEE',
  'CAREGIVER_VETERINARIAN',
  'FINANCIAL',
] as const;

export async function GET(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const appUrl = getAppUrl(request);
  const [members, invites, auditLogs] = await Promise.all([
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
  ]);

  return NextResponse.json({
    members,
    invites: invites.map((invite) => ({
      ...invite,
      link: `${appUrl}/register?invite=${invite.token}`,
    })),
    auditLogs,
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
