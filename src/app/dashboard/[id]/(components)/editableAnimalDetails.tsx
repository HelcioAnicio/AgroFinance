'use client';

import { Animal, AnimalCalfLossHistory, AnimalWeightHistory, } from '@/types/animal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from 'recharts';
import { Vaccine } from '@/types/vaccine';
import { ExternalBull } from '@/types/externalBull';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Card, CardTitle } from '@/components/ui/card';
import { CardReproduction } from './isNotEditing/cardReproduction';
import { ReproductiveHistorySection } from './isNotEditing/reproductiveHistorySection';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Pencil, Plus, Trash2, Users, X } from 'lucide-react';
import { FormBasicInformation } from './isEditing/formBasicInformation';
import { FormMaleReproductive } from './isEditing/formMaleReproductive';
import { FormPevStatus } from './isEditing/formPevStatus';
import { FormPregnantStatus } from './isEditing/formPregnantStatus';
import { FormWaitingStatus } from './isEditing/formWaitingStatus';
import { InputForm } from '@/components/ui/inputForm';
import { FaCheckCircle } from 'react-icons/fa';
import { IoSkull } from 'react-icons/io5';
import { MdHighlightOff } from 'react-icons/md';
import { TbMoneybag, TbZoomQuestionFilled, TbTrashXFilled, } from 'react-icons/tb';
import { weightRecordOptions, weightRecordTypeLabel, } from '@/lib/weightHistory';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Deworming, Disease } from '@/types/sanitary';
import { useAppGlobal } from '@/context/appContext';

interface CalfLossDraft {
  confirmed: boolean | null;
  lossDate: string;
  reason: string;
  fatherType: 'internal' | 'external' | '';
  fatherId: string;
}

interface EditableAnimalDetailsProps {
  externalBulls: ExternalBull[];
  vaccines: Vaccine[];
  vaccine: Vaccine;
}

type SanitaryType = 'vaccine' | 'deworming' | 'disease';

interface SanitaryFormState {
  type: SanitaryType;
  name: string;
  description: string;
  date: string;
  expiryDate: string;
}

function categoryLabel(
  category?: string | null,
  gender?: string | null
): string {
  if (!category) return 'N/A';
  if (category === 'neonate') return 'Neonato';
  if (category === 'calf') return 'Bezerro';
  if (category === 'steer') return gender === 'male' ? 'Garrote' : 'Novilho';
  if (category === 'cow') return 'Vaca';
  if (category === 'old cow') return 'Vaca velha';
  if (category === 'ox') return 'Boi';
  if (category === 'old ox') return 'Boi Velho';
  if (category === 'bull') return 'Touro';
  if (category === 'old bull') return 'Touro velho';
  return category;
}

