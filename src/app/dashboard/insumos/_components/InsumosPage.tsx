'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  AlertTriangle,
  Package,
  History,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Insumo,
  InsumoCategoria,
  InsumoMovimentoTipo,
  CATEGORIA_LABELS,
  MOVIMENTO_LABELS,
} from '@/types/insumos';

const CATEGORIAS: InsumoCategoria[] = [
  'RACAO',
  'VACINA',
  'VERMIFUGO',
  'ANTIBIOTICO',
  'MINERAL',
  'OUTROS',
];

const UNIDADES = ['kg', 'g', 'L', 'mL', 'dose', 'un', 'saco', 'cx'];

const CURRENCY = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const CATEGORIA_COLORS: Record<InsumoCategoria, string> = {
  RACAO: 'bg-amber-100 text-amber-800',
  VACINA: 'bg-blue-100 text-blue-800',
  VERMIFUGO: 'bg-purple-100 text-purple-800',
  ANTIBIOTICO: 'bg-red-100 text-red-800',
  MINERAL: 'bg-green-100 text-green-800',
  OUTROS: 'bg-gray-100 text-gray-700',
};

interface InsumoFormState {
  nome: string;
  categoria: InsumoCategoria;
  unidade: string;
  estoqueMin: string;
  custoPorUnid: string;
  observacoes: string;
}

const EMPTY_FORM: InsumoFormState = {
  nome: '',
  categoria: 'RACAO',
  unidade: 'kg',
  estoqueMin: '',
  custoPorUnid: '',
  observacoes: '',
};

interface MovimentoFormState {
  tipo: InsumoMovimentoTipo;
  quantidade: string;
  notas: string;
  data: string;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

interface Props {
  role: string;
}

export function InsumosPage({ role }: Props) {
  const canManage = ['OWNER', 'MANAGER', 'EMPLOYEE', 'CAREGIVER_VETERINARIAN'].includes(role);

  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);

