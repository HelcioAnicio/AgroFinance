import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { FinancialTransaction } from '@/types/financial';
import type { Transaction, Prisma } from '@prisma/client';

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
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');

  if (!userId) {
    return NextResponse.json(
      { message: 'Parametro userId obrigatorio.' },
      { status: 400 }
    );
  }

  const where: Prisma.TransactionWhereInput = { userId };

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

  if (!userId || !type || !category || !amount || !date) {
    return NextResponse.json(
      { message: 'Informe todos os campos obrigatorios.' },
      { status: 400 }
    );
  }

  const createdTransaction = await prisma.transaction.create({
    data: {
      userId,
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
