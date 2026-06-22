import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

type SanitaryType = 'vaccine' | 'deworming' | 'disease';

async function verifyAnimalFarm(animalId: string, farmId: string) {
  const animal = await prisma.animal.findFirst({
    where: { id: animalId, farmId },
    select: { id: true },
  });
  return !!animal;
}

export async function PUT(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') as SanitaryType | null;

  if (!id || !type) {
    return NextResponse.json({ error: 'id e type são obrigatórios.' }, { status: 400 });
  }

  const body = await request.json();
  const { name, description, date, expiryDate } = body;

  if (!name || !date) {
    return NextResponse.json({ error: 'name e date são obrigatórios.' }, { status: 400 });
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }
  const parsedExpiry = expiryDate ? new Date(expiryDate) : null;

  if (type === 'vaccine') {
    const existing = await prisma.vaccine.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    const updated = await prisma.vaccine.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        date: parsedDate,
        expiryDate: parsedExpiry ?? parsedDate,
      },
    });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ data: updated });
  }

  if (type === 'deworming') {
    const existing = await prisma.deworming.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    const updated = await prisma.deworming.update({
      where: { id },
      data: {
        name: name.trim(),
        date: parsedDate,
      },
    });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ data: updated });
  }

  if (type === 'disease') {
    const existing = await prisma.disease.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    const updated = await prisma.disease.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        date: parsedDate,
      },
    });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ data: updated });
  }

  return NextResponse.json({ error: 'Tipo inválido.' }, { status: 400 });
}

export async function DELETE(request: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') as SanitaryType | null;

  if (!id || !type) {
    return NextResponse.json({ error: 'id e type são obrigatórios.' }, { status: 400 });
  }

  if (type === 'vaccine') {
    const existing = await prisma.vaccine.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    await prisma.vaccine.delete({ where: { id } });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ ok: true });
  }

  if (type === 'deworming') {
    const existing = await prisma.deworming.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    await prisma.deworming.delete({ where: { id } });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ ok: true });
  }

  if (type === 'disease') {
    const existing = await prisma.disease.findFirst({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Não encontrado.' }, { status: 404 });
    if (!(await verifyAnimalFarm(existing.animalId, context.farm.id))) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 });
    }
    await prisma.disease.delete({ where: { id } });
    revalidateTag(`animal-${existing.animalId}`);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Tipo inválido.' }, { status: 400 });
}
