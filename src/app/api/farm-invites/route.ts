import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { requireFarmContext } from '@/lib/tenant';
import prisma from '@/lib/prisma';

const VALID_ROLES = [
  'OWNER',
  'EMPLOYEE',
  'CAREGIVER_VETERINARIAN',
  'FINANCIAL',
] as const;

export async function GET(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin;
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
      take: 20,
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

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_team');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const email = String(body.email ?? '').trim().toLowerCase();
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

  const appUrl = process.env.NEXTAUTH_URL ?? new URL(request.url).origin;

  return NextResponse.json({
    invite: {
      ...invite,
      link: `${appUrl}/register?invite=${invite.token}`,
    },
  });
}
