'use client';

import { Animal, AnimalWeightHistory } from '@/types/animal';
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
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Plus, Trash2, Users } from 'lucide-react';
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
import { weightRecordTypeLabel } from '@/lib/weightHistory';
import {
  buildExternalBullValue,
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
  animal,
  animals,
  externalBulls,
  vaccines,
}) => {
  const [arrobaPriceLoaded, setArrobaPriceLoaded] = useState(false);
  const [allDataForm, setAllDataForm] = useState<Animal>({
    ...animal,
    bullId: animal.externalBullId
      ? buildExternalBullValue(animal.externalBullId)
      : animal.bullId,
    bullIatfId: animal.externalBullIatfId
      ? buildExternalBullValue(animal.externalBullIatfId)
      : animal.bullIatfId,
    weightRecordType: 'OTHER',
    weightRecordDate: new Date().toISOString().split('T')[0],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openSanitaryModal, setOpenSanitaryModal] = useState(false);
  const [openGenealogyModal, setOpenGenealogyModal] = useState(false);
  const [pricePerArroba, setPricePerArroba] = useState<string>(() =>
    typeof window !== 'undefined'
      ? (localStorage.getItem('agrofinance_arroba_price') ?? '')
      : ''
  );
  const [sanitaryForm, setSanitaryForm] = useState<SanitaryFormState>({
    type: 'vaccine',
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
  });
  const [listVaccines, setListVaccines] = useState<Vaccine[]>(vaccines);
  const [listDewormings, setListDewormings] = useState<Deworming[]>(
    animal.dewormings ?? []
  );
  const [listDiseases, setListDiseases] = useState<Disease[]>(
    animal.diseases ?? []
  );
  const [calfLossDraft, setCalfLossDraft] = useState<CalfLossDraft>({
    confirmed: null,
    lossDate: new Date().toISOString().split('T')[0],
    reason: '',
    fatherType: '',
    fatherId: '',
  });
  const router = useRouter();

  const previousReproductiveStatus = String(
    animal.reproductiveStatus ?? ''
  ).toLowerCase();
  const currentReproductiveStatus = String(
    allDataForm.reproductiveStatus ?? ''
  ).toLowerCase();
  const dueDate = allDataForm.expectedDueDate
    ? new Date(allDataForm.expectedDueDate)
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
  const femaleOffspring = allDataForm?.offspringFromMother ?? [];

  // For males: union of all sire relationships
  const maleOffspring = (() => {
    const all = [
      ...(allDataForm?.offspringFromFather ?? []),
      ...(allDataForm?.offspringFromBull ?? []),
      ...(allDataForm?.offspringFromBullIatf ?? []),
    ];
    const seen = new Set<string>();
    return all.filter((o) => {
      if (seen.has(o.id)) return false;
      seen.add(o.id);
      return true;
    });
  })();

  const offspring =
    allDataForm.gender === 'male' ? maleOffspring : femaleOffspring;

  const totalBirths = offspring.length;
  const totalLosses = allDataForm?.calfLossHistories?.length ?? 0;
  const totalPregnancies =
    allDataForm.gender === 'female'
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

  // Estimated value calculation
  const weightKg = Number(allDataForm.weight) || 0;
  const arrobas = weightKg / 15;
  const priceNum = parseFloat(pricePerArroba.replace(',', '.'));
  const estimatedValue =
    !isNaN(priceNum) && priceNum > 0 ? arrobas * priceNum : null;

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
    return (allDataForm.weightHistories ?? [])
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

  const calcLifetime = () => {
    if (!allDataForm.birthDate) return 'N/A';
    const birth = new Date(allDataForm.birthDate);
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
    const { name, value, type } = event.target;
    const newValue =
      type === 'number' || type === 'range' ? parseInt(value) : value;
    setAllDataForm((prev) => ({ ...prev, [name]: newValue }));
  };

  useEffect(() => {
    if (allDataForm.gender === 'female') {
      setAllDataForm((prev) => ({ ...prev, andrological: null }));
      if (allDataForm.reproductiveStatus === 'empty') {
        setAllDataForm((prev) => ({
          ...prev,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        }));
        return;
      }
      if (allDataForm.reproductiveStatus === 'waiting') {
        setAllDataForm((prev) => ({
          ...prev,
          expectedDueDate: null,
          fetalGender: null,
        }));
        return;
      }
      if (allDataForm.reproductiveStatus === 'pev') {
        setAllDataForm((prev) => ({
          ...prev,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        }));
      }
    }
    if (allDataForm.gender === 'male') {
      setAllDataForm((prev) => ({
        ...prev,
        reproductiveStatus: null,
        handlingType: null,
        bullId: null,
        externalBullId: null,
        protocol: null,
        expectedDueDate: null,
        fetalGender: null,
        bullIatfId: null,
        externalBullIatfId: null,
      }));
    }
  }, [allDataForm.gender, allDataForm.reproductiveStatus]);

  useEffect(() => {
    if (allDataForm.handlingType === 'naturalMating') {
      setAllDataForm((prev) => ({
        ...prev,
        protocol: null,
        bullIatfId: null,
        externalBullIatfId: null,
      }));
    }
    if (allDataForm.handlingType === 'artificialInsemination') {
      setAllDataForm((prev) => ({
        ...prev,
        bullId: null,
        externalBullId: null,
      }));
    }
  }, [allDataForm.handlingType]);

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

    const dataToSubmit = {
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
      await axios.put(
        `/api/updateAnimals?id=${dataToSubmit.id}`,
        dataToSubmit,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.dismiss(loadingId);
      const savedFatherId =
        formData.fatherId === 'Comercial' ? null : formData.fatherId;
      const savedMotherId =
        formData.motherId === 'Comercial' ? null : formData.motherId;
      setAllDataForm((prev) => ({
        ...prev,
        ...formData,
        father: savedFatherId
          ? (animals.find((a) => a.id === savedFatherId) ?? prev.father)
          : undefined,
        mother: savedMotherId
          ? (animals.find((a) => a.id === savedMotherId) ?? prev.mother)
          : undefined,
      }));
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
          animalId: allDataForm.id,
          name: sanitaryForm.name.trim(),
          description: sanitaryForm.description.trim() || null,
          date: sanitaryForm.date,
          expiryDate: sanitaryForm.expiryDate || null,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const savedData = response.data?.data;
      toast.dismiss(loadingId);
      if (sanitaryForm.type === 'vaccine' && savedData)
        setListVaccines((prev) => [savedData as Vaccine, ...prev]);
      if (sanitaryForm.type === 'deworming' && savedData)
        setListDewormings((prev) => [savedData as Deworming, ...prev]);
      if (sanitaryForm.type === 'disease' && savedData)
        setListDiseases((prev) => [savedData as Disease, ...prev]);
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
      await axios.put(`/api/delete?id=${allDataForm.id}`, allDataForm, {
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
    'w-full border border-b border-b-primary bg-transparent outline-none';
  const animalTitle =
    allDataForm.manualId.charAt(0).toUpperCase() +
    allDataForm.manualId.slice(1);

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
                <Button size="sm" onClick={() => submitForm(allDataForm)}>
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
          {/* Row 1: DADOS BÁSICOS (2/3) + DADOS REPRODUTIVOS (1/3) */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* DADOS BÁSICOS */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2">
              <div className="mb-4 flex items-start justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Dados básicos
                </p>
                {getStatusNode(allDataForm.status)}
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
                    {allDataForm.gender === 'male' ? 'Macho ♂' : 'Fêmea ♀'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Nascimento
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {allDataForm.birthDate
                      ? new Date(allDataForm.birthDate).toLocaleDateString(
                          'pt-BR'
                        )
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Peso atual
                  </p>
                  <p className="mt-0.5 text-xl font-black text-primary">
                    {allDataForm.weight}{' '}
                    <span className="text-sm font-semibold">kg</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Raça
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {allDataForm.breed ?? 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Categoria
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {categoryLabel(allDataForm.category, allDataForm.gender)}
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
                      {allDataForm.mother?.manualId
                        ? allDataForm.mother.manualId.charAt(0).toUpperCase() +
                          allDataForm.mother.manualId.slice(1)
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
                      {allDataForm.father?.manualId
                        ? allDataForm.father.manualId.charAt(0).toUpperCase() +
                          allDataForm.father.manualId.slice(1)
                        : 'Comercial'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Observations */}
              {allDataForm.observations && (
                <blockquote className="mt-4 rounded-xl border-l-4 border-primary/30 bg-muted/20 px-4 py-3 text-sm italic text-muted-foreground">
                  &ldquo;{allDataForm.observations}&rdquo;
                </blockquote>
              )}
            </div>

            {/* DADOS REPRODUTIVOS */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Dados reprodutivos
                </p>
                {allDataForm.gender === 'female' ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Status reprodutivo
                      </p>
                      <span className="mt-1.5 inline-flex items-center rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {allDataForm.reproductiveStatus === 'pregnant'
                          ? 'Prenha'
                          : allDataForm.reproductiveStatus === 'empty'
                            ? 'Vazia'
                            : allDataForm.reproductiveStatus === 'waiting'
                              ? 'Em espera'
                              : allDataForm.reproductiveStatus === 'pev'
                                ? 'PEV'
                                : (allDataForm.reproductiveStatus ?? 'N/A')}
                      </span>
                    </div>
                    {allDataForm.handlingType && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Manejo utilizado
                        </p>
                        <p className="mt-0.5 font-semibold">
                          {allDataForm.handlingType === 'naturalMating'
                            ? '🐂 Monta natural'
                            : '🔬 Inseminação artificial'}
                        </p>
                      </div>
                    )}
                    {allDataForm.expectedDueDate && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Previsão de parto
                        </p>
                        <p className="mt-0.5 font-semibold">
                          {new Date(
                            allDataForm.expectedDueDate
                          ).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Exame andrológico
                    </p>
                    <p className="mt-0.5 font-semibold">
                      {allDataForm.andrological ? 'Aprovado' : 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {/* Estimated value (view mode) */}
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Valor estimado
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peso</span>
                    <span className="font-semibold">{weightKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrobas</span>
                    <span className="font-semibold">
                      {arrobas.toFixed(1)} @
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="R$/@ ex: 320,00"
                      value={pricePerArroba}
                      onChange={(e) => setPricePerArroba(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border px-2.5 py-1.5 text-xs outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => fetchArrobaPrice()}
                      className="shrink-0 rounded-lg border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
                    >
                      Buscar
                    </button>
                  </div>
                  {estimatedValue !== null && (
                    <div className="rounded-lg bg-primary/5 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Estimado
                      </p>
                      <p className="text-lg font-black text-primary">
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
          </div>

          {/* Offspring */}
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

          {/* Reproduction + efficiency */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CardReproduction allDataForm={allDataForm as Animal} />

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold">Eficiência reprodutiva</h2>
              {allDataForm.gender === 'male' ? (
                <div className="grid grid-cols-2 gap-3">
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
                <div className="grid grid-cols-2 gap-3">
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
          </div>

          {/* Weight history + GMD */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-3 font-bold">Histórico de peso</h2>
              {allDataForm.weightHistories?.length ? (
                <div className="space-y-2">
                  {allDataForm.weightHistories.map((h: AnimalWeightHistory) => (
                    <div
                      key={h.id}
                      className="grid grid-cols-3 rounded-lg bg-muted/20 px-3 py-2 text-sm"
                    >
                      <span>{weightRecordTypeLabel(h.recordType)}</span>
                      <span className="font-semibold text-primary">
                        {h.weight} kg
                      </span>
                      <span className="text-right text-muted-foreground">
                        {new Date(h.measuredAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum histórico de peso registrado.
                </p>
              )}
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
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
          </div>

          {/* Calf loss history + Sanitary records side by side */}
          <div
            className={`grid grid-cols-1 gap-4 ${(allDataForm.calfLossHistories?.length ?? 0) > 0 ? 'lg:grid-cols-2' : ''}`}
          >
            {/* Sanitary records */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h2 className="mb-3 font-bold">Registros sanitários</h2>
              {sanitaryRecords.length > 0 ? (
                <div className="space-y-2">
                  {sanitaryRecords.map((r) => (
                    <div
                      key={`${r.typeLabel}-${r.id}`}
                      className="rounded-xl bg-muted/20 px-3 py-3 text-sm"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {r.typeLabel}
                        </span>
                        <span className="font-semibold">{r.name}</span>
                      </div>
                      {r.description && (
                        <p className="text-xs text-muted-foreground">
                          {r.description}
                        </p>
                      )}
                      <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                        <span>
                          {r.date
                            ? new Date(r.date).toLocaleDateString('pt-BR')
                            : 'N/A'}
                        </span>
                        {r.expiryDate && (
                          <span>
                            Vence:{' '}
                            {new Date(r.expiryDate).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum registro sanitário cadastrado.
                </p>
              )}
            </div>

            {/* Calf loss history */}
            {(allDataForm.calfLossHistories?.length ?? 0) > 0 && (
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="mb-3 font-bold">Histórico de perda de cria</h2>
                <div className="space-y-2">
                  {allDataForm.calfLossHistories?.map((h) => (
                    <div
                      key={h.id}
                      className="rounded-xl bg-muted/20 px-3 py-3 text-sm"
                    >
                      <p>
                        <strong>Data:</strong>{' '}
                        {new Date(h.lossDate).toLocaleDateString('pt-BR')}
                      </p>
                      <p>
                        <strong>Motivo:</strong> {h.reason || 'N/A'}
                      </p>
                      <p>
                        <strong>Pai:</strong>{' '}
                        {h.fatherType === 'external'
                          ? `Externo — ${h.externalBull?.name ?? 'N/A'}`
                          : `Interno — ${h.fatherAnimal?.manualId ?? 'N/A'}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                allDataForm={allDataForm}
                handleInputValues={handleInputValues}
                animal={animal as Animal}
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
                {allDataForm.gender === 'male' ? (
                  <FormMaleReproductive
                    allDataForm={allDataForm}
                    handleInputValues={handleInputValues}
                    animal={animal as Animal}
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
                        value={allDataForm.reproductiveStatus ?? ''}
                        onChange={handleInputValues}
                      >
                        <option disabled value=""></option>
                        <option value="empty">Vazia</option>
                        <option value="pregnant">Prenha</option>
                        <option value="waiting">Em espera</option>
                        <option value="pev">PEV</option>
                      </select>
                    </article>

                    {allDataForm.reproductiveStatus === 'pregnant' && (
                      <FormPregnantStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animal={animal as Animal}
                        animals={animals}
                        externalBulls={externalBulls}
                      />
                    )}
                    {allDataForm.reproductiveStatus === 'waiting' && (
                      <FormWaitingStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animal={animal as Animal}
                        animals={animals}
                        externalBulls={externalBulls}
                      />
                    )}
                    {allDataForm.reproductiveStatus === 'pev' && (
                      <FormPevStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animals={animals}
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
          </div>

          {/* Right: GENEALOGIA + RESUMO DA FICHA */}
          <div className="space-y-4">
            {/* Genealogia */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Genealogia
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    ID Mãe (Matriz)
                  </p>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border bg-muted/20 px-3 py-2 text-sm">
                    <span className="text-pink-500">♀</span>
                    <span className="font-semibold">
                      {allDataForm.mother?.manualId
                        ? allDataForm.mother.manualId.charAt(0).toUpperCase() +
                          allDataForm.mother.manualId.slice(1)
                        : 'Comercial'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    ID Pai (Reprodutor)
                  </p>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border bg-muted/20 px-3 py-2 text-sm">
                    <span className="text-blue-500">♂</span>
                    <span className="font-semibold">
                      {allDataForm.father?.manualId
                        ? allDataForm.father.manualId.charAt(0).toUpperCase() +
                          allDataForm.father.manualId.slice(1)
                        : 'Comercial'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
                      {arrobas.toFixed(1)}@ × R$ {priceNum.toFixed(2)}/@
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Relatório de filhos — {animalTitle}</DialogTitle>
            <DialogDescription>
              Estatísticas de todos os filhos registrados para este animal.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
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
              <div className="rounded-xl border-l-4 border-green-400 bg-muted/30 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Peso médio
                </p>
                <p className="text-2xl font-black text-green-600">
                  {avgOffspringWeight ? `${avgOffspringWeight} kg` : 'N/A'}
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
            </div>

            {/* Offspring list */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Listagem
              </p>
              <div className="max-h-48 space-y-2 overflow-y-auto">
                {offspring.map((child) => (
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
                    <div className="flex items-center gap-3">
                      <span>{child.weight} kg</span>
                      {getStatusNode(child.status)}
                    </div>
                  </div>
                ))}
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

            {(['vaccine', 'deworming', 'disease'] as SanitaryType[]).map(
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
