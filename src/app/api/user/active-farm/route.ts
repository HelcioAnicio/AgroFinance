import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import type { FarmRole } from '@prisma/client';

// PUT /api/user/active-farm  { farmId: string }
// Switches the calling user's active farm. Validates they are actually a member.
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json();
  const farmId = String(body.farmId ?? '').trim();

  if (!farmId) {
    return NextResponse.json({ error: 'farmId é obrigatório' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  // Ensure the user is actually a member of this farm
  const membership = await prisma.farmMembership.findUnique({
    where: { farmId_userId: { farmId, userId: user.id } },
    include: { farm: { select: { id: true, name: true } } },
  });

  if (!membership) {
    return NextResponse.json(
      { error: 'Você não é membro desta fazenda' },
      { status: 403 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma.user.update as any)({
    where: { id: user.id },
    data: { activeFarmId: farmId }, // run `prisma generate` to refresh types
  });

  return NextResponse.json({ success: true, farm: membership.farm });
}

// GET /api/user/active-farm
// Returns all farms the user belongs to + which one is currently active
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (prisma.user.findUnique as any)({
    where: { email: session.user.email },
    select: {
      id: true,
      activeFarmId: true,
      farmMemberships: {
        orderBy: { createdAt: 'asc' },
        include: { farm: { select: { id: true, name: true } } },
      },
    },
  }) as {
    id: string;
    activeFarmId: string | null;
    farmMemberships: Array<{
      farmId: string;
      role: FarmRole;
      farm: { id: string; name: string };
    }>;
  } | null;

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  const farms = user.farmMemberships.map((m) => ({
    farmId: m.farmId,
    name: m.farm.name,
    role: m.role,
    isActive: user.activeFarmId
      ? m.farmId === user.activeFarmId
      : user.farmMemberships[0]?.farmId === m.farmId,
  }));

  return NextResponse.json({ farms });
}