  // Insumo dialog
  const [insumoDialog, setInsumoDialog] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);
  const [form, setForm] = useState<InsumoFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Movimento dialog
  const [movDialog, setMovDialog] = useState(false);
  const [movInsumo, setMovInsumo] = useState<Insumo | null>(null);
  const [movForm, setMovForm] = useState<MovimentoFormState>({
    tipo: 'ENTRADA',
    quantidade: '',
    notas: '',
    data: todayISO(),
  });
  const [movSaving, setMovSaving] = useState(false);

  // History panel
  const [historyInsumo, setHistoryInsumo] = useState<Insumo | null>(null);

  // Filter
  const [filterCat, setFilterCat] = useState<InsumoCategoria | 'TODAS'>('TODAS');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Insumo[]>('/api/insumos');
      setInsumos(data);
    } catch {
      toast.error('Erro ao carregar insumos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openCreate() {
    setEditingInsumo(null);
    setForm(EMPTY_FORM);
    setInsumoDialog(true);
  }

  function openEdit(ins: Insumo) {
    setEditingInsumo(ins);
    setForm({
      nome: ins.nome,
      categoria: ins.categoria,
      unidade: ins.unidade,
      estoqueMin: ins.estoqueMin != null ? String(ins.estoqueMin) : '',
      custoPorUnid: String(ins.custoPorUnid),
      observacoes: ins.observacoes ?? '',
    });
    setInsumoDialog(true);
  }

  async function saveInsumo() {
    if (!form.nome.trim()) { toast.error('Informe o nome'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        estoqueMin: form.estoqueMin !== '' ? Number(form.estoqueMin) : null,
        custoPorUnid: Number(form.custoPorUnid || 0),
      };
      if (editingInsumo) {
        await axios.put(`/api/insumos/${editingInsumo.id}`, payload);
        toast.success('Insumo atualizado');
      } else {
        await axios.post('/api/insumos', payload);
        toast.success('Insumo criado');
      }
      setInsumoDialog(false);
      load();
    } catch {
      toast.error('Erro ao salvar insumo');
    } finally {
      setSaving(false);
    }
  }

  async function deleteInsumo(ins: Insumo) {
    if (!confirm(`Excluir "${ins.nome}"? Todos os movimentos serão removidos.`)) return;
    try {
      await axios.delete(`/api/insumos/${ins.id}`);
      toast.success('Insumo excluído');
      load();
    } catch {
      toast.error('Erro ao excluir');
    }
  }

  function openMovimento(ins: Insumo, tipo: InsumoMovimentoTipo = 'ENTRADA') {
    setMovInsumo(ins);
    setMovForm({ tipo, quantidade: '', notas: '', data: todayISO() });
    setMovDialog(true);
  }

  async function saveMovimento() {
    if (!movInsumo) return;
    if (!movForm.quantidade || Number(movForm.quantidade) <= 0) {
      toast.error('Informe a quantidade');
      return;
    }
    setMovSaving(true);
    try {
      const { data } = await axios.post<Insumo>(`/api/insumos/${movInsumo.id}/movimento`, movForm);
      setInsumos((prev) => prev.map((i) => (i.id === data.id ? data : i)));
      if (historyInsumo?.id === data.id) setHistoryInsumo(data);
      toast.success('Movimentação registrada');
      setMovDialog(false);
    } catch {
      toast.error('Erro ao registrar movimentação');
    } finally {
      setMovSaving(false);
    }
  }

  const filtered = filterCat === 'TODAS' ? insumos : insumos.filter((i) => i.categoria === filterCat);
  const totalCusto = insumos.reduce((s, i) => s + Number(i.quantidade) * Number(i.custoPorUnid), 0);
  const emEstoqueBaixo = insumos.filter((i) => i.estoqueMin != null && Number(i.quantidade) <= Number(i.estoqueMin));

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Controle de Insumos</h1>
          <p className="text-sm text-muted-foreground">
            Rações, vacinas, vermífugos e demais insumos da fazenda
          </p>
        </div>
        {canManage && (
          <Button onClick={openCreate} size="sm" className="gap-2">
            <Plus className="size-4" /> Novo insumo
          </Button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Total em estoque</p>
          <p className="text-xl font-black text-primary">{CURRENCY.format(totalCusto)}</p>
          <p className="text-xs text-muted-foreground">{insumos.length} tipos cadastrados</p>
        </div>
        <div className={`rounded-2xl border p-4 shadow-sm ${emEstoqueBaixo.length > 0 ? 'border-red-200 bg-red-50' : 'bg-white'}`}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Estoque baixo</p>
          <p className={`text-xl font-black ${emEstoqueBaixo.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {emEstoqueBaixo.length}
          </p>
          <p className="text-xs text-muted-foreground">
            {emEstoqueBaixo.length === 0 ? 'Tudo em dia' : 'itens abaixo do mínimo'}
          </p>
        </div>
        <div className="col-span-2 rounded-2xl border bg-white p-4 shadow-sm sm:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Filtrar categoria</p>
          <Select value={filterCat} onValueChange={(v) => setFilterCat(v as InsumoCategoria | 'TODAS')}>
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODAS">Todas</SelectItem>
              {CATEGORIAS.map((c) => (
                <SelectItem key={c} value={c}>{CATEGORIA_LABELS[c]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((k) => (
            <div key={k} className="h-20 animate-pulse rounded-2xl bg-muted/40" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-16 text-center">
          <Package className="mb-3 size-10 text-muted-foreground/40" />
          <p className="font-semibold text-muted-foreground">Nenhum insumo cadastrado</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre rações, vacinas e outros insumos para controlar seu estoque.
          </p>
          {canManage && (
            <Button onClick={openCreate} size="sm" className="mt-4 gap-2">
              <Plus className="size-4" /> Cadastrar primeiro insumo
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ins) => {
            const baixo = ins.estoqueMin != null && Number(ins.quantidade) <= Number(ins.estoqueMin);
            const valorTotal = Number(ins.quantidade) * Number(ins.custoPorUnid);
            return (
              <div
                key={ins.id}
                className={`rounded-2xl border bg-white p-4 shadow-sm ${baixo ? 'border-red-200' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{ins.nome}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${CATEGORIA_COLORS[ins.categoria]}`}>
                        {CATEGORIA_LABELS[ins.categoria]}
                      </span>
                      {baixo && (
                        <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                          <AlertTriangle className="size-3" /> Estoque baixo
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Qtd.</span>
                        <p className={`font-bold ${baixo ? 'text-red-600' : 'text-foreground'}`}>
                          {Number(ins.quantidade).toLocaleString('pt-BR')} {ins.unidade}
                        </p>
                      </div>
                      {ins.estoqueMin != null && (
                        <div>
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Mínimo</span>
                          <p className="font-medium">{Number(ins.estoqueMin).toLocaleString('pt-BR')} {ins.unidade}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Custo/un.</span>
                        <p className="font-medium">{CURRENCY.format(Number(ins.custoPorUnid))}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Valor total</span>
                        <p className="font-semibold text-primary">{CURRENCY.format(valorTotal)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {canManage && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 text-xs text-green-700 hover:border-green-400 hover:bg-green-50"
                          onClick={() => openMovimento(ins, 'ENTRADA')}
                        >
                          <ArrowDownCircle className="size-3.5" /> Entrada
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 text-xs text-orange-700 hover:border-orange-400 hover:bg-orange-50"
                          onClick={() => openMovimento(ins, 'SAIDA')}
                        >
                          <ArrowUpCircle className="size-3.5" /> Saída
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 text-xs"
                          onClick={() => openMovimento(ins, 'AJUSTE')}
                        >
                          <RefreshCw className="size-3.5" /> Ajuste
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-muted-foreground"
                      onClick={() => setHistoryInsumo(historyInsumo?.id === ins.id ? null : ins)}
                    >
                      <History className="size-3.5" />
                    </Button>
                    {canManage && (
                      <>
                        <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={() => openEdit(ins)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => deleteInsumo(ins)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Inline history */}
                {historyInsumo?.id === ins.id && (
                  <div className="mt-3 border-t pt-3">
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Últimos movimentos</p>
                    {ins.movimentos && ins.movimentos.length > 0 ? (
                      <div className="space-y-1">
                        {ins.movimentos.map((m) => (
                          <div key={m.id} className="flex items-center justify-between rounded-lg bg-muted/20 px-3 py-1.5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                m.tipo === 'ENTRADA' ? 'bg-green-100 text-green-700'
                                : m.tipo === 'SAIDA' ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-600'
                              }`}>
                                {MOVIMENTO_LABELS[m.tipo]}
                              </span>
                              <span>{Number(m.quantidade).toLocaleString('pt-BR')} {ins.unidade}</span>
                              {m.notas && <span className="text-muted-foreground">— {m.notas}</span>}
                            </div>
                            <span className="text-muted-foreground">
                              {new Date(m.data).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhum movimento registrado.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Insumo Dialog */}
      <Dialog open={insumoDialog} onOpenChange={setInsumoDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingInsumo ? 'Editar insumo' : 'Novo insumo'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Nome *</label>
              <Input
                placeholder="Ex: Ração engorda 30%"
                value={form.nome}
                onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Categoria *</label>
                <Select value={form.categoria} onValueChange={(v) => setForm((p) => ({ ...p, categoria: v as InsumoCategoria }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((c) => (
                      <SelectItem key={c} value={c}>{CATEGORIA_LABELS[c]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Unidade *</label>
                <Select value={form.unidade} onValueChange={(v) => setForm((p) => ({ ...p, unidade: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Custo por unidade (R$)</label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={form.custoPorUnid}
                  onChange={(e) => setForm((p) => ({ ...p, custoPorUnid: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Estoque mínimo</label>
                <Input
                  type="number"
                  placeholder="Alerta abaixo de..."
                  value={form.estoqueMin}
                  onChange={(e) => setForm((p) => ({ ...p, estoqueMin: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Observações</label>
              <Input
                placeholder="Opcional"
                value={form.observacoes}
                onChange={(e) => setForm((p) => ({ ...p, observacoes: e.target.value }))}
              />
            </div>
            <Button className="w-full" onClick={saveInsumo} disabled={saving}>
              {saving ? 'Salvando...' : editingInsumo ? 'Salvar alterações' : 'Cadastrar insumo'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Movimento Dialog */}
      <Dialog open={movDialog} onOpenChange={setMovDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {movForm.tipo === 'ENTRADA' ? 'Registrar entrada'
                : movForm.tipo === 'SAIDA' ? 'Registrar saída'
                : 'Ajustar estoque'}
              {movInsumo && <span className="ml-1 font-normal text-muted-foreground">— {movInsumo.nome}</span>}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Tipo</label>
              <Select value={movForm.tipo} onValueChange={(v) => setMovForm((p) => ({ ...p, tipo: v as InsumoMovimentoTipo }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENTRADA">Entrada (compra/recebimento)</SelectItem>
                  <SelectItem value="SAIDA">Saída (uso/consumo)</SelectItem>
                  <SelectItem value="AJUSTE">Ajuste (definir saldo absoluto)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Quantidade ({movInsumo?.unidade})
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={movForm.quantidade}
                  onChange={(e) => setMovForm((p) => ({ ...p, quantidade: e.target.value }))}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Data</label>
                <Input
                  type="date"
                  value={movForm.data}
                  onChange={(e) => setMovForm((p) => ({ ...p, data: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Observações</label>
              <Input
                placeholder="Opcional"
                value={movForm.notas}
                onChange={(e) => setMovForm((p) => ({ ...p, notas: e.target.value }))}
              />
            </div>
            {movForm.tipo === 'AJUSTE' && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                O ajuste define o saldo absoluto — o estoque será atualizado para o valor informado.
              </p>
            )}
            <Button className="w-full" onClick={saveMovimento} disabled={movSaving}>
              {movSaving ? 'Registrando...' : 'Confirmar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