function getStatusNode(status?: string | null) {
  if (status === 'active' || status === 'ativo') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
        <FaCheckCircle className="size-3" /> Ativo
      </span>
    );
  }
  if (status === 'inactive' || status === 'inativo') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
        <MdHighlightOff className="size-3" /> Inativo
      </span>
    );
  }
  if (status === 'dead' || status === 'morto') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
        <IoSkull className="size-3" /> Morto
      </span>
    );
  }
  if (status === 'lost') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
        <TbZoomQuestionFilled className="size-3" /> Perdido
      </span>
    );
  }
  if (status === 'trash') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
        <TbTrashXFilled className="size-3" /> Descarte
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
      <TbMoneybag className="size-3" /> Vendido
    </span>
  );
}

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  externalBulls,
  vaccines,
}) => {
  const [arrobaPriceLoaded, setArrobaPriceLoaded] = useState(false);
  const { animal, setAnimal } = useAppGlobal();
  const { animals } = useAppGlobal();

  const [isEditing, setIsEditing] = useState(false);
  const [openSanitaryModal, setOpenSanitaryModal] = useState(false);
  const [openGenealogyModal, setOpenGenealogyModal] = useState(false);

  // Weight history inline edit
  const [editingWeightId, setEditingWeightId] = useState<string | null>(null);
  const [editingWeightData, setEditingWeightData] = useState({
    weight: '',
    recordType: 'OTHER',
    measuredAt: '',
  });

  // Sanitary inline edit
  const [editingSanitaryId, setEditingSanitaryId] = useState<string | null>(
    null
  );
  const [editingSanitaryData, setEditingSanitaryData] = useState({
    name: '',
    description: '',
    date: '',
    expiryDate: '',
  });
  const [pricePerArroba, setPricePerArroba] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem('agrofinance_arroba_price') ?? '')
      : ''
  );
  const [carcassPercent, setCarcassPercent] = useState('100');
  const [sanitaryForm, setSanitaryForm] = useState<SanitaryFormState>({
    type: 'vaccine',
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
  });
  const [listVaccines, setListVaccines] = useState<Vaccine[]>(vaccines);
  const [listDewormings, setListDewormings] = useState<Deworming[]>(
    animal?.dewormings ?? []
  );
  const [listDiseases, setListDiseases] = useState<Disease[]>(
    animal?.diseases ?? []
  );
  const [calfLossDraft, setCalfLossDraft] = useState<CalfLossDraft>({
    confirmed: null,
    lossDate: new Date().toISOString().split('T')[0],
    reason: '',
    fatherType: '',
    fatherId: '',
  });
  const [calfLossHistories, setCalfLossHistories] = useState<
    AnimalCalfLossHistory[]
  >(animal?.calfLossHistories ?? []);
  const [pevDays, setPevDays] = useState(30);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `agrofinance_pending_form_${animal?.id}`;
    const saved = localStorage.getItem(key);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Animal;
      setAnimal(parsed);
      setIsEditing(true);
      localStorage.removeItem(key);
      toast.info(
        'Suas alterações foram restauradas. Os dados do animal foram atualizados por outro usuário — revise e salve novamente.'
      );
    } catch {
      localStorage.removeItem(key);
    }
  }, [animal?.id, setAnimal]);

  const handleLossAdded = (loss: AnimalCalfLossHistory) =>
    setCalfLossHistories((prev) =>
      [loss, ...prev].sort(
        (a, b) =>
          new Date(b.lossDate).getTime() - new Date(a.lossDate).getTime()
      )
    );
  const handleLossDeleted = (id: string) =>
    setCalfLossHistories((prev) => prev.filter((h) => h.id !== id));
  const handleLossUpdated = (loss: AnimalCalfLossHistory) =>
    setCalfLossHistories((prev) =>
      prev
        .map((h) => (h.id === loss.id ? loss : h))
        .sort(
          (a, b) =>
            new Date(b.lossDate).getTime() - new Date(a.lossDate).getTime()
        )
    );
  const router = useRouter();

  const previousReproductiveStatus = String(
    animal?.reproductiveStatus ?? ''
  ).toLowerCase();
  const currentReproductiveStatus = String(
    animal?.reproductiveStatus ?? ''
  ).toLowerCase();
  const dueDate = animal?.expectedDueDate
    ? new Date(animal?.expectedDueDate)
    : null;
  const isPevEarlyBeforeDueDate =
    currentReproductiveStatus === 'pev' &&
    dueDate != null &&
    dueDate.getTime() - Date.now() >= 1000 * 60 * 60 * 24 * 60;
  const shouldAskCalfLoss =
    previousReproductiveStatus === 'pregnant' &&
    (currentReproductiveStatus === 'empty' || isPevEarlyBeforeDueDate);

  const internalBullOptions = animals.filter(
    (item) =>
      item.gender === 'male' &&
      (item.category === 'bull' || item.category === 'old bull')
  );

  // Offspring stats
  const femaleOffspring = animal?.offspringFromMother ?? [];

  const maleOffspring = (() => {
    const all = [
      ...(animal?.offspringFromFather ?? []),
      ...(animal?.offspringFromBull ?? []),
      ...(animal?.offspringFromBullIatf ?? []),
    ];
    const seen = new Set<string>();
    return all.filter((o) => {
      if (seen.has(o.id)) return false;
      seen.add(o.id);
      return true;
    });
  })();

  const offspring = (
    animal?.gender === 'male' ? maleOffspring : femaleOffspring
  ).sort(
    (a, b) =>
      new Date(b.birthDate as unknown as string).getTime() -
      new Date(a.birthDate as unknown as string).getTime()
  );

  const totalBirths = offspring.length;
  const totalLosses = animal?.calfLossHistories?.length ?? 0;
  const totalPregnancies =
    animal?.gender === 'female'
      ? totalBirths +
        totalLosses +
        (currentReproductiveStatus === 'pregnant' ? 1 : 0)
      : maleOffspring.length;
  const efficiencyRate =
    totalPregnancies > 0
      ? ((totalBirths / totalPregnancies) * 100).toFixed(1)
      : '0.0';

  const offspringMales = offspring.filter((o) => o.gender === 'male').length;
  const offspringFemales = offspring.filter(
    (o) => o.gender === 'female'
  ).length;
  const offspringWeights = offspring
    .map((o) => Number(o.weight))
    .filter((w) => w > 0);
  const avgOffspringWeight =
    offspringWeights.length > 0
      ? (
          offspringWeights.reduce((a, b) => a + b, 0) / offspringWeights.length
        ).toFixed(0)
      : null;
  const maxOffspringWeight =
    offspringWeights.length > 0 ? Math.max(...offspringWeights) : null;
  const minOffspringWeight =
    offspringWeights.length > 0 ? Math.min(...offspringWeights) : null;
  const offspringDead = offspring.filter(
    (o) => o.status === 'dead' || o.status === 'morto'
  ).length;
  const offspringSold = offspring.filter(
    (o) => o.status === 'sold' || o.status === 'vendido'
  ).length;

  const weaningWeights = offspring.flatMap((o) =>
    (o.weightHistories ?? [])
      .filter((w) => w.recordType === 'PD')
      .map((w) => Number(w.weight))
      .filter((w) => w > 0)
  );
  const avgWeaningWeight =
    weaningWeights.length > 0
      ? (
          weaningWeights.reduce((a, b) => a + b, 0) / weaningWeights.length
        ).toFixed(0)
      : null;

  const soldWeights = offspring
    .filter((o) => o.status === 'sold' || o.status === 'vendido')
    .map((o) => Number(o.weight))
    .filter((w) => w > 0);
  const avgSaleWeight =
    soldWeights.length > 0
      ? (soldWeights.reduce((a, b) => a + b, 0) / soldWeights.length).toFixed(0)
      : null;

  const weightKg = Number(animal?.weight) || 0;
  const arrobas = weightKg / 15;
  const carcassFactor =
    Math.min(Math.max(Number(carcassPercent) || 100, 1), 100) / 100;
  const carcassArrobas = arrobas * carcassFactor;
  const priceNum = parseFloat(pricePerArroba.replace(',', '.'));
  const estimatedValue =
    !isNaN(priceNum) && priceNum > 0 ? carcassArrobas * priceNum : null;

  const sanitaryRecords = [
    ...listVaccines.map((item) => ({
      id: item.id,
      typeLabel: 'Vacina',
      name: item.name ?? 'N/A',
      description: item.description ?? null,
      date: item.date,
      expiryDate: item.expiryDate,
    })),
    ...listDewormings.map((item) => ({
      id: item.id,
      typeLabel: 'Vermifugação',
      name: item.name,
      description: null,
      date: item.date,
      expiryDate: null,
    })),
    ...listDiseases.map((item) => ({
      id: item.id,
      typeLabel: 'Doença',
      name: item.name,
      description: item.description,
      date: item.date,
      expiryDate: null,
    })),
  ].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  );

  const getWeightHistoriesWithDates = () => {
    return (animal?.weightHistories ?? [])
      .map((history) => ({
        ...history,
        measuredAt: new Date(history.measuredAt),
      }))
      .sort(
        (a, b) =>
          new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
      );
  };

  const weightGainIntervals = () => {
    const sortedHistory = getWeightHistoriesWithDates();
    return sortedHistory
      .map((current, index, list) => {
        if (index === 0) return null;
        const previous = list[index - 1];
        const timeDiff =
          new Date(current.measuredAt).getTime() -
          new Date(previous.measuredAt).getTime();
        const days = timeDiff / (1000 * 60 * 60 * 24);
        if (days <= 0) return null;
        const gain = current.weight - previous.weight;
        return { from: previous, to: current, gain, days, gmd: gain / days };
      })
      .filter(Boolean) as Array<{
      from: AnimalWeightHistory;
      to: AnimalWeightHistory;
      gain: number;
      days: number;
      gmd: number;
    }>;
  };

  const averageGmd = (() => {
    const intervals = weightGainIntervals();
    if (!intervals.length) return null;
    return intervals.reduce((sum, i) => sum + i.gmd, 0) / intervals.length;
  })();

  const PROFITABLE_GMD_THRESHOLD = 0.85;
  const gmdStatus =
    averageGmd !== null
      ? averageGmd >= PROFITABLE_GMD_THRESHOLD
        ? 'Financeiramente rentável'
        : 'Não financeiramente rentável'
      : null;
  const formattedAverageGmd =
    averageGmd !== null ? averageGmd.toFixed(3).replace('.', ',') : null;

  const breedArray = [
    'Cruzado', 'Nelore', 'Angus', 'Hereford', 'Brangus', 'Brahman', 'Tabapuã', 'Charolês',
    'Senepol', 'Simental', 'Guzerá', 'Holandesa', 'Jersey', 'Girolando', 'Gir Leiteiro',
    'Pardo-Suíço', 'Ayrshire', 'Guernsey', 'Simbrasil', 'Sindi', 'Indubrasil', 'Canchim', 'Red Poll',
  ];
  const scores = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5];

  const fetchArrobaPrice = async (silent = false) => {
    const toastId = silent ? null : toast.loading('Buscando cotação da arroba...');
    try {
      const res = await fetch('/api/arroba-price');
      const data = await res.json();
      if (toastId) toast.dismiss(toastId);
      if (data.price) {
        setPricePerArroba(String(data.price).replace('.', ','));
        if (!silent) {
          if (data.warning) {
            toast.warning(`Cotação: R$ ${data.price}/@ (${data.date}) — ${data.warning}`);
          } else {
            toast.success(`Cotação: R$ ${data.price}/@ — ${data.source} (${data.date})`);
          }
        }
      } else {
        if (!silent) toast.info('Cotação automática indisponível. Informe o preço manualmente.');
      }
    } catch {
      if (toastId) toast.dismiss(toastId);
      if (!silent) toast.error('Erro ao buscar cotação.');
    }
  };

  useEffect(() => {
    if (pricePerArroba) {
      localStorage.setItem('agrofinance_arroba_price', pricePerArroba);
    }
  }, [pricePerArroba]);

  useEffect(() => {
    if (!arrobaPriceLoaded) {
      setArrobaPriceLoaded(true);
      if (!localStorage.getItem('agrofinance_arroba_price')) {
        fetchArrobaPrice(true);
      }
    }
  }, [arrobaPriceLoaded]);

  const saveWeightHistory = async (id: string) => {
    const currentAnimal = animal;
    if (!currentAnimal) return;
    const tid = toast.loading('Salvando pesagem...');
    try {
      const res = await fetch(`/api/weight-history?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingWeightData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Pesagem atualizada.');
      setAnimal({ ...currentAnimal, weightHistories: (currentAnimal.weightHistories ?? []).map((h) => h.id === id ? { ...h, weight: Number(editingWeightData.weight), recordType: editingWeightData.recordType as AnimalWeightHistory['recordType'], measuredAt: new Date(editingWeightData.measuredAt) } : h) });
      setEditingWeightId(null);
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao salvar.');
    }
  };

  const deleteWeightHistory = async (id: string) => {
    const currentAnimal = animal;
    if (!currentAnimal) return;
    if (!window.confirm('Excluir esta pesagem?')) return;
    const tid = toast.loading('Excluindo pesagem...');
    try {
      const res = await fetch(`/api/weight-history?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Pesagem excluída.');
      setAnimal({ ...currentAnimal, weightHistories: (currentAnimal.weightHistories ?? []).filter((h) => h.id !== id) });
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao excluir.');
    }
  };

  const saveSanitary = async (id: string, type: string) => {
    const tid = toast.loading('Salvando registro sanitário...');
    try {
      const res = await fetch(`/api/sanitary?id=${id}&type=${type}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingSanitaryData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Registro atualizado.');
      const updated = data.data;
      if (type === 'vaccine') setListVaccines((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
      if (type === 'deworming') setListDewormings((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
      if (type === 'disease') setListDiseases((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
      setEditingSanitaryId(null);
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao salvar.');
    }
  };

  const deleteSanitary = async (id: string, type: string) => {
    if (!window.confirm('Excluir este registro sanitário?')) return;
    const tid = toast.loading('Excluindo...');
    try {
      const res = await fetch(`/api/sanitary?id=${id}&type=${type}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Registro excluído.');
      if (type === 'vaccine') setListVaccines((prev) => prev.filter((v) => v.id !== id));
      if (type === 'deworming') setListDewormings((prev) => prev.filter((d) => d.id !== id));
      if (type === 'disease') setListDiseases((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao excluir.');
    }
  };

  const calcLifetime = () => {
    if (!animal?.birthDate) return 'N/A';
    const birth = new Date(animal.birthDate);
    const now = new Date();
    const totalMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    const parts: string[] = [];
    if (y > 0) parts.push(`${y} ano${y > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} mês${m > 1 ? 'es' : ''}`);
    return parts.join(', ') || 'Menos de 1 mês';
  };

  const handleBack = () => router.back();

  const handleInputValues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!animal) return;
    const { name, value, type } = event.target;
    const newValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : type === 'number' || type === 'range' ? parseInt(value) : value;
    setAnimal({ ...animal, [name]: newValue } as Animal);
  };

  useEffect(() => {
    if (!animal) return;
    if (animal.gender === 'female') {
      const newAnimalState = { ...animal, andrological: null };
      if (animal.reproductiveStatus === 'empty' || animal.reproductiveStatus === 'pev') {
        Object.assign(newAnimalState, { handlingType: null, bullId: null, externalBullId: null, protocol: null, expectedDueDate: null, fetalGender: null, bullIatfId: null, externalBullIatfId: null });
      } else if (animal.reproductiveStatus === 'waiting') {
        Object.assign(newAnimalState, { expectedDueDate: null, fetalGender: null });
      }
      setAnimal(newAnimalState);
    } else if (animal.gender === 'male') {
      setAnimal({ ...animal, reproductiveStatus: null, handlingType: null, bullId: null, externalBullId: null, protocol: null, expectedDueDate: null, fetalGender: null, bullIatfId: null, externalBullIatfId: null });
    }
  }, [animal?.gender, animal?.reproductiveStatus, setAnimal]);

  useEffect(() => {
    if (!animal) return;
    if (animal.handlingType === 'naturalMating') {
      setAnimal({ ...animal, protocol: null, bullIatfId: null, externalBullIatfId: null });
    } else if (animal.handlingType === 'artificialInsemination') {
      setAnimal({ ...animal, bullId: null, externalBullId: null });
    }
  }, [animal?.handlingType, setAnimal]);

  const handleSanitaryInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSanitaryForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (formData: Animal) => {
    if (formData.status !== 'active' && !formData.statusChangeDate) {
      toast.error('Informe a data da alteração de status.');
      return;
    }
    if (shouldAskCalfLoss && calfLossDraft.confirmed === null) {
      toast.error('Informe se houve perda de cria/bezerro antes de salvar.');
      return;
    }
    if (shouldAskCalfLoss && calfLossDraft.confirmed) {
      if (!calfLossDraft.lossDate) { toast.error('Informe a data da perda.'); return; }
      if (!calfLossDraft.reason.trim()) { toast.error('Informe o motivo da perda.'); return; }
      if (!calfLossDraft.fatherType || !calfLossDraft.fatherId) { toast.error('Informe se o pai é interno ou externo e selecione o pai.'); return; }
    }

    const dataToSubmit = {
      ...formData,
      updatedAt: new Date(),
      weightRecordType: formData.weightRecordType ?? 'OTHER',
      weightRecordDate: formData.weightRecordDate ?? new Date().toISOString().split('T')[0],
      motherId: formData.motherId === 'Comercial' ? null : formData.motherId,
      fatherId: formData.fatherId || null,
      externalBullFatherId: formData.externalBullFatherId || null,
      bullId: formData.bullId || null,
      externalBullId: formData.externalBullId || null,
      bullIatfId: formData.bullIatfId || null,
      externalBullIatfId: formData.externalBullIatfId || null,
      calfLossEvent:
        shouldAskCalfLoss && calfLossDraft.confirmed
          ? { confirmed: true, lossDate: calfLossDraft.lossDate, reason: calfLossDraft.reason.trim(), fatherType: calfLossDraft.fatherType, fatherAnimalId: calfLossDraft.fatherType === 'internal' ? calfLossDraft.fatherId : null, externalBullId: calfLossDraft.fatherType === 'external' ? calfLossDraft.fatherId : null, }
          : { confirmed: false },
    };

    if (formData.reproductiveStatus === 'pev') {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + pevDays);
      dataToSubmit.pevExpiresAt = expiresAt.toISOString();
    } else {
      dataToSubmit.pevExpiresAt = null;
    }

    delete dataToSubmit.bull;
    delete dataToSubmit.offspringFromBull;
    delete dataToSubmit.bullIatfRel;
    delete dataToSubmit.offspringFromBullIatf;
    delete dataToSubmit.father;
    delete dataToSubmit.offspringFromFather;
    delete dataToSubmit.mother;
    delete dataToSubmit.offspringFromMother;
    delete dataToSubmit.owner;

    const loadingId = toast.loading('Salvando alterações...');
    try {
      try {
        const checkRes = await fetch(`/api/updateAnimals?id=${dataToSubmit.id}`);
        if (checkRes.ok) {
          const { updatedAt: serverUpdatedAt } = await checkRes.json();
          const serverTs = new Date(serverUpdatedAt).getTime();
          const localTs = new Date(animal!.updatedAt).getTime();
          if (serverTs > localTs) {
            const pendingKey = `agrofinance_pending_form_${dataToSubmit.id}`;
            localStorage.setItem(pendingKey, JSON.stringify(dataToSubmit));
            toast.dismiss(loadingId);
            toast.warning('Os dados do animal foram atualizados por outro usuário. Suas alterações foram salvas e serão restauradas após o recarregamento.');
            router.refresh();
            return;
          }
        }
      } catch { /* staleness check failed — proceed with submit */ }

      await axios.put(`/api/updateAnimals?id=${dataToSubmit.id}`, dataToSubmit, { headers: { 'Content-Type': 'application/json' } });
      toast.dismiss(loadingId);
      const savedFatherId = formData.fatherId === 'Comercial' ? null : formData.fatherId;
      const savedMotherId = formData.motherId === 'Comercial' ? null : formData.motherId;

      setAnimal({ ...animal, ...formData, father: savedFatherId ? (animals.find((a) => a.id === savedFatherId) ?? animal?.father) : undefined, mother: savedMotherId ? (animals.find((a) => a.id === savedMotherId) ?? animal?.mother) : undefined, });
      toast.success('Animal atualizado com sucesso!');
      router.refresh();
      setIsEditing(false);
    } catch {
      toast.dismiss(loadingId);
      toast.error('Ocorreu um erro ao atualizar o animal?.');
    }
  };

  const submitSanitaryRecord = async () => {
    if (!sanitaryForm.name.trim() || !sanitaryForm.date) {
      toast.error('Preencha nome e data do registro sanitário.');
      return;
    }
    const loadingId = toast.loading('Adicionando registro sanitário...');
    try {
      const response = await axios.post('/api/addSanitary', { type: sanitaryForm.type, animalId: animal?.id, name: sanitaryForm.name.trim(), description: sanitaryForm.description.trim() || null, date: sanitaryForm.date, expiryDate: sanitaryForm.expiryDate || null }, { headers: { 'Content-Type': 'application/json' } });
      const savedData = response.data?.data;
      toast.dismiss(loadingId);
      if (sanitaryForm.type === 'vaccine' && savedData) setListVaccines((prev) => [savedData as Vaccine, ...prev]);
      if (sanitaryForm.type === 'deworming' && savedData) setListDewormings((prev) => [savedData as Deworming, ...prev]);
      if (sanitaryForm.type === 'disease' && savedData) setListDiseases((prev) => [savedData as Disease, ...prev]);
      setOpenSanitaryModal(false);
      setSanitaryForm({ type: 'vaccine', name: '', description: '', date: new Date().toISOString().split('T')[0], expiryDate: '' });
      toast.success('Registro sanitário adicionado com sucesso!');
    } catch {
      toast.dismiss(loadingId);
      toast.error('Ocorreu um erro ao adicionar o registro sanitário.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este animal?')) return;
    const loadingId = toast.loading('Excluindo animal?...');
    try {
      await axios.put(`/api/delete?id=${animal?.id}`, animal, { headers: { 'Content-Type': 'application/json' } });
      toast.dismiss(loadingId);
      toast.success('Animal excluído com sucesso!');
      router.push('/dashboard');
    } catch {
      toast.dismiss(loadingId);
      toast.error('Erro ao excluir o animal?.');
    }
  };

  const sanitaryFieldClass = 'w-full border border-b border-b-primary bg-transparent outline-none';
  const animalTitle = animal?.manualId && animal.manualId.charAt(0).toUpperCase() + animal.manualId.slice(1);

  const handleNavigation = (id: string | null) => {
    if (!id) return;
    const selectedAnimal = animals.find((a) => a.id === id);
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
    }
    router.push(`/dashboard/${id}`);
  };

  const mother = animals.find((a) => a.id === animal?.motherId);
  const motherExternal = externalBulls.find((e) => e.id === animal?.motherId);
  const father = animals.find((a) => a.id === animal?.fatherId);
  const fatherExternal = externalBulls.find((e) => e.id === animal?.externalBullFatherId);

  return (
    <div className="pb-14">
      {/* ... (UI code unchanged) ... */}
      <section className="sticky top-0 z-40 bg-background">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-lg font-bold">
            {isEditing
              ? `Editar Animal: ${animalTitle}`
              : `Detalhes do animal ${animalTitle}`}
          </h1>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOpenSanitaryModal(true)}
                >
                  <Plus className="mr-1 size-4" /> Sanitário
                </Button>
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-1 size-4" /> Editar
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button size="sm" onClick={() => submitForm(animal!)}>
                  Salvar alterações
                </Button>
              </>
            )}
          </div>
        </div>
        <Separator />
      </section>

       {!isEditing && (
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-5">
          <div className="flex flex-col gap-4 min-[750px]:flex-row min-[750px]:items-stretch">
            <div className="min-w-0 rounded-2xl border bg-white p-5 shadow-sm min-[750px]:flex-[2]">
              <div className="mb-4 flex items-start justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Dados básicos
                </p>
                {getStatusNode(animal?.status)}
              </div>

              <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    ID do animal
                  </p>
                  <p className="mt-0.5 font-mono text-xl font-black text-primary">
                    {animalTitle}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Sexo
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {animal?.gender === 'male' ? 'Macho ♂' : 'Fêmea ♀'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Nascimento
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {animal?.birthDate
                      ? new Date(animal?.birthDate).toLocaleDateString('pt-BR')
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Peso atual
                  </p>
                  <p className="mt-0.5 text-xl font-black text-primary">
                    {animal?.weight}{' '}
                    <span className="text-sm font-semibold">kg</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Raça
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {animal?.breed ?? 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Categoria
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {categoryLabel(animal?.category, animal?.gender)}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-xl border bg-muted/20 p-3"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNavigation(mother?.id ?? null);
                  }}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-base">
                    ♀
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      ID Mãe
                    </p>
                    <p className="font-bold">
                      {mother
                        ? mother?.manualId.charAt(0).toUpperCase() +
                          mother?.manualId.slice(1)
                        : motherExternal
                          ? motherExternal?.name
                          : 'Comercial'}
                    </p>
                  </div>
                </div>
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-xl border bg-muted/20 p-3"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNavigation(father?.id ?? null);
                  }}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base">
                    ♂
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      ID Pai
                    </p>
                    <p className="font-bold">
                      {father
                        ? father?.manualId.charAt(0).toUpperCase() +
                          father?.manualId.slice(1)
                        : fatherExternal
                          ? fatherExternal?.name
                          : 'Comercial'}
                    </p>
                  </div>
                </div>
              </div>

              {animal?.observations && (
                <blockquote className="mt-4 rounded-xl border-l-4 border-primary/30 bg-muted/20 px-4 py-3 text-sm italic text-muted-foreground">
                  &ldquo;{animal?.observations}&rdquo;
                </blockquote>
              )}
            </div>

            <div className="hidden min-[750px]:flex min-[750px]:flex-1 min-[750px]:flex-col">
              <CardReproduction animal={animal} />
            </div>
          </div>

       </div>
      )}


      {isEditing && (
        <form className="mx-auto grid max-w-5xl grid-cols-1 gap-5 p-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div>
              <FormBasicInformation
                animal={animal!}
                setAnimal={setAnimal}
                animals={animals}
                breedArray={breedArray}
                externalBulls={externalBulls}
                handleInputValues={handleInputValues}
                scores={scores}
              />
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Dados reprodutivos
              </p>
              <section className="flex w-full max-w-sm flex-col gap-4">
                {animal?.gender === 'male' ? (
                  <FormMaleReproductive
                    animal={animal}
                    handleInputValues={handleInputValues}
                  />
                ) : (
                  <>
                    <article className="flex flex-col gap-1">
                      <label
                        className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                        htmlFor="reproductiveStatus"
                      >
                        Status reprodutivo
                      </label>
                      <select
                        name="reproductiveStatus"
                        id="reproductiveStatus"
                        className="w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary"
                        value={animal?.reproductiveStatus ?? ''}
                        onChange={handleInputValues}
                      >
                        <option disabled value=""></option>
                        <option value="empty">Vazia</option>
                        <option value="pregnant">Prenha</option>
                        <option value="waiting">Em espera</option>
                        <option value="pev">PEV</option>
                      </select>
                    </article>

                    {animal?.reproductiveStatus === 'pregnant' && (
                      <FormPregnantStatus
                        animal={animal}
                        setAnimal={setAnimal}
                        handleInputValues={handleInputValues}
                        animals={animals}
                        externalBulls={externalBulls}
                      />
                    )}
                    {animal?.reproductiveStatus === 'waiting' && (
                      <FormWaitingStatus
                        animal={animal}
                        setAnimal={setAnimal}
                        handleInputValues={handleInputValues}
                        animals={animals}
                        externalBulls={externalBulls}
                      />
                    )}
                    {animal?.reproductiveStatus === 'pev' && (
                      <FormPevStatus
                        animal={animal}
                        handleInputValues={handleInputValues}
                        animals={animals}
                        pevDays={pevDays}
                        onPevDaysChange={setPevDays}
                      />
                    )}

                    {shouldAskCalfLoss && (
                      <Card className="mt-4 border-amber-500 px-3 py-4">
                        <CardTitle className="mb-3 text-sm">
                          Houve perda de cria/bezerro?
                        </CardTitle>
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="calfLossConfirmed"
                                checked={calfLossDraft.confirmed === true}
                                onChange={() =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    confirmed: true,
                                  }))
                                }
                              />
                              Sim
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="calfLossConfirmed"
                                checked={calfLossDraft.confirmed === false}
                                onChange={() =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    confirmed: false,
                                  }))
                                }
                              />
                              Não
                            </label>
                          </div>

                          {calfLossDraft.confirmed && (
                            <>
                              <InputForm
                                htmlFor="lossDate"
                                label="Data da perda:"
                                type="date"
                                name="lossDate"
                                id="lossDate"
                                value={calfLossDraft.lossDate}
                                onChange={(e) =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    lossDate: e.target.value,
                                  }))
                                }
                              />
                              <InputForm
                                htmlFor="lossReason"
                                label="Motivo da perda:"
                                type="text"
                                name="lossReason"
                                id="lossReason"
                                value={calfLossDraft.reason}
                                onChange={(e) =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    reason: e.target.value,
                                  }))
                                }
                              />
                              <article className="flex flex-col gap-1">
                                <label
                                  className="text-secondary"
                                  htmlFor="fatherType"
                                >
                                  Pai da cria:
                                </label>
                                <select
                                  id="fatherType"
                                  className="w-36 border border-b border-b-primary bg-transparent outline-none"
                                  value={calfLossDraft.fatherType}
                                  onChange={(e) =>
                                    setCalfLossDraft((prev) => ({
                                      ...prev,
                                      fatherType: e.target.value as
                                        | 'internal'
                                        | 'external'
                                        | '',
                                      fatherId: '',
                                    }))
                                  }
                                >
                                  <option value=""></option>
                                  <option value="internal">
                                    Animal da fazenda
                                  </option>
                                  <option value="external">
                                    Touro externo
                                  </option>
                                </select>
                              </article>
                              {calfLossDraft.fatherType === 'internal' && (
                                <article className="flex flex-col gap-1">
                                  <label
                                    className="text-secondary"
                                    htmlFor="fatherInternalId"
                                  >
                                    Selecione o pai interno:
                                  </label>
                                  <select
                                    id="fatherInternalId"
                                    className="w-full max-w-52 border border-b border-b-primary bg-transparent outline-none"
                                    value={calfLossDraft.fatherId}
                                    onChange={(e) =>
                                      setCalfLossDraft((prev) => ({
                                        ...prev,
                                        fatherId: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value=""></option>
                                    {internalBullOptions.map((bull) => (
                                      <option key={bull.id} value={bull.id}>
                                        Touro {bull.manualId}
                                      </option>
                                    ))}
                                  </select>
                                </article>
                              )}
                              {calfLossDraft.fatherType === 'external' && (
                                <article className="flex flex-col gap-1">
                                  <label
                                    className="text-secondary"
                                    htmlFor="fatherExternalId"
                                  >
                                    Selecione o pai externo:
                                  </label>
                                  <select
                                    id="fatherExternalId"
                                    className="w-full max-w-52 border border-b border-b-primary bg-transparent outline-none"
                                    value={calfLossDraft.fatherId}
                                    onChange={(e) =>
                                      setCalfLossDraft((prev) => ({
                                        ...prev,
                                        fatherId: e.target.value,
                                      }))
                                    }
                                  >
                                    <option value=""></option>
                                    {externalBulls.map((bull) => (
                                      <option key={bull.id} value={bull.id}>
                                        {bull.name}
                                      </option>
                                    ))}
                                  </select>
                                </article>
                              )}
                            </>
                          )}
                        </div>
                      </Card>
                    )}
                  </>
                )}
              </section>
            </div>

            {/* Fattening */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Engorda
              </p>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isForFattening"
                  checked={!!animal?.isForFattening}
                  onChange={handleInputValues}
                  className="size-4 rounded border-input accent-primary"
                />
                <span className="text-sm font-medium">Animal de engorda</span>
              </label>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Quando marcado, o GMD (Ganho de Massa Diária) será exibido na
                ficha do animal?.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-foreground p-5 text-primary-foreground shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                Resumo da Ficha
              </p>
              {/* ... (UI code unchanged) ... */}
            </div>

            {offspring.length > 0 && (
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-bold">
                  Filhos ({offspring.length})
                </h3>
                {/* ... (UI code unchanged) ... */}
              </div>
            )}
          </div>
        </form>
      )}

      {/* ... (Modals unchanged) ... */}
    </div>
  );
};

export default EditableAnimalDetails;
