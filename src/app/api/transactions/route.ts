import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { FinancialTransaction } from '@/types/financial';
import type { Transaction, Prisma } from '@prisma/client';
import { requireFarmContext } from '@/lib/tenant';

function toFinancialTransaction(
  transaction: Transaction
): FinancialTransaction {
  return {
    id: transaction.id,
    user_id: transaction.userId,
    type: transaction.type,
    category: transaction.category,
    amount: Number(transaction.amount),
    date: transaction.date.toISOString().slice(0, 10),
    description: transaction.description,
    status: transaction.status,
    created_at: transaction.createdAt?.toISOString() ?? null,
    updated_at: transaction.updatedAt?.toISOString() ?? null,
  };
}

export async function GET(request: Request) {
  const { context, error, status } = await requireFarmContext('view_finance');
  if (!context) return NextResponse.json({ message: error }, { status });

  const url = new URL(request.url);
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');
  
  const where: Prisma.TransactionWhereInput = {
    farmId: context.farm.id,
  };

  if (start && end) {
    where.date = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: {
      date: 'desc',
    },
  });

  return NextResponse.json(
    transactions.map((transaction) => toFinancialTransaction(transaction))
  );
}

export async function POST(request: Request) {
  const { context, error, status: authStatus } =
    await requireFarmContext('manage_finance');
  if (!context) return NextResponse.json({ message: error }, { status: authStatus });

  const body = await request.json();

  const {
    user_id: userId,
    type,
    category,
    amount,
    date,
    description,
    status,
  } = body as {
    user_id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
    description: string | null;
    status: boolean;
  };

  if (!type || !category || !amount || !date) {
    return NextResponse.json(
      { message: 'Informe todos os campos obrigatorios.' },
      { status: 400 }
    );
  }

  const createdTransaction = await prisma.transaction.create({
    data: {
      userId,
      farmId: context.farm.id,
      type,
      category,
      amount,
      date: new Date(date),
      description,
      status,
    },
  });

  return NextResponse.json(toFinancialTransaction(createdTransaction));
}

export async function PATCH(request: Request) {
  const { context, error, status: authStatus } =
    await requireFarmContext('manage_finance');
  if (!context) return NextResponse.json({ message: error }, { status: authStatus });

  const body = await request.json();

  const {
    id,
    user_id: userId,
    type,
    category,
    amount,
    date,
    description,
    status,
  } = body as {
    id: string;
    user_id: string;
    type?: 'income' | 'expense';
    category?: string;
    amount?: number;
    date?: string;
    description?: string | null;
    status?: boolean;
  };

  if (!id) {
    return NextResponse.json(
      { message: 'Informe o id e o user_id do lancamento.' },
      { status: 400 }
    );
  }

  const transaction = await prisma.transaction.findFirst({
    where: { id, farmId: context.farm.id },
  });

  if (!transaction) {
    return NextResponse.json(
      { message: 'Lancamento nao encontrado para este usuario.' },
      { status: 404 }
    );
  }

  const data: Prisma.TransactionUpdateInput = {};

  if (typeof type === 'string') data.type = type;
  if (typeof category === 'string' && category.trim()) {
    data.category = category.trim();
  }
  if (typeof amount === 'number') {
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { message: 'Informe um valor valido para o lancamento.' },
        { status: 400 }
      );
    }
    data.amount = amount;
  }
  if (typeof date === 'string' && date) data.date = new Date(date);
  if (description === null || typeof description === 'string') {
    data.description = description ? description.trim() : null;
  }
  if (typeof status === 'boolean') data.status = status;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { message: 'Nenhum campo valido para atualizacao foi informado.' },
      { status: 400 }
    );
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data,
  });

  return NextResponse.json(toFinancialTransaction(updatedTransaction));
}
