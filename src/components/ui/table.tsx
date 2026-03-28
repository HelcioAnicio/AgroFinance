'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SquareArrowOutUpLeft } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { FaFilter, FaCheckCircle } from 'react-icons/fa';
import { IoSkull, IoDownloadOutline } from 'react-icons/io5';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { MdHighlightOff } from 'react-icons/md';
import { FaFileArrowDown } from 'react-icons/fa6';
import {
  TbMoneybag,
  TbTrashXFilled,
  TbZoomQuestionFilled,
} from 'react-icons/tb';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';
import { AddAnimal } from '../../app/dashboard/(addAnimal)/addAnimals';
import { AddAnimalDesktop } from '@/app/dashboard/(addAnimal)/addAnimalsDesktop';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Filters } from '@/components/ui/modalFilters';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Loading } from '@/components/ui/loading';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

interface TableProps {
  animals: Animal[];
  users: User[];
  externalBulls: ExternalBull[];
  livestockStats?: LivestockStatsYear[];
  dataLoading?: boolean;
}

const TABLE_HEADERS = [
  'Status',
  'ID',
  'Raca',
  'Sexo',
  'Mae',
  'Pai',
  'Nascimento',
  'Categoria',
  'Peso atual',
  '',
];

const isFemale = (gender: string) =>
  gender === 'female' || gender === 'femea' || gender === 'fêmea';

const getStatusNode = (status?: string) => {
  if (status === 'active' || status === 'ativo') {
    return (
      <>
        <FaCheckCircle className="inline-block size-3 text-green-400" /> Ativo
      </>
    );
  }
  if (status === 'inactive' || status === 'inativo') {
    return (
      <>
        <MdHighlightOff className="inline-block size-3 text-gray-500" /> Inativo
      </>
    );
  }
  if (status === 'dead' || status === 'morto') {
    return (
      <>
        <IoSkull className="inline-block size-3 text-black" /> Morto
      </>
    );
  }
  if (status === 'lost') {
    return (
      <>
        <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" />{' '}
        Perdida
      </>
    );
  }
  if (status === 'trash') {
    return (
      <>
        <TbTrashXFilled className="inline-block size-3 text-red-500" /> Descarte
      </>
    );
  }

  return (
    <>
      <TbMoneybag className="inline-block size-3 text-yellow-600" /> Vendido
    </>
  );
};

const getCategoryLabel = (animal: Animal) => {
  if (animal.category === 'neonate') return 'Neonato';
  if (animal.category === 'calf') return 'Bezerro';
  if (animal.category === 'steer' && animal.gender === 'male') return 'Garrote';
  if (animal.category === 'steer' && animal.gender === 'female')
    return 'Novilho';
  if (animal.category === 'cow') return 'Vaca';
  if (animal.category === 'old cow') return 'Vaca velha';
  if (animal.category === 'ox') return 'Boi';
  if (animal.category === 'old ox') return 'Boi velho';
  if (animal.category === 'bull') return 'Touro';
  if (animal.category === 'old bull') return 'Touro velho';
  return '-';
};

const getStatusBarColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    dead: 'bg-black',
    sold: 'bg-yellow-600',
    lost: 'bg-amber-500',
    trash: 'bg-red-500',
    empty: 'bg-slate-500',
    pregnant: 'bg-fuchsia-500',
    waiting: 'bg-indigo-500',
    pev: 'bg-cyan-500',
  };

  return colors[status] ?? 'bg-primary';
};

