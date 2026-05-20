import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const farmName =
    typeof body.farmName === 'string' ? body.farmName.trim() : '';
  const cnpj = typeof body.cnpj === 'string' ? body.cnpj.trim() : '';

  if (!farmName) {
    return NextResponse.json(
      { error: 'Informe o nome da fazenda.' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      cnpj: true,
      farmMemberships: {
        select: { id: true, farm: true, role: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existingMembership = user.farmMemberships[0];
  if (existingMembership) {
    return NextResponse.json({
      farm: existingMembership.farm,
      membership: existingMembership,
    });
  }

  const created = await prisma.$transaction(async (tx) => {
    const farm = await tx.farm.create({
      data: {
        name: farmName,
        ownerUserId: user.id,
        trialEndsAt: new Date(),
        subscriptionStatus: 'INCOMPLETE',
      },
    });

    const membership = await tx.farmMembership.create({
      data: {
        farmId: farm.id,
        userId: user.id,
        role: 'OWNER',
      },
    });

    if (cnpj && !user.cnpj) {
      await tx.user.update({
        where: { id: user.id },
        data: { cnpj },
      });
    }

    await tx.animal.updateMany({
      where: { ownerId: user.id, farmId: null },
      data: { farmId: farm.id },
    });

    await tx.externalBull.updateMany({
      where: { ownerId: user.id, farmId: null },
      data: { farmId: farm.id },
    });

    await tx.transaction.updateMany({
      where: { userId: user.id, farmId: null },
      data: { farmId: farm.id },
    });

    return { farm, membership };
  });

  return NextResponse.json(created, { status: 201 });
}
