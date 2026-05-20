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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardInformation } from './isNotEditing/cardInformation';
import { CardReproduction } from './isNotEditing/cardReproduction';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
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

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  animal,
  animals,
  externalBulls,
  vaccines,
}) => {
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
  const totalBirths = allDataForm?.offspringFromMother?.length ?? 0;
  const totalLosses = allDataForm?.calfLossHistories?.length ?? 0;
  const totalPregnancies =
    totalBirths +
    totalLosses +
    (currentReproductiveStatus === 'pregnant' ? 1 : 0);
  const efficiencyRate =
    totalPregnancies > 0
      ? ((totalBirths / totalPregnancies) * 100).toFixed(1)
      : '0.0';
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

  const PROFITABLE_GMD_THRESHOLD = 0.85;

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
        return {
          from: previous,
          to: current,
          gain,
          days,
          gmd: gain / days,
        };
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
    const total = intervals.reduce((sum, interval) => sum + interval.gmd, 0);
    return total / intervals.length;
  })();

  const gmdStatus =
    averageGmd !== null
      ? averageGmd >= PROFITABLE_GMD_THRESHOLD
        ? 'rentável financeiramente'
        : 'não financeiramente rentável'
      : null;

  const formattedAverageGmd =
    averageGmd !== null ? averageGmd.toFixed(3).replace('.', ',') : null;

  const handleBack = () => {
    router.back();
  };

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const newValue =
      type === 'number' || type === 'range' ? parseInt(value) : value;

    setAllDataForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    if (allDataForm.gender === 'female') {
      setAllDataForm((prevData) => ({
        ...prevData,
        andrological: null,
      }));

      if (allDataForm.reproductiveStatus === 'empty') {
        setAllDataForm((prevData) => ({
          ...prevData,
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
        setAllDataForm((prevData) => ({
          ...prevData,
          expectedDueDate: null,
          fetalGender: null,
        }));
        return;
      }

      if (allDataForm.reproductiveStatus === 'pev') {
        setAllDataForm((prevData) => ({
          ...prevData,
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
      setAllDataForm((prevData) => ({
        ...prevData,
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
      setAllDataForm((prevData) => ({
        ...prevData,
        protocol: null,
        bullIatfId: null,
        externalBullIatfId: null,
      }));
      return;
    }

    if (allDataForm.handlingType === 'artificialInsemination') {
      setAllDataForm((prevData) => ({
        ...prevData,
        bullId: null,
        externalBullId: null,
      }));
      return;
    }
  }, [allDataForm.handlingType]);

  const handleSanitaryInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSanitaryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (allDataForm: Animal) => {
    if (allDataForm.status !== 'active' && !allDataForm.statusChangeDate) {
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
        toast.error('Informe se o pai e interno ou externo e selecione o pai.');
        return;
      }
    }

    const dataToSubmit = {
      ...allDataForm,
      updatedAt: new Date(),
      weightRecordType: allDataForm.weightRecordType ?? 'OTHER',
      weightRecordDate:
        allDataForm.weightRecordDate ?? new Date().toISOString().split('T')[0],
      motherId:
        allDataForm.motherId === 'Comercial' ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === 'Comercial' ? null : allDataForm.fatherId,
      bullId:
        allDataForm.bullId === 'comercial' ||
        allDataForm.bullId === 'Comercial' ||
        isExternalBullValue(allDataForm.bullId)
          ? null
          : allDataForm.bullId,
      bullIatfId:
        allDataForm.bullIatfId === 'comercial' ||
        allDataForm.bullIatfId === 'Comercial' ||
        isExternalBullValue(allDataForm.bullIatfId)
          ? null
          : allDataForm.bullIatfId,
      externalBullId:
        allDataForm.bullId === 'comercial' || allDataForm.bullId === 'Comercial'
          ? null
          : extractExternalBullId(allDataForm.bullId),
      externalBullIatfId:
        allDataForm.bullIatfId === 'comercial' ||
        allDataForm.bullIatfId === 'Comercial'
          ? null
          : extractExternalBullId(allDataForm.bullIatfId),
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

    try {
      const response = await axios.put(
        `/api/updateAnimals?id=${dataToSubmit.id}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const savedFatherId =
        allDataForm.fatherId === 'Comercial' ? null : allDataForm.fatherId;
      const savedMotherId =
        allDataForm.motherId === 'Comercial' ? null : allDataForm.motherId;
      setAllDataForm((prev) => ({
        ...prev,
        ...allDataForm,
        father: savedFatherId
          ? (animals.find((a) => a.id === savedFatherId) ?? prev.father)
          : undefined,
        mother: savedMotherId
          ? (animals.find((a) => a.id === savedMotherId) ?? prev.mother)
          : undefined,
      }));

      setTimeout(() => {
        toast.success('Animal atualizado com sucesso!');
        router.refresh();
        setIsEditing(!isEditing);
      }, 2000);
      animal = allDataForm;

      return response;
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar o animal.');
      return error;
    }
  };

  const submitSanitaryRecord = async () => {
    if (!sanitaryForm.name.trim() || !sanitaryForm.date) {
      toast.error('Preencha nome e data do registro sanitário.');
      return;
    }

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
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const savedData = response.data?.data;
      if (sanitaryForm.type === 'vaccine' && savedData) {
        setListVaccines((prev) => [savedData as Vaccine, ...prev]);
      }
      if (sanitaryForm.type === 'deworming' && savedData) {
        setListDewormings((prev) => [savedData as Deworming, ...prev]);
      }
      if (sanitaryForm.type === 'disease' && savedData) {
        setListDiseases((prev) => [savedData as Disease, ...prev]);
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
      return response;
    } catch (error) {
      toast.error('Ocorreu um erro ao adicionar o registro sanitário.');
      return error;
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      try {
        await axios.put(`/api/delete?id=${allDataForm.id}`, allDataForm, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        router.push('/dashboard');
        setTimeout(() => {
          toast.success('Animal excluído com sucesso!');
        }, 4000);
      } catch {
        toast.error('Erro ao excluir o animal.');
      }
    }
  };

  const sanitaryFieldClass =
    'w-full border border-b border-b-primary bg-transparent outline-none';

  return (
    <div className="pb-14">
      <section className="sticky top-0 z-40 bg-background">
        <div className="flex items-start justify-between gap-2 px-2 py-3 sm:items-center">
          <button onClick={handleBack}>
            <ArrowLeft />
          </button>
          <h1 className="w-full max-w-32 text-center text-xl sm:max-w-none">
            Detalhes do animal{' '}
            {allDataForm?.manualId.charAt(0).toUpperCase() +
              allDataForm?.manualId.slice(1)}
          </h1>
          <div className="flex items-start gap-3 sm:items-center lg:gap-10">
            {isEditing === false ? (
              <>
                <button className="mt-2 sm:mt-0" onClick={handleDelete}>
                  <Trash2 className="text-red-500" />
                </button>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-10">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="order-1 gap-1 px-3 sm:order-2"
                  >
                    <Pencil className="size-4" />
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenSanitaryModal(true)}
                    className="order-2 gap-1 px-3 sm:order-1"
                  >
                    <Plus className="size-4" />
                    Sanitário
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-5">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm(allDataForm);
                  }}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="ghost"
                  // className="bg-background text-foreground"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-foreground" />
      </section>

      {isEditing === false ? (
        <div className="m-auto grid w-full max-w-6xl grid-cols-1 gap-6 pb-10 pt-5 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardContent className="px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Última atualização do animal:{' '}
                <strong>
                  {allDataForm?.updatedAt
                    ? new Date(allDataForm.updatedAt).toLocaleString()
                    : 'N/A'}
                </strong>
              </p>
            </CardContent>
          </Card>
          <CardInformation allDataForm={allDataForm as Animal} />
          <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">Histórico de peso</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-1">
              {allDataForm.weightHistories?.length ? (
                allDataForm.weightHistories.map(
                  (history: AnimalWeightHistory) => (
                    <Card className="rounded-sm px-3 py-2" key={history.id}>
                      <div>
                        <strong>Tipo: </strong>
                        <span>{weightRecordTypeLabel(history.recordType)}</span>
                      </div>
                      <div>
                        <strong>Peso: </strong>
                        <span>{history.weight} Kg</span>
                      </div>
                      <div>
                        <strong>Data: </strong>
                        <span>
                          {new Date(history.measuredAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Card>
                  )
                )
              ) : (
                <span>Nenhum histórico de peso registrado.</span>
              )}
            </CardContent>
          </Card>
          <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">
                Ganho de massa diária (GMD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-1">
              {formattedAverageGmd !== null ? (
                <>
                  <p>
                    <strong>GMD médio:</strong> {formattedAverageGmd} Kg/dia
                  </p>
                  <p>
                    <strong>Situação financeira:</strong>{' '}
                    <span
                      className={
                        averageGmd && averageGmd >= PROFITABLE_GMD_THRESHOLD
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {gmdStatus}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Para ser financeiramente rentável, o GMD ideal deve ficar
                    acima de 0,850 Kg/dia.
                  </p>
                </>
              ) : (
                <span>
                  Registre pelo menos duas pesagens para calcular o GMD entre as
                  pesagens.
                </span>
              )}
            </CardContent>
          </Card>
          <CardReproduction allDataForm={allDataForm as Animal} />
          <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">
                Eficiência reprodutiva
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-1">
              <p>
                <strong>Prenhezes:</strong> {totalPregnancies}
              </p>
              <p>
                <strong>Nascimentos:</strong> {totalBirths}
              </p>
              <p>
                <strong>Perdas:</strong> {totalLosses}
              </p>
              <p>
                <strong>Eficiência:</strong> {efficiencyRate}%
              </p>
            </CardContent>
          </Card>
          <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">
                Histórico de perda de cria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-1">
              {allDataForm.calfLossHistories?.length ? (
                allDataForm.calfLossHistories.map((history) => (
                  <Card key={history.id} className="rounded-sm px-3 py-2">
                    <p>
                      <strong>Data:</strong>{' '}
                      {new Date(history.lossDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Data:</strong>{' '}
                      {new Date(history.lossDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Motivo:</strong> {history.reason || 'N/A'}
                    </p>
                    <p>
                      <strong>Origem do pai:</strong>{' '}
                      {history.fatherType === 'external'
                        ? 'Externo'
                        : 'Interno'}
                    </p>
                    <p>
                      <strong>Pai:</strong>{' '}
                      {history.fatherType === 'external'
                        ? (history.externalBull?.name ?? 'N/A')
                        : (history.fatherAnimal?.manualId ?? 'N/A')}
                    </p>
                  </Card>
                ))
              ) : (
                <span>Nenhuma perda registrada.</span>
              )}
            </CardContent>
          </Card>
          <Card className="flex w-full max-w-lg flex-col gap-3 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">Filhos</CardTitle>
            </CardHeader>
            <CardContent className="px-1">
              <div className="flex flex-wrap items-center gap-2">
                {allDataForm?.offspringFromMother?.map((offspring) => (
                  <Link href={`/dashboard/${offspring.id}`} key={offspring.id}>
                    <Card className="flex w-max flex-col rounded-sm px-3 py-1">
                      <div className="flex gap-2">
                        <strong>Status: </strong>
                        <span className="flex w-max items-center gap-1">
                          {offspring?.status === 'active' ||
                          offspring?.status === 'ativo' ? (
                            <>
                              <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                              Ativo
                            </>
                          ) : offspring?.status === 'inactive' ||
                            offspring?.status === 'inativo' ? (
                            <>
                              <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                              Inativo
                            </>
                          ) : offspring?.status === 'dead' ||
                            offspring?.status === 'morto' ? (
                            <>
                              <IoSkull className="inline-block size-3 text-black" />{' '}
                              Morto
                            </>
                          ) : offspring?.status === 'lost' ? (
                            <>
                              <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" />{' '}
                              Perdida
                            </>
                          ) : offspring?.status === 'trash' ? (
                            <>
                              <TbTrashXFilled className="inline-block size-3 text-red-500" />{' '}
                              Descarte
                            </>
                          ) : (
                            <>
                              <TbMoneybag className="inline-block size-3 text-yellow-600" />{' '}
                              Vendido
                            </>
                          )}
                        </span>
                      </div>
                      <div>
                        <strong>Id: </strong>
                        <span>
                          {offspring.manualId.charAt(0).toUpperCase() +
                            offspring.manualId.slice(1)}{' '}
                        </span>
                      </div>
                      <div>
                        <strong>Sexo: </strong>
                        <span>
                          {offspring.gender === 'male' ? 'Macho' : 'Fêmea'}
                        </span>
                      </div>
                      <div>
                        <strong>Peso: </strong>
                        <span>{offspring.weight} Kg</span>
                      </div>
                      <div>
                        <strong>Categoria: </strong>
                        <span>
                          {offspring?.category
                            ? offspring?.category === 'neonate'
                              ? 'Neonato'
                              : offspring?.category === 'calf'
                                ? 'Bezerro'
                                : offspring?.category === 'steer' &&
                                    offspring?.gender === 'male'
                                  ? 'Garrote'
                                  : offspring?.category === 'steer' &&
                                      offspring?.gender === 'female'
                                    ? 'Novilho'
                                    : offspring?.category === 'cow'
                                      ? 'Vaca'
                                      : offspring?.category === 'old cow'
                                        ? 'Vaca velha'
                                        : offspring?.category === 'ox'
                                          ? 'Boi'
                                          : offspring?.category === 'old ox'
                                            ? 'Boi Velho'
                                            : offspring?.category === 'bull'
                                              ? 'Touro'
                                              : 'Touro velho'
                            : 'N/A'}
                        </span>{' '}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
            {/* <Button>Comparar peso dos filhos</Button> */}
          </Card>
        </div>
      ) : (
        <form
          action=""
          method="post"
          className="m-auto grid w-full max-w-6xl grid-cols-1 gap-5 p-3 lg:grid-cols-2"
        >
          <FormBasicInformation
            allDataForm={allDataForm}
            handleInputValues={handleInputValues}
            animal={animal as Animal}
            animals={animals}
            breedArray={breedArray}
            scores={scores}
          />

          <Card className="h-full px-2 py-7">
            <CardHeader className="py-2">
              <CardTitle className="text-base">
                Informações reprodutivas
              </CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col p-1">
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
                        className="text-secondary"
                        htmlFor="reproductiveStatus"
                      >
                        Status reprodutivo:
                      </label>
                      <select
                        name="reproductiveStatus"
                        id="reproductiveStatus"
                        className="w-32 border border-b border-b-primary bg-transparent outline-none"
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
                              Nao
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
                                onChange={(event) =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    lossDate: event.target.value,
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
                                onChange={(event) =>
                                  setCalfLossDraft((prev) => ({
                                    ...prev,
                                    reason: event.target.value,
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
                                  onChange={(event) =>
                                    setCalfLossDraft((prev) => ({
                                      ...prev,
                                      fatherType: event.target.value as
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
                                    onChange={(event) =>
                                      setCalfLossDraft((prev) => ({
                                        ...prev,
                                        fatherId: event.target.value,
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
                                    onChange={(event) =>
                                      setCalfLossDraft((prev) => ({
                                        ...prev,
                                        fatherId: event.target.value,
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
            </CardContent>
          </Card>

          <Card className="flex w-full flex-col gap-3 px-2 py-5 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Filhos</CardTitle>
            </CardHeader>
            <CardContent className="px-1">
              <div className="flex flex-wrap items-center gap-2">
                {allDataForm?.offspringFromMother?.map((offspring) => (
                  <Link href={`/dashboard/${offspring.id}`} key={offspring.id}>
                    <Card className="flex w-max flex-col rounded-sm px-3 py-1">
                      <div>
                        <strong>Status: </strong>
                        <span className="flex w-max items-center gap-1">
                          {allDataForm?.status === 'active' ||
                          allDataForm?.status === 'ativo' ? (
                            <>
                              <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                              Ativo
                            </>
                          ) : allDataForm?.status === 'inactive' ||
                            allDataForm?.status === 'inativo' ? (
                            <>
                              <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                              Inativo
                            </>
                          ) : allDataForm?.status === 'dead' ||
                            allDataForm?.status === 'morto' ? (
                            <>
                              <IoSkull className="inline-block size-3 text-black" />{' '}
                              Morto
                            </>
                          ) : allDataForm?.status === 'lost' ? (
                            <>
                              <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" />{' '}
                              Perdida
                            </>
                          ) : allDataForm?.status === 'trash' ? (
                            <>
                              <TbTrashXFilled className="inline-block size-3 text-red-500" />{' '}
                              Descarte
                            </>
                          ) : (
                            <>
                              <TbMoneybag className="inline-block size-3 text-yellow-600" />{' '}
                              Vendido
                            </>
                          )}
                        </span>
                      </div>
                      <div>
                        <strong>Id: </strong>
                        <span>
                          {offspring.manualId.charAt(0).toUpperCase() +
                            offspring.manualId.slice(1)}{' '}
                        </span>
                      </div>
                      <div>
                        <strong>Sexo: </strong>
                        <span>
                          {offspring.gender === 'male' ? 'Macho' : 'Fêmea'}
                        </span>
                      </div>
                      <div>
                        <strong>Peso: </strong>
                        <span>{offspring.weight} Kg</span>
                      </div>
                      <div>
                        <strong>Categoria: </strong>
                        <span>
                          {allDataForm?.category
                            ? allDataForm?.category === 'neonate'
                              ? 'Neonato'
                              : allDataForm?.category === 'calf'
                                ? 'Bezerro'
                                : allDataForm?.category === 'steer' &&
                                    allDataForm?.gender === 'male'
                                  ? 'Garrote'
                                  : allDataForm?.category === 'steer' &&
                                      allDataForm?.gender === 'female'
                                    ? 'Novilho'
                                    : allDataForm?.category === 'cow'
                                      ? 'Vaca'
                                      : allDataForm?.category === 'old cow'
                                        ? 'Vaca velha'
                                        : allDataForm?.category === 'ox'
                                          ? 'Boi'
                                          : allDataForm?.category === 'old ox'
                                            ? 'Boi Velho'
                                            : allDataForm?.category === 'bull'
                                              ? 'Touro'
                                              : 'Touro velho'
                            : 'N/A'}
                        </span>{' '}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
            {/* <Button>Comparar peso dos filhos</Button> */}
          </Card>
        </form>
      )}
      <Card className="m-auto mt-4 flex w-full max-w-6xl flex-col gap-6 px-2 py-4">
        <CardHeader className="py-2">
          <CardTitle className="text-base">Registros sanitários</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {sanitaryRecords.length > 0 ? (
            sanitaryRecords.map((record) => (
              <Card
                key={`${record.typeLabel}-${record.id}`}
                className="px-3 py-2"
              >
                <p>
                  <strong>Tipo:</strong> {record.typeLabel}
                </p>
                <p>
                  <strong>Nome:</strong> {record.name}
                </p>
                <p>
                  <strong>Descrição:</strong> {record.description || 'N/A'}
                </p>
                <p>
                  <strong>Data:</strong>{' '}
                  {record.date
                    ? new Date(record.date).toLocaleDateString()
                    : 'N/A'}
                </p>
                <p>
                  <strong>Vencimento:</strong>{' '}
                  {record.expiryDate
                    ? new Date(record.expiryDate).toLocaleDateString()
                    : 'Não informado'}
                </p>
              </Card>
            ))
          ) : (
            <span>Nenhum registro sanitário cadastrado.</span>
          )}
        </CardContent>
      </Card>

      <Dialog open={openSanitaryModal} onOpenChange={setOpenSanitaryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar registro sanitário</DialogTitle>
            <DialogDescription>
              Selecione o tipo e preencha os campos em português.
            </DialogDescription>
          </DialogHeader>
          <Tabs
            value={sanitaryForm.type}
            onValueChange={(value) =>
              setSanitaryForm((prev) => ({
                ...prev,
                type: value as SanitaryType,
                name: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                expiryDate: '',
              }))
            }
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vaccine">Vacina</TabsTrigger>
              <TabsTrigger value="deworming">Vermífugo</TabsTrigger>
              <TabsTrigger value="disease">Doença</TabsTrigger>
            </TabsList>
            <TabsContent value="vaccine" className="space-y-3">
              <div>
                <label className="text-secondary" htmlFor="vaccine-name">
                  Nome da vacina:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="vaccine-name"
                  name="name"
                  value={sanitaryForm.name}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="vaccine-description">
                  Descrição:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="vaccine-description"
                  name="description"
                  value={sanitaryForm.description}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="vaccine-date">
                  Data da aplicação:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="vaccine-date"
                  type="date"
                  name="date"
                  value={sanitaryForm.date}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="vaccine-expiryDate">
                  Data de vencimento:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="vaccine-expiryDate"
                  type="date"
                  name="expiryDate"
                  value={sanitaryForm.expiryDate}
                  onChange={handleSanitaryInput}
                />
              </div>
            </TabsContent>
            <TabsContent value="deworming" className="space-y-3">
              <div>
                <label className="text-secondary" htmlFor="deworming-name">
                  Nome do vermífugo:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="deworming-name"
                  name="name"
                  value={sanitaryForm.name}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="deworming-date">
                  Data da aplicação:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="deworming-date"
                  type="date"
                  name="date"
                  value={sanitaryForm.date}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label
                  className="text-secondary"
                  htmlFor="deworming-expiryDate"
                >
                  Data de vencimento:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="deworming-expiryDate"
                  type="date"
                  name="expiryDate"
                  value={sanitaryForm.expiryDate}
                  onChange={handleSanitaryInput}
                />
              </div>
            </TabsContent>
            <TabsContent value="disease" className="space-y-3">
              <div>
                <label className="text-secondary" htmlFor="disease-name">
                  Nome da doença:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="disease-name"
                  name="name"
                  value={sanitaryForm.name}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="disease-description">
                  Descrição:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="disease-description"
                  name="description"
                  value={sanitaryForm.description}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="disease-date">
                  Data do registro:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="disease-date"
                  type="date"
                  name="date"
                  value={sanitaryForm.date}
                  onChange={handleSanitaryInput}
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="disease-expiryDate">
                  Data de vencimento:
                </label>
                <input
                  className={sanitaryFieldClass}
                  id="disease-expiryDate"
                  type="date"
                  name="expiryDate"
                  value={sanitaryForm.expiryDate}
                  onChange={handleSanitaryInput}
                />
              </div>
            </TabsContent>
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
