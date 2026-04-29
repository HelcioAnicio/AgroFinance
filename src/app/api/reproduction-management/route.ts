import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function normalizeStatus(status: unknown): string {
  return typeof status === 'string' ? status.trim().toLowerCase() : '';
}

function buildPregnancySourceUpdate(params: {
  touroId?: string | null;
  touroType?: string | null;
}) {
  const touroId = params.touroId ?? null;
  const touroType = params.touroType ?? null;

  if (!touroId || !touroType) return {};

  if (touroType === 'internal') {
    return {
      handlingType: 'naturalMating',
      fatherId: touroId,
      bullId: touroId,
      externalBullId: null,
      bullIatfId: null,
      externalBullIatfId: null,
    };
  }

  if (touroType === 'external') {
    return {
      handlingType: 'artificialInsemination',
      fatherId: null,
      bullId: null,
      externalBullId: null,
      bullIatfId: null,
      externalBullIatfId: touroId,
    };
  }

  return {};
}

async function getLatestInseminationSource(animalId: string) {
  const latestInsemination = await prisma.reproductionManagement.findFirst({
    where: { animalId, stage: 'Insemination' },
    select: { touroId: true, touroType: true },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
  });

  if (!latestInsemination) return {};

  return buildPregnancySourceUpdate({
    touroId: latestInsemination.touroId,
    touroType: latestInsemination.touroType,
  });
}

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
    const animalUpdateData: Record<string, unknown> = {};

    if (ecc !== undefined) {
      animalUpdateData.bodyConditionScore = ecc;
    }

    if (typeof obs === 'string') {
      animalUpdateData.observations = obs;
    }

    if (stage === 'DG' && body.newReproductiveStatus) {
      const normalizedStatus = normalizeStatus(body.newReproductiveStatus);
      animalUpdateData.reproductiveStatus = body.newReproductiveStatus;

      if (normalizedStatus === 'pregnant') {
        const pregnancySourceUpdate = await getLatestInseminationSource(animalId);
        Object.assign(animalUpdateData, pregnancySourceUpdate);
      } else {
        Object.assign(animalUpdateData, {
          handlingType: null,
          bullId: null,
          externalBullId: null,
          bullIatfId: null,
          externalBullIatfId: null,
        });
      }
    }

    if (Object.keys(animalUpdateData).length > 0) {
      await prisma.animal.update({
        where: { id: animalId },
        data: animalUpdateData,
      });

      // Create notification if pregnant
      if (normalizeStatus(body.newReproductiveStatus) === 'pregnant') {
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
    const animalUpdateData: Record<string, unknown> = {};

    if (updates.ecc !== undefined) {
      animalUpdateData.bodyConditionScore = updates.ecc;
    }

    if (typeof updates.obs === 'string') {
      animalUpdateData.observations = updates.obs;
    }

    if (stage === 'DG' && statusToUpdate) {
      const normalizedStatus = normalizeStatus(statusToUpdate);
      animalUpdateData.reproductiveStatus = statusToUpdate;

      if (normalizedStatus === 'pregnant') {
        const pregnancySourceUpdate = await getLatestInseminationSource(
          management.animalId
        );
        Object.assign(animalUpdateData, pregnancySourceUpdate);
      } else {
        Object.assign(animalUpdateData, {
          handlingType: null,
          bullId: null,
          externalBullId: null,
          bullIatfId: null,
          externalBullIatfId: null,
        });
      }
    }

    if (Object.keys(animalUpdateData).length > 0) {
      await prisma.animal.update({
        where: { id: management.animalId },
        data: animalUpdateData,
      });

      if (normalizeStatus(statusToUpdate) === 'pregnant') {
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