export const Table: React.FC<TableProps> = ({
  animals,
  users,
  externalBulls,
  livestockStats = [],
  dataLoading = false,
}) => {
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [selectedStatsYear, setSelectedStatsYear] = useState<number | null>(
    null
  );

  const router = useRouter();

  const availableYears = useMemo(
    () => livestockStats.map((yearStats) => yearStats.year),
    [livestockStats]
  );

  const selectedYearStats = useMemo(() => {
    if (!selectedStatsYear) return null;
    return (
      livestockStats.find((item) => item.year === selectedStatsYear) ?? null
    );
  }, [livestockStats, selectedStatsYear]);

  const maxMonthlyValue = useMemo(() => {
    if (!selectedYearStats) return 1;
    return Math.max(
      ...selectedYearStats.months.flatMap((month) => [
        month.maleBirths,
        month.femaleBirths,
        month.deaths,
      ]),
      1
    );
  }, [selectedYearStats]);

  useEffect(() => {
    if (dataLoading) return;
    const sortedAnimals = [...animals].sort((a, b) => {
      const aIsNumber = !isNaN(Number(a.manualId));
      const bIsNumber = !isNaN(Number(b.manualId));

      if (!aIsNumber && !bIsNumber)
        return String(a.manualId).localeCompare(String(b.manualId));
      if (aIsNumber && bIsNumber)
        return Number(a.manualId) - Number(b.manualId);
      return aIsNumber ? 1 : -1;
    });

    setOriginalAnimals(sortedAnimals);
    setListAnimals(sortedAnimals);
  }, [animals, dataLoading]);

  useEffect(() => {
    if (!inputValue) {
      setListAnimals(
        originalAnimals.filter((animal) => animal.category !== 'neonate')
      );
      return;
    }

    const filtered = originalAnimals.filter((animal) =>
      String(animal.manualId).includes(String(inputValue).toLowerCase())
    );
    setListAnimals(filtered);
  }, [inputValue, originalAnimals]);

  useEffect(() => {
    if (availableYears.length === 0) {
      setSelectedStatsYear(null);
      return;
    }

    const latestYear = Math.max(...availableYears);
    setSelectedStatsYear((current) =>
      current && availableYears.includes(current) ? current : latestYear
    );
  }, [availableYears]);

  const handleInputFileValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setInputFile(file);
  };

  async function handleUpload() {
    if (!inputFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setIsLoading(true);

      try {
        const res = await fetch('/api/importAnimals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
        });

        const result = await res.json();
        if (result.success) toast.success('Lista cadastrada com sucesso!');
        else toast.error('Erro com a importacao');
      } catch {
        toast.error('Erro com o arquivo');
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(inputFile);
  }

  const handleNavigation = (id: string | null) => {
    setIsLoading(true);
    router.push(`dashboard/${id}`);
  };

  const handleAnimalAdded = (newAnimal: Animal) => {
    const updateAndSort = (prev: Animal[]) => {
      const updated = [...prev, newAnimal];
      return updated.sort((a, b) => {
        const aIsNumber = !isNaN(Number(a.manualId));
        const bIsNumber = !isNaN(Number(b.manualId));

        if (!aIsNumber && !bIsNumber)
          return String(a.manualId).localeCompare(String(b.manualId));
        if (aIsNumber && bIsNumber)
          return Number(a.manualId) - Number(b.manualId);
        return aIsNumber ? 1 : -1;
      });
    };

    setListAnimals(updateAndSort);
    setOriginalAnimals(updateAndSort);
  };

  const pregnantCowsCount = animals.filter(
    (animal) =>
      (animal.category === 'cow' || animal.category === 'old cow') &&
      isFemale(animal.gender) &&
      animal.reproductiveStatus === 'pregnant'
  ).length;

  const emptyCowsCount = animals.filter(
    (animal) =>
      (animal.category === 'cow' || animal.category === 'old cow') &&
      isFemale(animal.gender) &&
      animal.reproductiveStatus === 'empty'
  ).length;

  if (dataLoading) {
    return (
      <main
        style={{ height: 'calc(100vh-170px)' }}
        className="relative m-auto max-w-max pb-5"
      >
        <div className="sticky right-0 top-0 z-50 max-h-max w-full">
          <div className="relative flex w-full justify-between gap-10 px-1">
            <div className="flex items-center gap-3">
              <Skeleton className="size-6 rounded" />
              <Skeleton className="h-8 w-40 rounded" />
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
        <br className="md:hidden" />
        <div className="my-5 hidden gap-3 md:flex">
          <Skeleton className="h-10 w-40 rounded-sm" />
          <Skeleton className="h-10 w-32 rounded-sm" />
        </div>
        <div className="h-full w-full overflow-y-auto pb-28 md:pb-20">
          <table className="m-auto max-w-max overflow-x-auto overflow-y-scroll scroll-smooth text-left xl:text-sm">
            <thead className="sticky top-0 z-20 border-collapse bg-primary text-background">
              <tr>
                {TABLE_HEADERS.map((header, index) => (
                  <th key={`${header}-${index}`} className="px-1 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-auto scroll-smooth">
              {Array.from({ length: 12 }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-muted' : ''}
                >
                  {TABLE_HEADERS.map((_, colIndex) => (
                    <td key={colIndex} className="px-1 py-3">
                      <Skeleton className="h-5 w-full min-w-[60px] rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }

  return (
    <main className="relative m-auto flex h-[calc(100vh-100px)] w-full max-w-[1800px] flex-col overflow-x-auto overflow-y-hidden lg:h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="sticky right-0 top-0 z-50 max-h-max w-full">
            <div className="relative flex w-full justify-between gap-10 px-1">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <FaFilter className="size-6 cursor-pointer" />
                  </SheetTrigger>
                  <Filters
                    listAnimals={listAnimals}
                    setListAnimals={setListAnimals}
                    originalAnimals={originalAnimals}
                  />
                </Sheet>
                <input
                  className="w-full max-w-40 border border-b-gray-400 bg-input p-1 shadow-sm outline-none"
                  type="search"
                  name="inputSearch"
                  id="inputSearch"
                  placeholder="Pesquisar ID"
                  onChange={(event) => setInputValue(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <Dialog>
                  <DialogTrigger className="flex items-center rounded-md border border-foreground p-2 text-xs">
                    Importar animais
                    <FaFileArrowDown size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Escolha o arquivo para importar</DialogTitle>
                      <DialogDescription>
                        Para a importacao funcionar, use o arquivo modelo no
                        link abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Link
                        download={'animal_model_template.xlsx'}
                        href={'/animal_model_template.xlsx'}
                        className="flex w-max items-center gap-1 underline"
                      >
                        Arquivo modelo <IoDownloadOutline />
                      </Link>
                      <label
                        htmlFor="document"
                        className="flex items-center rounded-md border border-foreground p-2"
                      >
                        Escolher arquivo
                        <FaFileArrowDown size={16} />
                      </label>
                      <input
                        type="file"
                        name="document"
                        id="document"
                        className="hidden"
                        onChange={handleInputFileValue}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose className="mr-auto" asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <DialogClose>
                        {inputFile && (
                          <Button onClick={handleUpload}>
                            Cadastrar animais
                          </Button>
                        )}
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild className="sm:hidden">
                    <Button className="flex gap-2 p-1 sm:hidden">
                      Adicionar <CirclePlus className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <AddAnimal
                    animals={animals}
                    externalBulls={externalBulls}
                    users={users}
                    onAnimalAdded={handleAnimalAdded}
                  />
                </Sheet>
                <Dialog>
                  <DialogTrigger className="hidden items-center justify-center gap-2 rounded-sm bg-primary p-1 text-background sm:flex">
                    Adicionar <CirclePlus className="size-4" />
                  </DialogTrigger>
                  <AddAnimalDesktop
                    animals={animals}
                    externalBulls={externalBulls}
                    users={users}
                    onAnimalAdded={handleAnimalAdded}
                  />
                </Dialog>
              </div>
            </div>
          </div>

          <br className="md:hidden" />
          <div className="my-5 hidden gap-3 md:flex">
            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Total de animais: {animals.length}
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total considerando todos os cadastrados, incluindo neonato.
                </HoverCardContent>
              </HoverCard>
            </Card>

            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Animais ativos:{' '}
                  {
                    animals.filter(
                      (a) => a.status === 'active' && a.category !== 'neonate'
                    ).length
                  }
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total de animais ativos na fazenda.
                </HoverCardContent>
              </HoverCard>
            </Card>

            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Vacas prenhas: {pregnantCowsCount}
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total de vacas prenhas.
                </HoverCardContent>
              </HoverCard>
            </Card>

            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Vacas vazias: {emptyCowsCount}
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total de vacas vazias.
                </HoverCardContent>
              </HoverCard>
            </Card>
          </div>

          <div className="min-h-0 w-full pb-28 md:pb-20 lg:pb-0">
            <div className="flex h-[calc(100vh-110px)] w-full flex-col gap-4 overflow-hidden lg:flex-row lg:items-start lg:justify-between">
              <div className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-sm border pb-40">
                <div className="overflow-auto scroll-smooth">
                  <table className="relative w-full min-w-[900px] text-left xl:text-sm">
                    <thead className="sticky left-0 top-0 z-20 border-collapse bg-primary text-background">
                      <tr className="">
                        <th className="w-20 px-1 py-2">Status</th>
                        <th className="px-1 py-2">ID</th>
                        <th className="px-1 py-2">Raca</th>
                        <th className="px-1 py-2">Sexo</th>
                        <th className="px-1 py-2">Mae</th>
                        <th className="px-1 py-2">Pai</th>
                        <th className="px-1 py-2">Nascimento</th>
                        <th className="px-1 py-2">Categoria</th>
                        <th className="px-1 py-2">Peso atual</th>
                        <th className="sticky right-0 bg-primary px-1 py-2 text-background"></th>
                      </tr>
                    </thead>
                    <tbody className="overflow-y-auto scroll-smooth">
                      {listAnimals.map((animal: Animal, index: number) => {
                        const mother = animals.find(
                          (a) => a.id === animal.motherId
                        );
                        const father = animals.find(
                          (a) => a.id === animal.fatherId
                        );

                        const fatherLabel =
                          father?.category === 'bull' ||
                          father?.category === 'old bull'
                            ? 'Touro'
                            : father?.category === 'ox' ||
                                father?.category === 'old ox'
                              ? 'Boi'
                              : '';

                        return (
                          <tr
                            key={animal.id}
                            className={`${index % 2 === 0 ? 'bg-muted' : ''} cursor-pointer`}
                            onClick={() => handleNavigation(animal.id)}
                          >
                            <td className="px-1 py-3 pr-4">
                              <span className="flex w-max items-center gap-1">
                                {getStatusNode(animal.status)}
                              </span>
                            </td>
                            <td className="px-1 py-3">
                              {animal.manualId.charAt(0).toUpperCase() +
                                animal.manualId.slice(1)}
                            </td>
                            <td className="px-1 py-3">
                              {animal.breed.charAt(0).toUpperCase() +
                                animal.breed.slice(1)}
                            </td>
                            <td className="px-1 py-3 pr-4">
                              {animal.gender === 'male' ||
                              animal.gender === 'macho'
                                ? 'Macho'
                                : 'Femea'}
                            </td>

                            {animal.motherId === null ? (
                              <td className="cursor-default px-1 py-3">
                                <span className="flex w-max items-center gap-1">
                                  Comercial
                                </span>
                              </td>
                            ) : (
                              <td
                                className="px-1 py-3 pr-4 transition duration-300 ease-in-out hover:opacity-50"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleNavigation(animal.motherId);
                                }}
                              >
                                <span className="flex w-max items-center gap-1 border-b border-foreground">
                                  {`Vaca ${mother?.manualId}`}
                                  <LiaExternalLinkAltSolid className="inline-block size-4" />
                                </span>
                              </td>
                            )}

                            {animal.fatherId === null ? (
                              <td className="cursor-default px-1 py-3">
                                <span className="flex w-max items-center gap-1">
                                  Comercial
                                </span>
                              </td>
                            ) : (
                              <td
                                className="px-1 py-3 pr-4 transition duration-300 ease-in-out hover:opacity-50"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleNavigation(animal.fatherId);
                                }}
                              >
                                <span className="flex w-max items-center gap-1 border-b border-foreground">
                                  {`${fatherLabel} ${father?.manualId}`}
                                  <LiaExternalLinkAltSolid className="inline-block size-4" />
                                </span>
                              </td>
                            )}

                            <td className="px-1 py-3">
                              {animal.birthDate
                                ? new Date(
                                    animal.birthDate
                                  ).toLocaleDateString()
                                : 'N/A'}
                            </td>
                            <td className="px-1 py-3 pr-4">
                              <span className="flex w-max">
                                {getCategoryLabel(animal)}
                              </span>
                            </td>
                            <td className="px-2 py-3">
                              <span className="flex w-max">
                                {animal.weight} Kg
                              </span>
                            </td>
                            <td
                              className={`sticky right-0 px-1 py-3 ${index % 2 === 0 ? 'bg-muted' : 'bg-background'}`}
                            >
                              <SquareArrowOutUpLeft size={20} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="hidden h-full w-full min-w-[400px] max-w-80 rounded-sm border bg-background p-3 lg:block lg:flex-1">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    Natalidade e mortalidade
                  </h3>
                  <span className="rounded-sm bg-primary/10 px-2 py-1 text-[10px] uppercase tracking-wide text-primary">
                    Premium em breve
                  </span>
                </div>

                {selectedYearStats ? (
                  <>
                    <div className="mb-3 flex items-center gap-2">
                      <label htmlFor="stats-year" className="text-xs">
                        Ano:
                      </label>
                      <select
                        id="stats-year"
                        className="rounded-sm border bg-background px-2 py-1 text-xs outline-none"
                        value={selectedStatsYear ?? ''}
                        onChange={(event) =>
                          setSelectedStatsYear(Number(event.target.value))
                        }
                      >
                        {availableYears
                          .slice()
                          .sort((a, b) => b - a)
                          .map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2 text-xs">
                      <Card className="rounded-sm p-1 px-3">
                        Machos: {selectedYearStats.totalMaleBirths}
                      </Card>
                      <Card className="rounded-sm p-1 px-3">
                        Femeas: {selectedYearStats.totalFemaleBirths}
                      </Card>
                      <Card className="rounded-sm p-1 px-3">
                        Mortos: {selectedYearStats.totalDeaths}
                      </Card>
                      <Card className="rounded-sm p-1 px-3">
                        Mudancas de status:{' '}
                        {selectedYearStats.totalStatusChanges}
                      </Card>
                    </div>

                    <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1 text-xs">
                      {selectedYearStats.months.map((month) => {
                        const malePercent =
                          (month.maleBirths / maxMonthlyValue) * 100;
                        const femalePercent =
                          (month.femaleBirths / maxMonthlyValue) * 100;
                        const deathPercent =
                          (month.deaths / maxMonthlyValue) * 100;
                        const monthStatuses = month.statusBreakdown.filter(
                          (statusItem) =>
                            statusItem.total > 0 && statusItem.status !== 'dead'
                        );
                        const maxMonthStatus = Math.max(
                          ...monthStatuses.map(
                            (statusItem) => statusItem.total
                          ),
                          1
                        );

                        return (
                          <div
                            key={month.month}
                            className="rounded-sm border p-2"
                          >
                            <div className="mb-1 flex items-center justify-between text-[11px]">
                              <span className="font-semibold">
                                {month.label}
                              </span>
                              <span>Alteracoes: {month.statusChanges}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-[10px]">
                                <span className="w-12">Machos</span>
                                <div className="h-2 flex-1 rounded bg-muted">
                                  <div
                                    className="h-2 rounded bg-blue-500"
                                    style={{ width: `${malePercent}%` }}
                                  />
                                </div>
                                <span className="w-4 text-right">
                                  {month.maleBirths}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-[10px]">
                                <span className="w-12">Femeas</span>
                                <div className="h-2 flex-1 rounded bg-muted">
                                  <div
                                    className="h-2 rounded bg-pink-500"
                                    style={{ width: `${femalePercent}%` }}
                                  />
                                </div>
                                <span className="w-4 text-right">
                                  {month.femaleBirths}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-[10px]">
                                <span className="w-12">Mortes</span>
                                <div className="h-2 flex-1 rounded bg-muted">
                                  <div
                                    className="h-2 rounded bg-gray-700"
                                    style={{ width: `${deathPercent}%` }}
                                  />
                                </div>
                                <span className="w-4 text-right">
                                  {month.deaths}
                                </span>
                              </div>

                              {monthStatuses.map((statusItem) => {
                                const percent =
                                  (statusItem.total / maxMonthStatus) * 100;

                                return (
                                  <div
                                    key={`${month.month}-${statusItem.status}`}
                                    className="flex items-center gap-2 text-[10px]"
                                  >
                                    <span className="w-12 truncate">
                                      {statusItem.label}
                                    </span>
                                    <div className="h-2 flex-1 rounded bg-muted">
                                      <div
                                        className={`h-2 rounded ${getStatusBarColor(
                                          statusItem.status
                                        )}`}
                                        style={{ width: `${percent}%` }}
                                      />
                                    </div>
                                    <span className="w-4 text-right">
                                      {statusItem.total}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Sem dados para exibir o grafico.
                  </p>
                )}
              </aside>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
