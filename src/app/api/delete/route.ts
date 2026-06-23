import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createAuditLog, requireFarmContext } from '@/lib/tenant';

export async function PUT(req: Request) {
  try {
    const { context, error, status } =
      await requireFarmContext('delete_animals');
    if (!context) return NextResponse.json({ error }, { status });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const allDataForm = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: 'ID não fornecido' },
        { status: 400 }
      );
    }

    const deleteAnimal = await prisma.$transaction(async (tx) => {
      const existing = await tx.animal.findFirst({
        where: { id: allDataForm.id, farmId: context.farm.id },
      });

      if (!existing) return null;

      const deleted = await tx.animal.delete({
        where: {
          id: allDataForm.id,
        },
      });

      await createAuditLog(tx, {
        farmId: context.farm.id,
        actorUserId: context.user.id,
        action: 'animal.delete',
        entityType: 'Animal',
        entityId: deleted.id,
        before: JSON.parse(JSON.stringify(existing)),
      });

      return deleted;
    });

    if (!deleteAnimal) {
      return NextResponse.json(
        { message: 'Animal nao encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Animal atualizado com sucesso',
      deleteAnimal,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor', error },
      { status: 500 }
    );
  }
}
