import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

export async function POST(req: NextRequest) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await req.json();
  const message = String(body.message ?? '').trim();
  const notifyAt = new Date(String(body.notifyAt ?? ''));

  if (!message) {
    return NextResponse.json(
      { error: 'Informe a mensagem do lembrete.' },
      { status: 400 }
    );
  }
  if (isNaN(notifyAt.getTime())) {
    return NextResponse.json(
      { error: 'Informe uma data válida.' },
      { status: 400 }
    );
  }

  const members = await prisma.farmMembership.findMany({
    where: { farmId: context.farm.id },
    select: { userId: true },
  });

  await prisma.notification.createMany({
    data: members.map((m) => ({
      userId: m.userId,
      message: `Lembrete: ${message}`,
      notifyAt,
      read: false,
    })),
  });

  return NextResponse.json(
    { message: 'Lembrete criado com sucesso.' },
    { status: 201 }
  );
}
