export type InsumoCategoria =
  | 'RACAO'
  | 'VACINA'
  | 'VERMIFUGO'
  | 'ANTIBIOTICO'
  | 'MINERAL'
  | 'OUTROS';

export type InsumoMovimentoTipo = 'ENTRADA' | 'SAIDA' | 'AJUSTE';

export interface InsumoMovimento {
  id: string;
  insumoId: string;
  tipo: InsumoMovimentoTipo;
  quantidade: number;
  notas?: string | null;
  data: string;
  createdAt: string;
}

export interface Insumo {
  id: string;
  farmId: string;
  nome: string;
  categoria: InsumoCategoria;
  unidade: string;
  quantidade: number;
  estoqueMin?: number | null;
  custoPorUnid: number;
  observacoes?: string | null;
  createdAt: string;
  updatedAt: string;
  movimentos?: InsumoMovimento[];
}

export const CATEGORIA_LABELS: Record<InsumoCategoria, string> = {
  RACAO: 'Ração',
  VACINA: 'Vacina',
  VERMIFUGO: 'Vermífugo',
  ANTIBIOTICO: 'Antibiótico',
  MINERAL: 'Mineral',
  OUTROS: 'Outros',
};

export const MOVIMENTO_LABELS: Record<InsumoMovimentoTipo, string> = {
  ENTRADA: 'Entrada',
  SAIDA: 'Saída',
  AJUSTE: 'Ajuste',
};
