import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createAuditLog, hasFarmPermission, requireFarmContext } from '@/lib/tenant';

export async function POST(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ message: error }, { status });

  const body = await request.json() as {
    animalIds: string[];
    action: 'sell' | 'trash';
    saleData?: {
      pricePerHead: number;
      totalValue: number;
      date: string;
      description?: string;
    };
  };

  const { animalIds, action, saleData } = body;

  if (!animalIds?.length || !action) {
    return NextResponse.json({ message: 'animalIds e action são obrigatórios.' }, { status: 400 });
  }

  // Descarte (trash) é equivalente a deletar — apenas OWNER e MANAGER podem fazer isso
  if (action === 'trash' && !hasFarmPermission(context.role, 'delete_animals')) {
    return NextResponse.json({ message: 'Apenas o dono ou gerente pode descartar animais.' }, { status: 403 });
  }

  // Verify all animals belong to the farm
  const animals = await prisma.animal.findMany({
    where: { id: { in: animalIds }, farmId: context.farm.id },
    select: { id: true, manualId: true, weight: true },
  });

  if (animals.length !== animalIds.length) {
    return NextResponse.json({ message: 'Um ou mais animais não pertencem a esta fazenda.' }, { status: 403 });
  }

  const newStatus = action === 'sell' ? 'sold' : 'trash';
  const today = new Date();

  const auditAction = action === 'sell' ? 'animal.bulk_sell' : 'animal.bulk_trash';

  if (action === 'sell' && saleData) {
    await prisma.$transaction(async (tx) => {
      await tx.animal.updateMany({
        where: { id: { in: animalIds } },
        data: { status: newStatus },
      });
      await Promise.all(
        animals.map((animal) =>
          tx.transaction.create({
            data: {
              userId: context.user.id,
              farmId: context.farm.id,
              type: 'income',
              category: 'Venda de animal',
              amount: saleData.pricePerHead,
              date: new Date(saleData.date),
              description: `Venda do animal ${animal.manualId} — ${animal.weight ?? 0} kg`,
              status: false,
            },
          })
        )
      );
      await createAuditLog(tx, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: auditAction,
        entityType: 'Animal',
        entityId: null,
        metadata: {
          animalIds,
          manualIds: animals.map((a) => a.manualId),
          pricePerHead: saleData.pricePerHead,
          totalValue: saleData.totalValue,
        },
      });
    });
  } else {
    await prisma.$transaction(async (tx) => {
      await tx.animal.updateMany({
        where: { id: { in: animalIds } },
        data: { status: newStatus },
      });
      await createAuditLog(tx, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: auditAction,
        entityType: 'Animal',
        entityId: null,
        metadata: {
          animalIds,
          manualIds: animals.map((a) => a.manualId),
        },
      });
    });
  }

  return NextResponse.json({
    updated: animals.length,
    action,
    message:
      action === 'sell'
        ? `${animals.length} animal(is) marcado(s) como vendido(s). Lançamentos financeiros criados como pendente.`
        : `${animals.length} animal(is) marcado(s) para descarte.`,
  });
}
