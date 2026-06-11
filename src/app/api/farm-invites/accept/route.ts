import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json();
  const token = String(body.token ?? '').trim();

  if (!token) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  const invite = await prisma.farmInvite.findUnique({ where: { token } });

  if (!invite || invite.status !== 'PENDING') {
    return NextResponse.json(
      { error: 'Convite inválido ou já utilizado' },
      { status: 400 }
    );
  }

  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.json(
      { error: 'Este convite não é para o seu e-mail' },
      { status: 403 }
    );
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Convite expirado' }, { status: 400 });
  }

  const existing = await prisma.farmMembership.findUnique({
    where: { farmId_userId: { farmId: invite.farmId, userId: user.id } },
  });

  if (existing) {
    return NextResponse.json(
      { error: 'Você já é membro desta fazenda' },
      { status: 409 }
    );
  }

  await prisma.$transaction([
    prisma.farmMembership.create({
      data: { farmId: invite.farmId, userId: user.id, role: invite.role },
    }),
    prisma.farmInvite.update({
      where: { id: invite.id },
      data: {
        status: 'ACCEPTED',
        acceptedById: user.id,
        acceptedAt: new Date(),
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}
