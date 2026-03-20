import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const stage = searchParams.get('stage');
    const animalId = searchParams.get('animalId');

    const where: Record<string, unknown> = { animal: { ownerId: user.id } };
    if (stage) where.stage = stage;
    if (animalId) where.animalId = animalId;

    const managements = await prisma.reproductionManagement.findMany({
      where,
      include: { animal: true },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(managements);
  } catch (error) {
    console.error('Error fetching reproduction managements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const body = await request.json();
    const {
      animalId,
      stage,
      date,
      protocolo,
      implant,
      obs,
      ecc,
      touroId,
      touroType,
      partida,
      cio,
      ressinc,
    } = body;

    // Verify animal belongs to user
    const animal = await prisma.animal.findFirst({
      where: { id: animalId, ownerId: user.id },
    });
    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    // For ressinc, update count and history
    let ressincCount = 0;
    let ressincHistory: Array<{ date: string; obs: string }> = [];

    if (ressinc && stage === 'DG') {
      const existing = await prisma.reproductionManagement.findFirst({
        where: { animalId, stage: 'DG' },
        orderBy: { createdAt: 'desc' },
      });
      if (existing) {
        ressincCount = (existing.ressincCount || 0) + 1;
        ressincHistory = existing.ressincHistory
          ? [
              ...(Array.isArray(existing.ressincHistory)
                ? existing.ressincHistory
                : JSON.parse(existing.ressincHistory as string)),
              { date: new Date().toISOString(), obs },
            ]
          : [{ date: new Date().toISOString(), obs }];
      } else {
        ressincCount = 1;
        ressincHistory = [{ date: new Date().toISOString(), obs }];
      }

      // Update animal status back to empty for ressinc
      await prisma.animal.update({
        where: { id: animalId },
        data: { reproductiveStatus: 'empty' },
      });
    }

    const management = await prisma.reproductionManagement.create({
      data: {
        animalId,
        stage,
        date: new Date(date),
        protocolo,
        implant,
        obs,
        ecc,
        touroId,
        touroType,
        partida,
        cio,
        ressinc,
        ressincCount,
        ressincHistory:
          ressincHistory.length > 0
            ? JSON.parse(JSON.stringify(ressincHistory))
            : null,
      },
    });

    // Update animal's ECC and reproductive status if applicable
    if (ecc !== undefined) {
      await prisma.animal.update({
        where: { id: animalId },
        data: { bodyConditionScore: ecc },
      });
    }

    if (stage === 'DG' && body.newReproductiveStatus) {
      await prisma.animal.update({
        where: { id: animalId },
        data: { reproductiveStatus: body.newReproductiveStatus },
      });

      // Create notification if pregnant
      if (body.newReproductiveStatus === 'pregnant') {
        await prisma.notification.create({
          data: {
            message: `Animal ${animal.manualId} is now pregnant`,
            notifyAt: new Date(),
            userId: user.id,
            animalId,
          },
        });
      }
    }

    return NextResponse.json(management);
  } catch (error) {
    console.error('Error creating reproduction management:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const body = await request.json();
    const { id, newReproductiveStatus, ...updates } = body;

    const management = await prisma.reproductionManagement.findFirst({
      where: { id, animal: { ownerId: user.id } },
    });
    if (!management) {
      return NextResponse.json(
        { error: 'Management not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.reproductionManagement.update({
      where: { id },
      data: updates,
    });

    const stage = updates.stage ?? management.stage;
    const statusToUpdate = newReproductiveStatus;

    if (stage === 'DG' && statusToUpdate) {
      await prisma.animal.update({
        where: { id: management.animalId },
        data: { reproductiveStatus: statusToUpdate },
      });

      if (statusToUpdate === 'pregnant') {
        const animal = await prisma.animal.findUnique({
          where: { id: management.animalId },
        });
        if (animal) {
          await prisma.notification.create({
            data: {
              message: `Animal ${animal.manualId} is now pregnant`,
              notifyAt: new Date(),
              userId: user.id,
              animalId: management.animalId,
            },
          });
        }
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating reproduction management:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
