'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, CirclePlus } from 'lucide-react';
import { toast } from 'sonner';
import { Animal, AnimalCalfLossHistory } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type TimelineEvent =
  | { kind: 'birth'; date: Date; animal: Animal }
  | { kind: 'loss'; date: Date; loss: AnimalCalfLossHistory };

interface Props {
  offspringFromMother: Animal[];
  calfLossHistories: AnimalCalfLossHistory[];
  animals: Animal[];
  externalBulls: ExternalBull[];
  animalId: string;
  onLossAdded: (loss: AnimalCalfLossHistory) => void;
  onLossDeleted: (id: string) => void;
}

const REASONS = ['Aborto', 'Natimorto', 'Parto prematuro', 'Outro'];

const defaultForm = () => ({
  lossDate: new Date().toISOString().split('T')[0],
  reason: '',
  expectedDueDate: '',
  fatherType: 'none' as 'internal' | 'external' | 'none',
  fatherAnimalId: '',
  externalBullId: '',
});

export function ReproductiveHistorySection({
  offspringFromMother,
  calfLossHistories,
  animals,
  externalBulls,
  animalId,
  onLossAdded,
  onLossDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const events: TimelineEvent[] = [
    ...offspringFromMother.map((a) => ({
      kind: 'birth' as const,
      date: new Date(a.birthDate),
      animal: a,
    })),
    ...calfLossHistories.map((h) => ({
      kind: 'loss' as const,
      date: new Date(h.lossDate),
      loss: h,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const bulls = animals.filter((a) => a.gender === 'male');

  async function handleSave() {
    if (!form.lossDate || !form.reason) {
      toast.error('Data e motivo são obrigatórios.');
      return;
    }
    if (form.fatherType === 'internal' && !form.fatherAnimalId) {
      toast.error('Selecione o pai interno.');
      return;
    }
    if (form.fatherType === 'external' && !form.externalBullId) {
      toast.error('Selecione o touro externo.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/calfLoss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animalId,
          lossDate: form.lossDate,
          reason: form.reason,
          expectedDueDate: form.expectedDueDate || undefined,
          fatherType: form.fatherType,
          fatherAnimalId: form.fatherType === 'internal' ? form.fatherAnimalId : undefined,
          externalBullId: form.fatherType === 'external' ? form.externalBullId : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message ?? 'Erro ao salvar.');
        return;
      }
      onLossAdded(data.data as AnimalCalfLossHistory);
      toast.success('Perda registrada.');
      setOpen(false);
      setForm(defaultForm());
    } catch {
      toast.error('Erro de conexão.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/calfLoss?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message ?? 'Erro ao remover.');
        return;
      }
      onLossDeleted(id);
      toast.success('Registro removido.');
    } catch {
      toast.error('Erro de conexão.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">Histórico Reprodutivo</h2>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            <CirclePlus className="size-3.5" />
            Registrar Perda
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum evento reprodutivo registrado.
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((ev, i) => {
              if (ev.kind === 'birth') {
                const pdRecord = ev.animal.weightHistories?.find((w) => w.recordType === 'PD');
                const isSold = ev.animal.status === 'sold' || ev.animal.status === 'vendido';
                return (
                  <div
                    key={`birth-${ev.animal.id}`}
                    className="flex items-center justify-between rounded-xl border-l-4 border-green-500 bg-muted/20 px-3 py-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Parto
                      </span>
                      <span>
                        {ev.date.toLocaleDateString('pt-BR')}
                        {' — '}
                        <Link
                          href={`/dashboard/${ev.animal.id}`}
                          className="font-mono text-primary underline-offset-2 hover:underline"
                        >
                          {ev.animal.manualId}
                        </Link>
                        {ev.animal.gender === 'male' ? ' (Macho)' : ' (Fêmea)'}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 text-xs text-muted-foreground">
                      <span>{ev.animal.weight} kg</span>
                      {pdRecord && (
                        <span className="font-medium text-amber-600">
                          PD: {Number(pdRecord.weight).toFixed(0)} kg
                        </span>
                      )}
                      {isSold && (
                        <span className="font-medium text-green-600">
                          Venda: {ev.animal.weight} kg
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              const h = ev.loss;
              return (
                <div
                  key={`loss-${h.id}-${i}`}
                  className="flex items-center justify-between rounded-xl border-l-4 border-red-400 bg-muted/20 px-3 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                      Perda
                    </span>
                    <span>
                      {ev.date.toLocaleDateString('pt-BR')}
                      {h.reason ? ` — ${h.reason}` : ''}
                      {h.fatherType === 'external' && h.externalBull
                        ? ` (Touro: ${h.externalBull.name})`
                        : h.fatherType === 'internal' && h.fatherAnimal
                          ? ` (Pai: ${h.fatherAnimal.manualId})`
                          : ''}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(h.id)}
                    disabled={deletingId === h.id}
                    className="ml-2 rounded p-1 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                    title="Remover registro"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Perda de Cria</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Data da perda *</label>
                <input
                  type="date"
                  value={form.lossDate}
                  onChange={(e) => setForm((f) => ({ ...f, lossDate: e.target.value }))}
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium">Previsão de parto</label>
                <input
                  type="date"
                  value={form.expectedDueDate}
                  onChange={(e) => setForm((f) => ({ ...f, expectedDueDate: e.target.value }))}
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Motivo *</label>
              <select
                value={form.reason}
                onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Pai da cria</label>
              <div className="flex gap-4">
                {(['none', 'internal', 'external'] as const).map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-1.5">
                    <input
                      type="radio"
                      name="fatherType"
                      value={t}
                      checked={form.fatherType === t}
                      onChange={() =>
                        setForm((f) => ({ ...f, fatherType: t, fatherAnimalId: '', externalBullId: '' }))
                      }
                    />
                    {t === 'none' ? 'Não informado' : t === 'internal' ? 'Interno' : 'Externo'}
                  </label>
                ))}
              </div>

              {form.fatherType === 'internal' && (
                <select
                  value={form.fatherAnimalId}
                  onChange={(e) => setForm((f) => ({ ...f, fatherAnimalId: e.target.value }))}
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione o touro...</option>
                  {bulls.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.manualId} — {b.breed}
                    </option>
                  ))}
                </select>
              )}

              {form.fatherType === 'external' && (
                <select
                  value={form.externalBullId}
                  onChange={(e) => setForm((f) => ({ ...f, externalBullId: e.target.value }))}
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione o touro externo...</option>
                  {externalBulls.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
