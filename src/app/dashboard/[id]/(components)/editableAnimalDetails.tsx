'use client';

import {
  Animal,
  AnimalCalfLossHistory,
  AnimalWeightHistory,
} from '@/types/animal';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
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
import {
  TbMoneybag,
  TbZoomQuestionFilled,
  TbTrashXFilled,
} from 'react-icons/tb';
import {
  weightRecordOptions,
  weightRecordTypeLabel,
} from '@/lib/weightHistory';
import {
  extractExternalBullId,
  isExternalBullValue,
} from '@/lib/externalBull';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  animal: Animal;
  animals: Animal[];
  externalBulls: ExternalBull[];
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
  animal: initialAnimal,
  animals: initialAnimals,
  externalBulls,
}) => {
  const [arrobaPriceLoaded, setArrobaPriceLoaded] = useState(false);
  const {
    animal,
    setAnimal,
    animals,
    setAnimals,
    setOriginalAnimal,
    setOriginalAnimals,
  } = useAppGlobal();

  useEffect(() => {
    setAnimal(initialAnimal);
    setAnimals(initialAnimals);
    setOriginalAnimal(initialAnimal);
    setOriginalAnimals(initialAnimals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAnimal, initialAnimals]);

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
  const [carcassPercent, setCarcassPercent] = useState('50');
  const [sanitaryForm, setSanitaryForm] = useState<SanitaryFormState>({
    type: 'vaccine',
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
  });
  const [listVaccines, setListVaccines] = useState<Vaccine[]>([]);
  const [listDewormings, setListDewormings] = useState<Deworming[]>([]);
  const [listDiseases, setListDiseases] = useState<Disease[]>([]);
  const [calfLossDraft, setCalfLossDraft] = useState<CalfLossDraft>({
    confirmed: null,
    lossDate: new Date().toISOString().split('T')[0],
    reason: '',
    fatherType: '',
    fatherId: '',
  });
  const [calfLossHistories, setCalfLossHistories] = useState<
    AnimalCalfLossHistory[]
  >([]);
  const [pevDays, setPevDays] = useState(30);

  useEffect(() => {
    if (animal) {
      setListVaccines(animal.vaccines ?? []);
      setListDewormings(animal.dewormings ?? []);
      setListDiseases(animal.diseases ?? []);
      setCalfLossHistories(animal.calfLossHistories ?? []);
    }
  }, [animal]);

  // Restore form from localStorage if a pending save was interrupted by a stale-data reload
  useEffect(() => {
    if (typeof window === 'undefined' || !animal?.id) return;
    const key = `agrofinance_pending_form_${animal.id}`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal?.id]);

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

  // For males: union of all sire relationships
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

  // Average weaning weight (PD records across all offspring)
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

  // Average sale weight (current weight of sold offspring)
  const soldWeights = offspring
    .filter((o) => o.status === 'sold' || o.status === 'vendido')
    .map((o) => Number(o.weight))
    .filter((w) => w > 0);
  const avgSaleWeight =
    soldWeights.length > 0
      ? (soldWeights.reduce((a, b) => a + b, 0) / soldWeights.length).toFixed(0)
      : null;

  // Estimated value calculation
  const weightKg = Number(animal?.weight) || 0;
  const arrobas = weightKg / 15;
  const carcassFactor =
    Math.min(Math.max(Number(carcassPercent) || 100, 1), 100) / 100;
  const carcassArrobas = arrobas * carcassFactor;
  const priceNum = parseFloat(pricePerArroba.replace(',', '.'));
  const estimatedValue =
    !isNaN(priceNum) && priceNum > 0 ? carcassArrobas * priceNum : null;

  // Sanitary records
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

  // Weight history
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
    'Cruzado',
    'Nelore',
    'Angus',
    'Hereford',
    'Brangus',
    'Brahman',
    'Tabapuã',
    'Charolês',
    'Senepol',
    'Simental',
    'Guzerá',
    'Holandesa',
    'Jersey',
    'Girolando',
    'Gir Leiteiro',
    'Pardo-Suíço',
    'Ayrshire',
    'Guernsey',
    'Simbrasil',
    'Sindi',
    'Indubrasil',
    'Canchim',
    'Red Poll',
  ];
  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];

  const fetchArrobaPrice = async (silent = false) => {
    const toastId = silent
      ? null
      : toast.loading('Buscando cotação da arroba...');
    try {
      const res = await fetch('/api/arroba-price');
      const data = await res.json();
      if (toastId) toast.dismiss(toastId);
      if (data.price) {
        setPricePerArroba(String(data.price).replace('.', ','));
        if (!silent) {
          if (data.warning) {
            toast.warning(
              `Cotação: R$ ${data.price}/@ (${data.date}) — ${data.warning}`
            );
          } else {
            toast.success(
              `Cotação: R$ ${data.price}/@ — ${data.source} (${data.date})`
            );
          }
        }
      } else {
        if (!silent)
          toast.info(
            'Cotação automática indisponível. Informe o preço manualmente.'
          );
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

  // Auto-categorize when birthDate or gender changes (mirrors cardFormMain logic)
  useEffect(() => {
    if (!animal?.birthDate) return;
    const birth = new Date(animal?.birthDate);
    const today = new Date();
    const ageInMonths =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth()) +
      (today.getDate() < birth.getDate() ? -1 : 0);

    const gender = animal?.gender;
    const currentCategory = animal?.category;
    const isCurrentlyReproductive =
      currentCategory === 'bull' || currentCategory === 'old bull';

    let newCategory: string;
    if (ageInMonths <= 3) {
      newCategory = 'neonate';
    } else if (ageInMonths <= 12) {
      newCategory = 'calf';
    } else if (ageInMonths <= 24) {
      newCategory = 'steer';
    } else if (ageInMonths <= 36) {
      newCategory = gender === 'male' ? 'steer' : 'cow';
    } else if (ageInMonths <= 120) {
      if (gender === 'male') {
        newCategory = isCurrentlyReproductive ? 'bull' : 'ox';
      } else {
        newCategory = 'cow';
      }
    } else {
      if (gender === 'male') {
        newCategory = isCurrentlyReproductive ? 'old bull' : 'old ox';
      } else {
        newCategory = 'old cow';
      }
    }

    if (currentCategory !== newCategory) {
      setAnimal({ ...animal, category: newCategory });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal?.birthDate, animal?.gender]);

  useEffect(() => {
    if (!arrobaPriceLoaded) {
      setArrobaPriceLoaded(true);
      // Only try auto-fetch if no saved price exists
      if (!localStorage.getItem('agrofinance_arroba_price')) {
        fetchArrobaPrice(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveWeightHistory = async (id: string) => {
    const currentAnimal = animal;
    if (!currentAnimal) return;
    const tid = toast.loading('Salvando pesagem...');
    try {
      const res = await fetch(`/api/weight-history?id=${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingWeightData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Pesagem atualizada.');
      setAnimal({
        ...currentAnimal,
        weightHistories: (currentAnimal.weightHistories ?? []).map((h) =>
          h.id === id
            ? {
                ...h,
                weight: Number(editingWeightData.weight),
                recordType:
                  editingWeightData.recordType as AnimalWeightHistory['recordType'],
                measuredAt: new Date(editingWeightData.measuredAt),
              }
            : h
        ),
      });
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
      const res = await fetch(`/api/weight-history?id=${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error((await res.json()).error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Pesagem excluída.');
      setAnimal({
        ...currentAnimal,
        weightHistories: (currentAnimal.weightHistories ?? []).filter(
          (h) => h.id !== id
        ),
      });
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao excluir.');
    }
  };

  const saveSanitary = async (id: string, type: string) => {
    const tid = toast.loading('Salvando registro sanitário...');
    try {
      const res = await fetch(`/api/sanitary?id=${id}&type=${type}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingSanitaryData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Registro atualizado.');
      const updated = data.data;
      if (animal && updated) {
        if (type === 'vaccine') {
          setAnimal({
            ...animal,
            vaccines: (animal.vaccines ?? []).map((v) =>
              v.id === id ? { ...v, ...updated } : v
            ),
          });
        } else if (type === 'deworming') {
          setAnimal({
            ...animal,
            dewormings: (animal.dewormings ?? []).map((d) =>
              d.id === id ? { ...d, ...updated } : d
            ),
          });
        } else if (type === 'disease') {
          setAnimal({
            ...animal,
            diseases: (animal.diseases ?? []).map((d) =>
              d.id === id ? { ...d, ...updated } : d
            ),
          });
        }
      }
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
      const res = await fetch(`/api/sanitary?id=${id}&type=${type}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error((await res.json()).error ?? 'Erro');
      toast.dismiss(tid);
      toast.success('Registro excluído.');
      if (animal) {
        if (type === 'vaccine') {
          setAnimal({
            ...animal,
            vaccines: (animal.vaccines ?? []).filter((v) => v.id !== id),
          });
        } else if (type === 'deworming') {
          setAnimal({
            ...animal,
            dewormings: (animal.dewormings ?? []).filter((d) => d.id !== id),
          });
        } else if (type === 'disease') {
          setAnimal({
            ...animal,
            diseases: (animal.diseases ?? []).filter((d) => d.id !== id),
          });
        }
      }
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : 'Erro ao excluir.');
    }
  };

  const calcLifetime = () => {
    if (!animal?.birthDate) return 'N/A';
    const birth = new Date(animal?.birthDate);
    const now = new Date();
    const totalMonths =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    const parts: string[] = [];
    if (y > 0) parts.push(`${y} ano${y > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} mês${m > 1 ? 'es' : ''}`);
    return parts.join(', ') || 'Menos de 1 mês';
  };

  const handleBack = () => router.back();

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!animal) return;
    const { name, value, type } = event.target;
    const newValue =
      type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : value;
    setAnimal({ ...animal, [name]: newValue });
  };

  useEffect(() => {
    if (!animal) return;
    if (animal.gender === 'female') {
      let newAnimal = { ...animal, andrological: null };
      if (animal.reproductiveStatus === 'empty') {
        newAnimal = {
          ...newAnimal,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        };
      }
      if (animal.reproductiveStatus === 'waiting') {
        newAnimal = { ...newAnimal, expectedDueDate: null, fetalGender: null };
      }
      if (animal.reproductiveStatus === 'pev') {
        newAnimal = {
          ...newAnimal,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        };
      }
      setAnimal(newAnimal);
    } else if (animal.gender === 'male') {
      setAnimal({
        ...animal,
        reproductiveStatus: null,
        handlingType: null,
        bullId: null,
        externalBullId: null,
        protocol: null,
        expectedDueDate: null,
        fetalGender: null,
        bullIatfId: null,
        externalBullIatfId: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal?.gender, animal?.reproductiveStatus]);

  useEffect(() => {
    if (!animal) return;
    if (animal.handlingType === 'naturalMating') {
      setAnimal({
        ...animal,
        protocol: null,
        bullIatfId: null,
        externalBullIatfId: null,
      });
    }
    if (animal.handlingType === 'artificialInsemination') {
      setAnimal({
        ...animal,
        bullId: null,
        externalBullId: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal?.handlingType]);

  const handleSanitaryInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      if (!calfLossDraft.lossDate) {
        toast.error('Informe a data da perda.');
        return;
      }
      if (!calfLossDraft.reason.trim()) {
        toast.error('Informe o motivo da perda.');
        return;
      }
      if (!calfLossDraft.fatherType || !calfLossDraft.fatherId) {
        toast.error('Informe se o pai é interno ou externo e selecione o pai.');
        return;
      }
    }

    const dataToSubmit: any = {
      ...formData,
      updatedAt: new Date(),
      weightRecordType: formData.weightRecordType ?? 'OTHER',
      weightRecordDate:
        formData.weightRecordDate ?? new Date().toISOString().split('T')[0],
      motherId: formData.motherId === 'Comercial' ? null : formData.motherId,
      fatherId: formData.fatherId === 'Comercial' ? null : formData.fatherId,
      bullId:
        formData.bullId === 'comercial' ||
        formData.bullId === 'Comercial' ||
        isExternalBullValue(formData.bullId)
          ? null
          : formData.bullId,
      bullIatfId:
        formData.bullIatfId === 'comercial' ||
        formData.bullIatfId === 'Comercial' ||
        isExternalBullValue(formData.bullIatfId)
          ? null
          : formData.bullIatfId,
      externalBullId:
        formData.bullId === 'comercial' || formData.bullId === 'Comercial'
          ? null
          : extractExternalBullId(formData.bullId),
      externalBullIatfId:
        formData.bullIatfId === 'comercial' ||
        formData.bullIatfId === 'Comercial'
          ? null
          : extractExternalBullId(formData.bullIatfId),
      calfLossEvent:
        shouldAskCalfLoss && calfLossDraft.confirmed
          ? {
              confirmed: true,
              lossDate: calfLossDraft.lossDate,
              reason: calfLossDraft.reason.trim(),
              fatherType: calfLossDraft.fatherType,
              fatherAnimalId:
                calfLossDraft.fatherType === 'internal'
                  ? calfLossDraft.fatherId
                  : null,
              externalBullId:
                calfLossDraft.fatherType === 'external'
                  ? calfLossDraft.fatherId
                  : null,
            }
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
      // Staleness check
      try {
        const checkRes = await fetch(
          `/api/updateAnimals?id=${dataToSubmit.id}`
        );
        if (checkRes.ok) {
          const { updatedAt: serverUpdatedAt } = await checkRes.json();
          const serverTs = new Date(serverUpdatedAt).getTime();
          const localTs = new Date(animal!.updatedAt).getTime();
          if (serverTs > localTs) {
            localStorage.setItem(
              `agrofinance_pending_form_${dataToSubmit.id}`,
              JSON.stringify(dataToSubmit)
            );
            toast.dismiss(loadingId);
            toast.warning(
              'Os dados do animal foram atualizados por outro usuário. Suas alterações foram salvas e serão restauradas após o recarregamento.'
            );
            router.refresh();
            return;
          }
        }
      } catch {
        // non-critical, proceed with submit
      }

      await axios.put(
        `/api/updateAnimals?id=${dataToSubmit.id}`,
        dataToSubmit,
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.dismiss(loadingId);
      const savedFatherId =
        formData.fatherId === 'Comercial' ? null : formData.fatherId;
      const savedMotherId =
        formData.motherId === 'Comercial' ? null : formData.motherId;
      setAnimal({
        ...animal,
        ...formData,
        father: savedFatherId
          ? animals.find((a) => a.id === savedFatherId) ?? animal?.father
          : undefined,
        mother: savedMotherId
          ? animals.find((a) => a.id === savedMotherId) ?? animal?.mother
          : undefined,
      });
      toast.success('Animal atualizado com sucesso!');
      router.refresh();
      setIsEditing(false);
    } catch {
      toast.dismiss(loadingId);
      toast.error('Ocorreu um erro ao atualizar o animal.');
    }
  };

  const submitSanitaryRecord = async () => {
    if (!sanitaryForm.name.trim() || !sanitaryForm.date) {
      toast.error('Preencha nome e data do registro sanitário.');
      return;
    }
    const loadingId = toast.loading('Adicionando registro sanitário...');
    try {
      const response = await axios.post(
        '/api/addSanitary',
        {
          type: sanitaryForm.type,
          animalId: animal?.id,
          name: sanitaryForm.name.trim(),
          description: sanitaryForm.description.trim() || null,
          date: sanitaryForm.date,
          expiryDate: sanitaryForm.expiryDate || null,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const savedData = response.data?.data;
      toast.dismiss(loadingId);
      if (animal && savedData) {
        if (sanitaryForm.type === 'vaccine') {
          setAnimal({
            ...animal,
            vaccines: [savedData, ...(animal.vaccines ?? [])],
          });
        } else if (sanitaryForm.type === 'deworming') {
          setAnimal({
            ...animal,
            dewormings: [savedData, ...(animal.dewormings ?? [])],
          });
        } else if (sanitaryForm.type === 'disease') {
          setAnimal({
            ...animal,
            diseases: [savedData, ...(animal.diseases ?? [])],
          });
        }
      }
      setOpenSanitaryModal(false);
      setSanitaryForm({
        type: 'vaccine',
        name: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        expiryDate: '',
      });
      toast.success('Registro sanitário adicionado com sucesso!');
    } catch {
      toast.dismiss(loadingId);
      toast.error('Ocorreu um erro ao adicionar o registro sanitário.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este animal?')) return;
    const loadingId = toast.loading('Excluindo animal...');
    try {
      await axios.put(`/api/delete?id=${animal?.id}`, animal, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.dismiss(loadingId);
      toast.success('Animal excluído com sucesso!');
      router.push('/dashboard');
    } catch {
      toast.dismiss(loadingId);
      toast.error('Erro ao excluir o animal.');
    }
  };

  const sanitaryFieldClass =
    'w-full border-b border-b-primary bg-transparent outline-none';
  if (!animal) return null; // Or a loading/error state
  const animalTitle =
    animal.manualId.charAt(0).toUpperCase() + animal.manualId.slice(1);

  return (
    <div className="pb-14">
      {/* Top bar */}
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

      {/* VIEW MODE */}
      {!isEditing && (
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-5">
          {/* Row 1: DADOS BÁSICOS | CardReproduction — side by side ≥750px */}
          <div className="flex flex-col gap-4 min-[750px]:flex-row min-[750px]:items-stretch">
            {/* DADOS BÁSICOS */}
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

              {/* ID Mãe + ID Pai */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-base">
                    ♀
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      ID Mãe
                    </p>
                    <p className="font-bold">
                      {animal?.mother?.manualId
                        ? animal?.mother.manualId.charAt(0).toUpperCase() +
                          animal?.mother.manualId.slice(1)
                        : 'Comercial'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base">
                    ♂
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      ID Pai
                    </p>
                    <p className="font-bold">
                      {animal?.externalBullFather
                        ? `Ex. ${animal.externalBullFather.name}`
                        : animal?.father?.manualId
                          ? animal.father.manualId.charAt(0).toUpperCase() +
                            animal.father.manualId.slice(1)
                          : 'Comercial'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Observations */}
              {animal?.observations && (
                <blockquote className="mt-4 rounded-xl border-l-4 border-primary/30 bg-muted/20 px-4 py-3 text-sm italic text-muted-foreground">
                  &ldquo;{animal?.observations}&rdquo;
                </blockquote>
              )}
            </div>

            {/* CardReproduction — desktop ≥750px only */}
            <div className="hidden min-[750px]:flex min-[750px]:flex-1 min-[750px]:flex-col">
              <CardReproduction animal={animal} />
            </div>
          </div>

          {/* Row 2 mobile: CardReproduction | VALOR ESTIMADO — equal height */}
          <div className="flex items-stretch gap-4 min-[750px]:hidden">
            <div className="min-w-0 flex-1">
              <CardReproduction animal={animal} />
            </div>
            <div className="min-w-0 flex-1 rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Valor estimado
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso</span>
                  <span className="font-semibold">{weightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Arrobas brutas</span>
                  <span className="font-semibold">{arrobas.toFixed(1)} @</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-xs text-muted-foreground">
                    % Carcaça
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={carcassPercent}
                    onChange={(e) => setCarcassPercent(e.target.value)}
                    className="w-14 rounded-lg border px-2 py-1 text-xs outline-none focus:border-primary"
                  />
                  <span className="text-xs text-muted-foreground">
                    → {carcassArrobas.toFixed(1)} @
                  </span>
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="R$/@"
                    value={pricePerArroba}
                    onChange={(e) => setPricePerArroba(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border px-2 py-1.5 text-xs outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => fetchArrobaPrice()}
                    className="shrink-0 rounded-lg border border-primary/40 bg-primary/5 px-2 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
                  >
                    Buscar
                  </button>
                </div>
                {estimatedValue !== null && (
                  <div className="rounded-lg bg-primary/5 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Estimado
                    </p>
                    <p className="text-base font-black text-primary">
                      {estimatedValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VALOR ESTIMADO — desktop ≥750px only */}
          <div className="hidden min-[750px]:block">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Valor estimado
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Peso:</span>
                  <span className="font-semibold">{weightKg} kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Arrobas brutas:</span>
                  <span className="font-semibold">{arrobas.toFixed(1)} @</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-xs text-muted-foreground">
                    % Carcaça
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={carcassPercent}
                    onChange={(e) => setCarcassPercent(e.target.value)}
                    className="w-16 rounded-lg border px-2 py-1 text-xs outline-none focus:border-primary"
                  />
                  <span className="text-xs text-muted-foreground">
                    → {carcassArrobas.toFixed(1)} @
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="R$/@ ex: 320,00"
                    value={pricePerArroba}
                    onChange={(e) => setPricePerArroba(e.target.value)}
                    className="w-36 rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => fetchArrobaPrice()}
                    className="shrink-0 rounded-lg border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
                  >
                    Buscar preço
                  </button>
                </div>
                {estimatedValue !== null && (
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Estimado:
                    </span>
                    <span className="text-lg font-black text-primary">
                      {estimatedValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filhos */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold">
                  Filhos{' '}
                  <span className="text-muted-foreground">(Offspring)</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Linhagem direta e registros de sucessão
                </p>
              </div>
              {offspring.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOpenGenealogyModal(true)}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  <Users className="size-3.5" />
                  Ver Genealogia Completa
                </button>
              )}
            </div>

            {offspring.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum filho registrado.
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {offspring.map((child) => {
                  const childStatus = child.status ?? '';
                  const statusLabel =
                    childStatus === 'active' || childStatus === 'ativo'
                      ? 'Ativo'
                      : childStatus === 'inactive' || childStatus === 'inativo'
                        ? 'Inativo'
                        : childStatus === 'dead' || childStatus === 'morto'
                          ? 'Morto'
                          : childStatus === 'sold' || childStatus === 'vendido'
                            ? 'Vendido'
                            : childStatus === 'lost'
                              ? 'Perdido'
                              : childStatus === 'trash'
                                ? 'Descarte'
                                : 'N/A';
                  const isActive =
                    childStatus === 'active' || childStatus === 'ativo';
                  return (
                    <Link
                      key={child.id}
                      href={`/dashboard/${child.id}`}
                      className="min-w-[150px] shrink-0 rounded-xl border bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span
                          className={`text-xl font-bold ${child.gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`}
                        >
                          {child.gender === 'male' ? '♂' : '♀'}
                        </span>
                        <span
                          className={`flex items-center gap-1 text-[10px] font-bold uppercase ${isActive ? 'text-green-600' : 'text-muted-foreground'}`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                          />
                          {statusLabel}
                        </span>
                      </div>
                      <p className="font-mono text-lg font-black text-foreground">
                        {child.manualId.charAt(0).toUpperCase() +
                          child.manualId.slice(1)}
                      </p>
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">Sexo:</span>
                          <span className="font-semibold">
                            {child.gender === 'male' ? 'Macho' : 'Fêmea'}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">Peso:</span>
                          <span className="font-bold text-primary">
                            {child.weight} Kg
                          </span>
                        </div>
                        {(() => {
                          const pdRecord = child.weightHistories?.find(
                            (w) => w.recordType === 'PD'
                          );
                          return pdRecord ? (
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Desmama:
                              </span>
                              <span className="font-bold text-amber-600">
                                {pdRecord.weight} Kg
                              </span>
                            </div>
                          ) : null;
                        })()}
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">Cat:</span>
                          <span className="font-semibold text-green-700">
                            {categoryLabel(child.category, child.gender)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Eficiência reprodutiva — full width */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-bold">Eficiência reprodutiva</h2>
            {animal?.gender === 'male' ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: 'Filhos registrados',
                    value: maleOffspring.length,
                    color: 'border-purple-400',
                  },
                  {
                    label: 'Nascimentos',
                    value: totalBirths,
                    color: 'border-green-400',
                  },
                  {
                    label: 'Perdas',
                    value: totalLosses,
                    color: 'border-red-400',
                  },
                  {
                    label: 'Eficiência',
                    value:
                      maleOffspring.length > 0 ? `${efficiencyRate}%` : '—',
                    color: 'border-primary',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border-l-4 ${item.color} bg-muted/20 px-3 py-2`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-xl font-black text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: 'Prenhezes',
                    value: totalPregnancies,
                    color: 'border-purple-400',
                  },
                  {
                    label: 'Nascimentos',
                    value: totalBirths,
                    color: 'border-green-400',
                  },
                  {
                    label: 'Perdas',
                    value: totalLosses,
                    color: 'border-red-400',
                  },
                  {
                    label: 'Eficiência',
                    value: `${efficiencyRate}%`,
                    color: 'border-primary',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border-l-4 ${item.color} bg-muted/20 px-3 py-2`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-xl font-black text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Histórico Reprodutivo — full width, females only */}
          {animal?.gender === 'female' && (
            <ReproductiveHistorySection
              offspringFromMother={femaleOffspring}
              calfLossHistories={calfLossHistories}
              animals={animals}
              externalBulls={externalBulls}
              animalId={animal?.id}
              onLossAdded={handleLossAdded}
              onLossDeleted={handleLossDeleted}
              onLossUpdated={handleLossUpdated}
            />
          )}

          {/* Histórico de Peso + Registros Sanitários */}
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[250px] flex-1 rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-3 font-bold">Histórico de peso</h2>
              {animal?.weightHistories?.length ? (
                <div className="space-y-2">
                  {animal?.weightHistories.map((h: AnimalWeightHistory) => {
                    const isEditingThis = editingWeightId === h.id;
                    return (
                      <div
                        key={h.id}
                        className="rounded-lg bg-muted/20 px-3 py-2 text-sm"
                      >
                        {isEditingThis ? (
                          <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                  Peso (kg)
                                </label>
                                <input
                                  type="number"
                                  value={editingWeightData.weight}
                                  onChange={(e) =>
                                    setEditingWeightData((p) => ({
                                      ...p,
                                      weight: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                  Tipo
                                </label>
                                <select
                                  value={editingWeightData.recordType}
                                  onChange={(e) =>
                                    setEditingWeightData((p) => ({
                                      ...p,
                                      recordType: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                >
                                  {weightRecordOptions.map((o) => (
                                    <option key={o.value} value={o.value}>
                                      {o.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                  Data
                                </label>
                                <input
                                  type="date"
                                  value={editingWeightData.measuredAt}
                                  onChange={(e) =>
                                    setEditingWeightData((p) => ({
                                      ...p,
                                      measuredAt: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveWeightHistory(h.id)}
                                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                              >
                                <Check className="size-3" /> Salvar
                              </button>
                              <button
                                onClick={() => setEditingWeightId(null)}
                                className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
                              >
                                <X className="size-3" /> Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold">
                                {weightRecordTypeLabel(h.recordType)}
                              </span>
                              <div className="flex shrink-0 items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingWeightId(h.id);
                                    setEditingWeightData({
                                      weight: String(h.weight),
                                      recordType: h.recordType ?? 'OTHER',
                                      measuredAt: new Date(h.measuredAt)
                                        .toISOString()
                                        .split('T')[0],
                                    });
                                  }}
                                  className="rounded p-1 text-muted-foreground hover:bg-white hover:text-primary"
                                  title="Editar"
                                >
                                  <Pencil className="size-3" />
                                </button>
                                <button
                                  onClick={() => deleteWeightHistory(h.id)}
                                  className="rounded p-1 text-muted-foreground hover:bg-white hover:text-red-500"
                                  title="Excluir"
                                >
                                  <Trash2 className="size-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex gap-3 text-xs text-muted-foreground">
                              <span>
                                {new Date(h.measuredAt).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </span>
                              <span className="font-semibold text-primary">
                                {h.weight} kg
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum histórico de peso registrado.
                </p>
              )}

              {animal?.isForFattening &&
                animal?.weightHistories &&
                animal?.weightHistories.length >= 2 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Curva de peso
                    </p>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart
                        data={[...animal.weightHistories]
                          .sort(
                            (a, b) =>
                              new Date(a.measuredAt).getTime() -
                              new Date(b.measuredAt).getTime()
                          )
                          .map((h) => ({
                            data: new Date(h.measuredAt).toLocaleDateString(
                              'pt-BR',
                              { day: '2-digit', month: '2-digit' }
                            ),
                            peso: Number(h.weight),
                          }))}
                        margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="data" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          formatter={(v) => [`${v} kg`, 'Peso']}
                          contentStyle={{ fontSize: 12 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="peso"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
            </div>

            {animal?.isForFattening && (
              <div className="min-w-[250px] flex-1 rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="mb-3 font-bold">GMD — Ganho de massa diária</h2>
                {formattedAverageGmd !== null ? (
                  <div className="space-y-3">
                    <div className="rounded-xl border-l-4 border-primary bg-muted/20 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        GMD médio
                      </p>
                      <p className="text-2xl font-black text-primary">
                        {formattedAverageGmd}{' '}
                        <span className="text-sm">kg/dia</span>
                      </p>
                    </div>
                    <div
                      className={`rounded-xl border-l-4 ${averageGmd && averageGmd >= PROFITABLE_GMD_THRESHOLD ? 'border-green-400' : 'border-red-400'} bg-muted/20 px-3 py-2`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Situação
                      </p>
                      <p
                        className={`font-semibold ${averageGmd && averageGmd >= PROFITABLE_GMD_THRESHOLD ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {gmdStatus}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        GMD ideal: acima de 0,850 kg/dia
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Registre pelo menos duas pesagens para calcular o GMD.
                  </p>
                )}
              </div>
            )}

            {/* Sanitary records */}
            <div className="min-w-[250px] flex-1 rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-3 font-bold">Registros sanitários</h2>
              {sanitaryRecords.length > 0 ? (
                <div className="space-y-2">
                  {sanitaryRecords.map((r) => {
                    const rawType =
                      r.typeLabel === 'Vacina'
                        ? 'vaccine'
                        : r.typeLabel === 'Vermifugação'
                          ? 'deworming'
                          : 'disease';
                    const hasExpiry = rawType === 'vaccine';
                    const isEditingThis = editingSanitaryId === r.id;
                    return (
                      <div
                        key={`${r.typeLabel}-${r.id}`}
                        className="rounded-xl bg-muted/20 px-3 py-3 text-sm"
                      >
                        {isEditingThis ? (
                          <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="col-span-2">
                                <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                  Nome
                                </label>
                                <input
                                  type="text"
                                  value={editingSanitaryData.name}
                                  onChange={(e) =>
                                    setEditingSanitaryData((p) => ({
                                      ...p,
                                      name: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                />
                              </div>
                              {rawType !== 'deworming' && (
                                <div className="col-span-2">
                                  <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                    Descrição
                                  </label>
                                  <input
                                    type="text"
                                    value={editingSanitaryData.description}
                                    onChange={(e) =>
                                      setEditingSanitaryData((p) => ({
                                        ...p,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                  />
                                </div>
                              )}
                              <div>
                                <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                  Data
                                </label>
                                <input
                                  type="date"
                                  value={editingSanitaryData.date}
                                  onChange={(e) =>
                                    setEditingSanitaryData((p) => ({
                                      ...p,
                                      date: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                />
                              </div>
                              {hasExpiry && (
                                <div>
                                  <label className="text-[10px] font-semibold uppercase text-muted-foreground">
                                    Vencimento
                                  </label>
                                  <input
                                    type="date"
                                    value={editingSanitaryData.expiryDate}
                                    onChange={(e) =>
                                      setEditingSanitaryData((p) => ({
                                        ...p,
                                        expiryDate: e.target.value,
                                      }))
                                    }
                                    className="w-full rounded border border-input px-2 py-1 text-xs outline-none focus:border-primary"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveSanitary(r.id, rawType)}
                                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                              >
                                <Check className="size-3" /> Salvar
                              </button>
                              <button
                                onClick={() => setEditingSanitaryId(null)}
                                className="flex items-center gap-1 rounded-lg border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
                              >
                                <X className="size-3" /> Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold">{r.name}</span>
                              <div className="flex shrink-0 items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingSanitaryId(r.id);
                                    setEditingSanitaryData({
                                      name: r.name,
                                      description: r.description ?? '',
                                      date: r.date
                                        ? new Date(r.date)
                                            .toISOString()
                                            .split('T')[0]
                                        : '',
                                      expiryDate: r.expiryDate
                                        ? new Date(r.expiryDate)
                                            .toISOString()
                                            .split('T')[0]
                                        : '',
                                    });
                                  }}
                                  className="rounded p-1 text-muted-foreground hover:bg-white hover:text-primary"
                                  title="Editar"
                                >
                                  <Pencil className="size-3" />
                                </button>
                                <button
                                  onClick={() => deleteSanitary(r.id, rawType)}
                                  className="rounded p-1 text-muted-foreground hover:bg-white hover:text-red-500"
                                  title="Excluir"
                                >
                                  <Trash2 className="size-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                              <span>
                                {r.date
                                  ? new Date(r.date).toLocaleDateString('pt-BR')
                                  : 'N/A'}
                              </span>
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                {r.typeLabel}
                              </span>
                              {r.description && <span>{r.description}</span>}
                              {r.expiryDate && (
                                <span>
                                  Vence:{' '}
                                  {new Date(r.expiryDate).toLocaleDateString(
                                    'pt-BR'
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum registro sanitário cadastrado.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <form className="mx-auto grid max-w-5xl grid-cols-1 gap-5 p-4 lg:grid-cols-3">
          {/* Left: form fields — 2 cols */}
          <div className="space-y-4 lg:col-span-2">
            <div>
              <FormBasicInformation
                animal={animal!}
                setAnimal={setAnimal}
                handleInputValues={handleInputValues}
                externalBulls={externalBulls}
                animals={animals}
                breedArray={breedArray}
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
                        setAnimal={setAnimal}
                        animal={animal}
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
                ficha do animal.
              </p>
            </div>
          </div>

          {/* Right: RESUMO DA FICHA */}
          <div className="space-y-4">
            {/* RESUMO DA FICHA — dark green card */}
            <div className="rounded-2xl bg-foreground p-5 text-primary-foreground shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
                Resumo da Ficha
              </p>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60">
                    Tempo de Vida
                  </p>
                  <p className="mt-0.5 font-bold">{calcLifetime()}</p>
                </div>
                <div className="border-b border-white/10 pb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60">
                    Peso / Arrobas
                  </p>
                  <p className="mt-0.5 font-bold">
                    {weightKg} kg &nbsp;/&nbsp; {arrobas.toFixed(1)} @
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/60">
                    Valor Estimado
                  </p>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-xs text-primary-foreground/60">
                      % Carcaça
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={carcassPercent}
                      onChange={(e) => setCarcassPercent(e.target.value)}
                      className="w-14 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs text-white outline-none focus:border-white/40"
                    />
                    <span className="text-xs text-primary-foreground/50">
                      → {carcassArrobas.toFixed(1)} @
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="R$/@ ex: 320,00"
                      value={pricePerArroba}
                      onChange={(e) => setPricePerArroba(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs text-white outline-none placeholder:text-white/40 focus:border-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => fetchArrobaPrice()}
                      className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-semibold hover:bg-white/20"
                    >
                      Buscar
                    </button>
                  </div>
                  <p className="mt-2 text-xl font-black">
                    {estimatedValue !== null
                      ? estimatedValue.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      : '—'}
                  </p>
                  {estimatedValue !== null && (
                    <p className="text-[10px] text-primary-foreground/50">
                      {carcassArrobas.toFixed(1)}@ × R${' '}
                      {priceNum.toFixed(2)}/@
                    </p>
                  )}
                </div>
              </div>
            </div>

            {offspring.length > 0 && (
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-bold">
                  Filhos ({offspring.length})
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {offspring.map((child) => (
                    <Link
                      key={child.id}
                      href={`/dashboard/${child.id}`}
                      className="min-w-[110px] shrink-0 rounded-lg border bg-muted/30 p-2 text-xs transition hover:bg-muted/60"
                    >
                      <p className="font-mono font-bold text-primary">
                        {child.manualId.charAt(0).toUpperCase() +
                          child.manualId.slice(1)}
                      </p>
                      <p className="text-muted-foreground">
                        {child.gender === 'male' ? '♂' : '♀'} {child.weight} kg
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      )}

      {/* Genealogy / offspring comparison modal */}
      <Dialog open={openGenealogyModal} onOpenChange={setOpenGenealogyModal}>
        <DialogContent className="flex max-h-[85vh] max-w-lg flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle>Relatório de filhos — {animalTitle}</DialogTitle>
            <DialogDescription>
              Estatísticas de todos os filhos registrados para este animal.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border-l-4 border-primary bg-muted/30 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Total de filhos
                </p>
                <p className="text-2xl font-black text-primary">
                  {offspring.length}
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-blue-400 bg-muted/30 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Eficiência
                </p>
                <p className="text-2xl font-black text-blue-600">
                  {efficiencyRate}%
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-sky-400 bg-muted/30 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Machos / Fêmeas
                </p>
                <p className="text-2xl font-black text-sky-600">
                  {offspringMales}♂ / {offspringFemales}♀
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-amber-400 bg-muted/30 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Peso médio desmame
                </p>
                <p className="text-2xl font-black text-amber-600">
                  {avgWeaningWeight ? `${avgWeaningWeight} kg` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">Peso máximo</p>
                <p className="font-semibold">
                  {maxOffspringWeight ? `${maxOffspringWeight} kg` : 'N/A'}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">Peso mínimo</p>
                <p className="font-semibold">
                  {minOffspringWeight ? `${minOffspringWeight} kg` : 'N/A'}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">Perdas (crias)</p>
                <p className="font-semibold">{totalLosses}</p>
              </div>
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Mortos / Vendidos
                </p>
                <p className="font-semibold">
                  {offspringDead} mortos / {offspringSold} vendidos
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Peso médio atual
                </p>
                <p className="font-semibold">
                  {avgOffspringWeight ? `${avgOffspringWeight} kg` : 'N/A'}
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">
                  Peso médio venda
                </p>
                <p className="font-semibold">
                  {avgSaleWeight ? `${avgSaleWeight} kg` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Offspring list */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Listagem
              </p>
              <div className="max-h-52 space-y-2 overflow-y-auto">
                {offspring.map((child) => {
                  const pdRecord = child.weightHistories?.find(
                    (w) => w.recordType === 'PD'
                  );
                  const isSold =
                    child.status === 'sold' || child.status === 'vendido';
                  return (
                    <div
                      key={child.id}
                      className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary">
                          {child.manualId.charAt(0).toUpperCase() +
                            child.manualId.slice(1)}
                        </span>
                        <span className="text-muted-foreground">
                          {child.gender === 'male' ? '♂' : '♀'}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 text-xs">
                        <span className="text-sm font-medium">
                          {child.weight} kg
                        </span>
                        {pdRecord && (
                          <span className="font-medium text-amber-600">
                            PD: {Number(pdRecord.weight).toFixed(0)} kg
                          </span>
                        )}
                        {isSold && (
                          <span className="font-medium text-green-600">
                            Venda: {child.weight} kg
                          </span>
                        )}
                        <div className="mt-0.5">
                          {getStatusNode(child.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpenGenealogyModal(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sanitary record modal */}
      <Dialog open={openSanitaryModal} onOpenChange={setOpenSanitaryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar registro sanitário</DialogTitle>
            <DialogDescription>
              Selecione o tipo e preencha os campos.
            </DialogDescription>
          </DialogHeader>
          <Tabs
            value={sanitaryForm.type}
            onValueChange={(value) =>
              setSanitaryForm({
                type: value as SanitaryType,
                name: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                expiryDate: '',
              })
            }
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vaccine">Vacina</TabsTrigger>
              <TabsTrigger value="deworming">Vermífugo</TabsTrigger>
              <TabsTrigger value="disease">Doença</TabsTrigger>
            </TabsList>

            {([] as SanitaryType[]).map(
              (tab) => (
                <TabsContent key={tab} value={tab} className="space-y-3">
                  <div>
                    <label className="text-secondary" htmlFor={`${tab}-name`}>
                      {tab === 'vaccine'
                        ? 'Nome da vacina'
                        : tab === 'deworming'
                          ? 'Nome do vermífugo'
                          : 'Nome da doença'}
                      :
                    </label>
                    <input
                      className={sanitaryFieldClass}
                      id={`${tab}-name`}
                      name="name"
                      value={sanitaryForm.name}
                      onChange={handleSanitaryInput}
                    />
                  </div>
                  {(tab === 'vaccine' || tab === 'disease') && (
                    <div>
                      <label
                        className="text-secondary"
                        htmlFor={`${tab}-description`}
                      >
                        Descrição:
                      </label>
                      <input
                        className={sanitaryFieldClass}
                        id={`${tab}-description`}
                        name="description"
                        value={sanitaryForm.description}
                        onChange={handleSanitaryInput}
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-secondary" htmlFor={`${tab}-date`}>
                      {tab === 'disease'
                        ? 'Data do registro'
                        : 'Data da aplicação'}
                      :
                    </label>
                    <input
                      className={sanitaryFieldClass}
                      id={`${tab}-date`}
                      type="date"
                      name="date"
                      value={sanitaryForm.date}
                      onChange={handleSanitaryInput}
                    />
                  </div>
                  {(tab === 'vaccine' || tab === 'deworming') && (
                    <div>
                      <label
                        className="text-secondary"
                        htmlFor={`${tab}-expiryDate`}
                      >
                        Data de vencimento:
                      </label>
                      <input
                        className={sanitaryFieldClass}
                        id={`${tab}-expiryDate`}
                        type="date"
                        name="expiryDate"
                        value={sanitaryForm.expiryDate}
                        onChange={handleSanitaryInput}
                      />
                    </div>
                  )}
                </TabsContent>
              )
            )}
          </Tabs>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenSanitaryModal(false)}>
              Cancelar
            </Button>
            <Button onClick={submitSanitaryRecord}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableAnimalDetails;
