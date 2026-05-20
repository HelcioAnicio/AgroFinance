import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireFarmContext } from '@/lib/tenant';

function parseBatchesInput(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value !== 'string') return [];

  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function validateExternalBullInput(input: {
  name?: unknown;
  breed?: unknown;
  sourceCompany?: unknown;
  dosesAvailable?: unknown;
  batches?: unknown;
}) {
  const errors: string[] = [];
  const batches = parseBatchesInput(input.batches);
  const name = String(input.name ?? '').trim();
  const breed = String(input.breed ?? '').trim();
  const sourceCompany = String(input.sourceCompany ?? '').trim();
  const dosesAvailable = Number(input.dosesAvailable);

  if (!name) errors.push('Nome do touro e obrigatorio.');
  if (!breed) errors.push('Raca e obrigatoria.');
  if (!sourceCompany) errors.push('Empresa de origem e obrigatoria.');
  if (batches.length === 0) errors.push('Informe ao menos uma partida.');
  if (!Number.isInteger(dosesAvailable) || dosesAvailable < 0) {
    errors.push(
      'Quantidade de doses deve ser um numero inteiro maior ou igual a zero.'
    );
  }

  return {
    errors,
    data: {
      name,
      breed,
      sourceCompany,
      batches,
      dosesAvailable,
    },
  };
}

export async function GET() {
  const { context, error, status } = await requireFarmContext('view_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const externalBulls = await prisma.externalBull.findMany({
    where: { farmId: context.farm.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ externalBulls });
}

export async function POST(req: NextRequest) {
  const { context, error, status } =
    await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await req.json();
  const { errors, data } = validateExternalBullInput(body);

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const externalBull = await prisma.externalBull.create({
    data: {
      ...data,
      ownerId: context.farm.ownerUserId,
      farmId: context.farm.id,
    },
  });

  return NextResponse.json(
    { message: 'Touro externo cadastrado com sucesso.', externalBull },
    { status: 201 }
  );
}

export async function PUT(req: NextRequest) {
  const { context, error, status } =
    await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const body = await req.json();
  const id = String(body.id ?? '').trim();

  if (!id) {
    return NextResponse.json({ error: 'ID nao informado.' }, { status: 400 });
  }

  const { errors, data } = validateExternalBullInput(body);

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const existingExternalBull = await prisma.externalBull.findFirst({
    where: { id, farmId: context.farm.id },
    select: { id: true },
  });

  if (!existingExternalBull) {
    return NextResponse.json(
      { error: 'Touro externo nao encontrado.' },
      { status: 404 }
    );
  }

  const externalBull = await prisma.externalBull.update({
    where: { id },
    data,
  });

  return NextResponse.json({
    message: 'Touro externo atualizado com sucesso.',
    externalBull,
  });
}

export async function DELETE(req: NextRequest) {
  const { context, error, status } =
    await requireFarmContext('manage_animals');
  if (!context) return NextResponse.json({ error }, { status });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID nao informado.' }, { status: 400 });
  }

  const existingExternalBull = await prisma.externalBull.findFirst({
    where: { id, farmId: context.farm.id },
    select: { id: true },
  });

  if (!existingExternalBull) {
    return NextResponse.json(
      { error: 'Touro externo nao encontrado.' },
      { status: 404 }
    );
  }

  await prisma.externalBull.delete({
    where: { id },
  });

  return NextResponse.json({
    message: 'Touro externo removido com sucesso.',
  });
}
