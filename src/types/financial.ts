export type TransactionType = 'income' | 'expense';

export interface FinancialTransaction {
  id: string;
  user_id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  description: string | null;
  status: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
