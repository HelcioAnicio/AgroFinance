'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ReproductionManagement } from '@/types/reproduction';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { Pencil, CheckCircle2, Circle, Download, Search, X } from 'lucide-react';

const STAGES = ['D0', 'Manejo', 'Insemination', 'DG'] as const;
type Stage = (typeof STAGES)[number];

const stageLabels: Record<Stage, string> = {
  D0: 'D0',
  Manejo: 'Manejo',
  Insemination: 'Inseminação',
  DG: 'DG',
};

const emptyForm = {
  animalId: '',
  date: '',
  protocolo: false,
  implant: '',
  obs: '',
  ecc: '',
  touroId: '',
  touroType: 'internal' as 'internal' | 'external',
  partida: '',
  cio: '',
  ressinc: false,
  newReproductiveStatus: '',
};

const ReproductionManagementPage = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('D0');
  const [managements, setManagements] = useState<ReproductionManagement[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);
  const [animalSearch, setAnimalSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stageDates, setStageDates] = useState<Record<string, string>>({ D0: '', Manejo: '', Insemination: '', DG: '' });
  const [formData, setFormData] = useState(emptyForm);

  const toLocalDateString = (date: string | Date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const computeStageDates = useCallback((data: ReproductionManagement[]) => {
    const dates: Record<string, string> = { D0: '', Manejo: '', Insemination: '', DG: '' };
    data.forEach((m) => {
      const ds = toLocalDateString(m.date);
      if (!dates[m.stage] || ds > dates[m.stage]) dates[m.stage] = ds;
    });
    return dates;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [mRes, aRes, bRes] = await Promise.all([
        fetch('/api/reproduction-management'),
        fetch('/api/dashboard-table-data'),
        fetch('/api/external-bulls'),
      ]);
      const mData = await mRes.json();
      const aData = await aRes.json();
      const bData = await bRes.json();
      setManagements(mData);
      setStageDates(computeStageDates(mData));
      setAnimals(aData.animals || []);
      setExternalBulls(Array.isArray(bData) ? bData : bData?.externalBulls || []);
    } catch (e) { console.error(e); }
  }, [computeStageDates]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (editingId) return;
    setFormData((prev) => ({ ...prev, date: stageDates[currentStage] || '' }));
    setAnimalSearch('');
  }, [currentStage, stageDates, editingId]);

  const translateCategory = (cat = '') => {
    const c = cat.toLowerCase();
    if (c === 'neonate') return 'Neonato';
    if (c === 'calf') return 'Bezerro';
    if (c === 'steer') return 'Garrote';
    if (c === 'cow') return 'Vaca';
    if (c === 'old cow') return 'Vaca velha';
    if (c === 'ox') return 'Boi';
    if (c === 'old ox') return 'Boi velho';
    if (c === 'bull') return 'Touro';
    if (c === 'old bull') return 'Touro velho';
    return cat;
  };

  const isCow = (a: Animal) => {
    const c = a.category?.toLowerCase();
    return a.status?.toLowerCase() === 'active' && (c === 'cow' || c === 'old cow');
  };

  const isBull = (a: Animal) => {
    const c = a.category?.toLowerCase();
    return a.status?.toLowerCase() === 'active' && (c === 'bull' || c === 'old bull');
  };

  const getFilteredAnimals = () => {
    const search = animalSearch.trim().toLowerCase();
    const numSearch = search.replace(/\D/g, '');

    let base: Animal[] = [];
    switch (currentStage) {
      case 'D0': {
        const empty = animals.filter((a) => isCow(a) && (!a.reproductiveStatus || a.reproductiveStatus.toLowerCase() === 'empty'));
        const ressinc = animals.filter((a) => isCow(a) && managements.some((m) => m.animalId === a.id && m.stage === 'DG' && m.ressinc));
        base = [...empty, ...ressinc.filter((r) => !empty.some((e) => e.id === r.id))];
        break;
      }
      case 'Manejo':
        base = animals.filter((a) => isCow(a) && managements.some((m) => m.animalId === a.id && m.stage === 'D0' && m.protocolo));
        break;
      case 'Insemination': {
        const proto = animals.filter((a) => isCow(a) && managements.some((m) => m.animalId === a.id && m.stage === 'Manejo'));
        const notPart = animals.filter((a) =>
          isCow(a) &&
          managements.some((m) => m.animalId === a.id && m.stage === 'D0' && m.protocolo) &&
          !managements.some((m) => m.animalId === a.id && m.stage === 'Manejo')
        );
        base = [...proto, ...notPart];
        break;
      }
      case 'DG': {
        const insem = animals.filter((a) => isCow(a) && managements.some((m) => m.animalId === a.id && m.stage === 'Insemination'));
        const preg = animals.filter((a) => isCow(a) && a.reproductiveStatus?.toLowerCase() === 'pregnant');
        base = [...insem, ...preg.filter((p) => !insem.some((i) => i.id === p.id))];
        break;
      }
    }
    if (!search) return base;
    return base.filter((a) => {
      const mid = a.manualId?.toLowerCase() ?? '';
      return mid.includes(search) || (numSearch && mid.replace(/\D/g, '').includes(numSearch));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingId = toast.loading(editingId ? 'Atualizando registro...' : 'Salvando registro...');
    try {
      const payload = {
        ...formData,
        stage: currentStage,
        date: stageDates[currentStage] || formData.date,
        ecc: formData.ecc ? parseFloat(formData.ecc) : undefined,
        id: editingId,
      };
      const res = await fetch('/api/reproduction-management', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      toast.dismiss(loadingId);
      if (res.ok) {
        toast.success(editingId ? 'Registro atualizado com sucesso!' : 'Registro salvo com sucesso!');
        await fetchData();
        setEditingId(null);
        setFormData(emptyForm);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? 'Erro ao salvar registro.');
      }
    } catch (err) {
      toast.dismiss(loadingId);
      toast.error('Erro ao salvar registro.');
      console.error(err);
    }
  };

  const handleEdit = (m: ReproductionManagement) => {
    setEditingId(m.id);
    setCurrentStage(m.stage);
    setFormData({
      animalId: m.animalId,
      date: toLocalDateString(m.date),
      protocolo: m.protocolo ?? false,
      implant: m.implant ?? '',
      obs: m.obs ?? '',
      ecc: m.ecc?.toString() ?? '',
      touroId: m.touroId ?? '',
      touroType: m.touroType ?? 'internal',
      partida: m.partida ?? '',
      cio: m.cio ?? '',
      ressinc: m.ressinc ?? false,
      newReproductiveStatus: m.newReproductiveStatus ?? '',
    });
  };

  const stageManagements = managements.filter((m) => m.stage === currentStage);
  const baseFiltered = getFilteredAnimals();
  const filteredAnimals =
    editingId && formData.animalId && !baseFiltered.some((a) => a.id === formData.animalId)
      ? [animals.find((a) => a.id === formData.animalId)!, ...baseFiltered].filter(Boolean)
      : baseFiltered;
  const selectedAnimal = animals.find((a) => a.id === formData.animalId);
  const internalSire = animals.find(
    (a) => a.id === selectedAnimal?.bullId || a.id === selectedAnimal?.bullIatfId || a.id === selectedAnimal?.fatherId
  );
  const externalSire = externalBulls.find(
    (b) => b.id === selectedAnimal?.externalBullId || b.id === selectedAnimal?.externalBullIatfId
  );
  const sireLabel = internalSire?.manualId ?? externalSire?.name ?? 'N/A';

  const fieldClass = 'rounded-lg border border-border text-sm';

  return (
    <div className="space-y-5">
      {/* Stage tabs */}
      <div className="flex gap-2">
        {STAGES.map((stage) => {
          const active = currentStage === stage;
          const count = managements.filter((m) => m.stage === stage).length;
          return (
            <button
              key={stage}
              type="button"
              onClick={() => {
                setCurrentStage(stage);
                setEditingId(null);
                setAnimalSearch('');
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {active ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
              {stageLabels[stage]}
              {count > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20' : 'bg-muted'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Form panel */}
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="font-bold">
              {currentStage === 'DG' ? 'DG — Atualizar status' : `Gerenciamento — ${stageLabels[currentStage]}`}
            </h2>
            <p className="text-xs text-muted-foreground">Registre o manejo do protocolo</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            {/* Date */}
            <div>
              <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Data do manejo
              </Label>
              <Input
                type="date"
                className={fieldClass}
                value={stageDates[currentStage] || formData.date}
                onChange={(e) => {
                  setStageDates((prev) => ({ ...prev, [currentStage]: e.target.value }));
                  setFormData((prev) => ({ ...prev, date: e.target.value }));
                }}
                required
              />
            </div>

            {/* Animal autocomplete */}
            <div>
              <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Buscar e selecionar animal
              </Label>
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    className={`${fieldClass} pl-8 pr-8`}
                    value={animalSearch}
                    placeholder="Digite o número do animal (ex: A001)"
                    onChange={(e) => {
                      setAnimalSearch(e.target.value);
                      // Clear selection when user starts typing
                      if (formData.animalId) setFormData((prev) => ({ ...prev, animalId: '' }));
                    }}
                    onFocus={() => {
                      // Show dropdown on focus if no animal selected yet
                      if (!formData.animalId) setAnimalSearch(animalSearch);
                    }}
                  />
                  {formData.animalId && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, animalId: '' }));
                        setAnimalSearch('');
                      }}
                      className="absolute right-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* Dropdown list — shown when typing and no animal selected */}
                {animalSearch && !formData.animalId && filteredAnimals.length > 0 && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                    {filteredAnimals.map((animal) => {
                      const isPregnant = animal.reproductiveStatus === 'pregnant';
                      return (
                        <button
                          key={animal.id}
                          type="button"
                          disabled={isPregnant}
                          onClick={() => {
                            const sel = animal;
                            setFormData((prev) => ({
                              ...prev,
                              animalId: sel.id,
                              ecc: sel.bodyConditionScore ? String(sel.bodyConditionScore) : '',
                              obs: sel.observations ?? '',
                              newReproductiveStatus:
                                sel.reproductiveStatus && ['pregnant', 'empty', 'open'].includes(sel.reproductiveStatus)
                                  ? sel.reproductiveStatus
                                  : '',
                            }));
                            setAnimalSearch(sel.manualId);
                          }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <span className="font-semibold text-primary">{animal.manualId}</span>
                          <span className="text-muted-foreground">
                            — {translateCategory(animal.category)}
                            {isPregnant ? ' (prenha)' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* No results */}
                {animalSearch && !formData.animalId && filteredAnimals.length === 0 && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border bg-white p-3 text-center text-xs text-muted-foreground shadow-lg">
                    Nenhum animal encontrado para este estágio.
                  </div>
                )}

                {/* Selected animal badge */}
                {formData.animalId && (
                  <p className="mt-1 text-xs text-primary font-semibold">
                    ✓ {animals.find((a) => a.id === formData.animalId)?.manualId} selecionado
                  </p>
                )}
              </div>
            </div>

            {/* Selected animal info */}
            {formData.animalId && (
              <div className="rounded-xl bg-muted/40 px-4 py-3 text-xs space-y-1">
                <p className="font-semibold text-muted-foreground uppercase tracking-widest text-[10px]">Informações atuais</p>
                <div className="flex gap-4 flex-wrap">
                  <span>Status: <strong>{selectedAnimal?.reproductiveStatus || 'N/A'}</strong></span>
                  <span>ECC: <strong>{selectedAnimal?.bodyConditionScore ?? 'N/A'}</strong></span>
                </div>
                {selectedAnimal?.reproductiveStatus === 'pregnant' && (
                  <p>
                    Tipo:{' '}
                    <strong>
                      {selectedAnimal?.handlingType === 'naturalMating' ? 'Monta' : selectedAnimal?.handlingType === 'artificialInsemination' ? 'Inseminação' : 'N/A'}
                    </strong>{' '}
                    · Pai: <strong>{sireLabel}</strong>
                  </p>
                )}
                {managements.filter((m) => m.animalId === formData.animalId).map((m) => (
                  <p key={m.id} className="text-muted-foreground">
                    {stageLabels[m.stage as Stage]}: ECC {m.ecc} · Protocolo {m.protocolo ? 'Sim' : 'Não'}
                    {m.obs ? ` · ${m.obs}` : ''}
                  </p>
                ))}
              </div>
            )}

            {/* Protocol checkbox (D0/Manejo/Insemination) */}
            {currentStage !== 'DG' && (
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.protocolo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, protocolo: e.target.checked }))}
                  className="size-4 accent-primary"
                />
                Protocolo ativo
              </label>
            )}

            {/* Implant (D0 only) */}
            {currentStage === 'D0' && (
              <div>
                <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Implante</Label>
                <Input className={fieldClass} value={formData.implant} placeholder="Marca do implante"
                  onChange={(e) => setFormData((prev) => ({ ...prev, implant: e.target.value }))} />
              </div>
            )}

            {/* ECC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">ECC</Label>
                <Input type="number" step="0.1" className={fieldClass} value={formData.ecc} placeholder="Condição corporal"
                  onChange={(e) => setFormData((prev) => ({ ...prev, ecc: e.target.value }))} />
              </div>
              {currentStage === 'DG' && (
                <div>
                  <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Novo status</Label>
                  <Select value={formData.newReproductiveStatus}
                    onValueChange={(v) => setFormData((prev) => ({ ...prev, newReproductiveStatus: v }))}>
                    <SelectTrigger className={fieldClass}><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pregnant">Prenha</SelectItem>
                      <SelectItem value="empty">Vazia</SelectItem>
                      <SelectItem value="open">Aberta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Insemination fields */}
            {currentStage === 'Insemination' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Tipo de touro</Label>
                    <Select value={formData.touroType}
                      onValueChange={(v: 'internal' | 'external') => setFormData((prev) => ({ ...prev, touroType: v, touroId: '' }))}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Interno</SelectItem>
                        <SelectItem value="external">Externo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Touro</Label>
                    <Select value={formData.touroId} onValueChange={(v) => setFormData((prev) => ({ ...prev, touroId: v }))}>
                      <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {formData.touroType === 'internal' && animals.filter(isBull).map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.manualId} — {translateCategory(a.category)}</SelectItem>
                        ))}
                        {formData.touroType === 'external' && externalBulls.map((b) => (
                          <SelectItem key={b.id} value={b.id}>{b.name} — {b.breed}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Partida</Label>
                    <Input className={fieldClass} value={formData.partida} placeholder="Código da partida"
                      onChange={(e) => setFormData((prev) => ({ ...prev, partida: e.target.value }))} />
                  </div>
                  <div>
                    <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">CIO</Label>
                    <Input className={fieldClass} value={formData.cio} placeholder="Informações do CIO"
                      onChange={(e) => setFormData((prev) => ({ ...prev, cio: e.target.value }))} />
                  </div>
                </div>
              </>
            )}

            {/* Ressinc (DG only) */}
            {currentStage === 'DG' && (
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={formData.ressinc}
                  onChange={(e) => setFormData((prev) => ({ ...prev, ressinc: e.target.checked }))}
                  className="size-4 accent-primary" />
                Ressinc
              </label>
            )}

            {/* Observations */}
            <div>
              <Label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Observações</Label>
              <Textarea className={fieldClass} value={formData.obs} placeholder="Observações..."
                onChange={(e) => setFormData((prev) => ({ ...prev, obs: e.target.value }))} />
            </div>

            <div className="flex gap-2 pt-1">
              <Button type="submit" className="flex-1">
                {editingId ? 'Atualizar Registro' : 'Confirmar Registro'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData(emptyForm); }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Records table */}
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-bold">Registros — {stageLabels[currentStage]}</h2>
              <p className="text-xs text-muted-foreground">{stageManagements.length} registros</p>
            </div>
            <button type="button" className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground">
              <Download className="size-3.5" /> Exportar
            </button>
          </div>

          {stageManagements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-muted-foreground">Nenhum registro nesta etapa</p>
              <p className="text-xs text-muted-foreground">Adicione registros pelo formulário ao lado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Animal</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Data</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ECC</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Protocolo</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Observações</th>
                    {currentStage === 'DG' && (
                      <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ressinc</th>
                    )}
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stageManagements.map((m) => {
                    const isPregnant = m.animal?.reproductiveStatus === 'pregnant';
                    return (
                      <tr key={m.id} className={`hover:bg-muted/30 transition-colors ${isPregnant ? 'opacity-60' : ''}`}>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                            {m.animal?.manualId ?? '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {format(new Date(m.date), 'dd MMM yyyy')}
                        </td>
                        <td className="px-4 py-3">
                          {m.ecc != null ? (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                              {m.ecc}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={m.protocolo ? 'default' : 'secondary'} className="text-xs">
                            {m.protocolo ? 'Sim' : 'Não'}
                          </Badge>
                        </td>
                        <td className="max-w-[140px] truncate px-4 py-3 text-xs text-muted-foreground">
                          {m.obs || '—'}
                        </td>
                        {currentStage === 'DG' && (
                          <td className="px-4 py-3 text-xs">
                            {m.ressinc ? <Badge variant="outline" className="text-xs">Sim</Badge> : '—'}
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleEdit(m)}
                            className="flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                          >
                            <Pencil className="size-3" /> Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReproductionManagementPage;
