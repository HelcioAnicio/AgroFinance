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
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Filters } from '@/components/ui/modalFilters';
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

// const TABLE_HEADERS = [
//   'Status',
//   'ID',
//   'Raca',
//   'Sexo',
//   'Mae',
//   'Pai',
//   'Nascimento',
//   'Categoria',
//   'Peso atual',
//   '',
// ];

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
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedStatsYear, setSelectedStatsYear] = useState<number | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedJson, setParsedJson] = useState<any[]>([]);
  const [importIssues, setImportIssues] = useState<
    Array<{ row: number; message: string }>
  >([]);
  const [isSaleMode, setIsSaleMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pricePerArroba, setPricePerArroba] = useState('');
  const [carcassPercent, setCarcassPercent] = useState('50');
  const [saleDialogOpen, setSaleDialogOpen] = useState(false);
  const [saleAction, setSaleAction] = useState<'sell' | 'trash'>('sell');

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
    setImportIssues([]);
    setParsedJson([]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allRows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
        let headerRowIndex = 0;
        for (let i = 0; i < Math.min(allRows.length, 10); i++) {
          const row = allRows[i];
          if (Array.isArray(row)) {
            const hasBrinco = row.some((cell) => {
              if (typeof cell !== 'string') return false;
              const norm = cell
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
              return (
                norm.includes('brinco') ||
                norm.includes('manualid') ||
                norm.includes('id manual')
              );
            });
            if (hasBrinco) {
              headerRowIndex = i;
              break;
            }
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const json = XLSX.utils.sheet_to_json<any>(sheet, {
          range: headerRowIndex || 2,
          defval: '',
        });
        setParsedJson(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  async function handleUpload() {
    if (!inputFile || parsedJson.length === 0) return;

    setIsLoading(true);
    setImportIssues([]);

    try {
      const res = await fetch('/api/importAnimals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedJson),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(`Lista cadastrada com sucesso!
          A página será recarregada para mostrar os novos animais.`);
        setImportDialogOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.log('[Import] API error response:', result);
        if (result.issues) {
          setImportIssues(result.issues);
        }
        toast.error(
          'Erro na importação. Verifique os problemas listados na tela.'
        );
      }
    } catch {
      toast.error('Erro com o arquivo');
    } finally {
      setIsLoading(false);
    }
  }

  const handleNavigation = (id: string | null) => {
    setIsLoading(true);
    router.push(`/dashboard/${id}`);
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

  const pregnantCowsCount = listAnimals.filter(
    (animal) =>
      (animal.category === 'cow' || animal.category === 'old cow') &&
      isFemale(animal.gender) &&
      animal.reproductiveStatus === 'pregnant'
  ).length;

  const emptyCowsCount = listAnimals.filter(
    (animal) =>
      (animal.category === 'cow' || animal.category === 'old cow') &&
      isFemale(animal.gender) &&
      animal.reproductiveStatus === 'empty'
  ).length;

  const selectedAnimals = listAnimals.filter((a) => selectedIds.has(a.id));
  const totalWeight = selectedAnimals.reduce(
    (sum, a) => sum + (a.weight ?? 0),
    0
  );
  const avgWeight = selectedAnimals.length
    ? totalWeight / selectedAnimals.length
    : 0;
  const arrobaCount = avgWeight / 15;
  const carcassFactor =
    Math.min(Math.max(Number(carcassPercent) || 50, 1), 100) / 100;
  const carcassArrobas = arrobaCount * carcassFactor;
  const pricePerArrobaNum = Number(pricePerArroba) || 0;
  const pricePerHead = carcassArrobas * pricePerArrobaNum;
  const totalValue = pricePerHead * selectedAnimals.length;

  const toggleSaleMode = () => {
    setIsSaleMode((v) => !v);
    setSelectedIds(new Set());
  };

  const toggleSelectAnimal = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(listAnimals.map((a) => a.id)));
  const deselectAll = () => setSelectedIds(new Set());
  const allSelected =
    listAnimals.length > 0 && listAnimals.every((a) => selectedIds.has(a.id));

  const executeBulkAction = async () => {
    if (selectedIds.size === 0) return;
    const loadingId = toast.loading(
      saleAction === 'sell'
        ? 'Vendendo animais...'
        : 'Alterando para descarte...'
    );
    try {
      const payload: Record<string, unknown> = {
        animalIds: [...selectedIds],
        action: saleAction,
      };
      if (saleAction === 'sell') {
        payload.saleData = {
          pricePerHead,
          totalValue,
          date: new Date().toISOString().slice(0, 10),
          description: `Venda em lote — ${selectedIds.size} animais`,
        };
      }
      const res = await fetch('/api/animals/bulk-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      toast.dismiss(loadingId);
      if (res.ok) {
        toast.success(data.message);
        setSaleDialogOpen(false);
        setIsSaleMode(false);
        setSelectedIds(new Set());
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(data.message ?? 'Erro ao executar ação.');
      }
    } catch {
      toast.dismiss(loadingId);
      toast.error('Erro ao executar ação.');
    }
  };

  if (dataLoading) {
    return (
      <main className="relative m-auto flex h-[calc(100vh-100px)] w-full max-w-[1800px] flex-col overflow-hidden px-1 lg:h-full">
        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-8 w-36 rounded-lg" />
            <Skeleton className="h-7 w-28 rounded-md" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </div>

        {/* Summary cards skeleton */}
        <div className="my-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border-l-4 border-muted bg-white px-4 py-3 shadow-sm"
            >
              <Skeleton className="mb-2 h-2.5 w-16 rounded" />
              <Skeleton className="mb-2 h-7 w-10 rounded" />
              <Skeleton className="h-2 w-24 rounded" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full gap-4">
            <div className="flex h-full flex-1 flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
              {/* Table header */}
              <div className="border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-6">
                  {[
                    'w-16',
                    'w-12',
                    'w-20',
                    'w-14',
                    'w-20',
                    'w-20',
                    'w-24',
                    'w-20',
                    'w-20',
                  ].map((w, i) => (
                    <Skeleton key={i} className={`h-3 ${w} rounded`} />
                  ))}
                </div>
              </div>
              {/* Table rows */}
              <div className="divide-y overflow-auto">
                {Array.from({ length: 14 }).map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center gap-6 px-4 py-3.5"
                  >
                    {/* Status */}
                    <Skeleton className="h-4 w-14 rounded-full" />
                    {/* ID */}
                    <Skeleton className="h-4 w-10 rounded" />
                    {/* Raça */}
                    <Skeleton className="h-4 w-16 rounded" />
                    {/* Sexo */}
                    <Skeleton className="h-4 w-12 rounded" />
                    {/* Mãe */}
                    <Skeleton className="h-4 w-16 rounded" />
                    {/* Pai */}
                    <Skeleton className="h-4 w-16 rounded" />
                    {/* Nascimento */}
                    <Skeleton className="h-4 w-20 rounded" />
                    {/* Categoria */}
                    <Skeleton className="h-4 w-16 rounded" />
                    {/* Peso */}
                    <Skeleton className="h-4 w-14 rounded" />
                    {/* Ação */}
                    <Skeleton className="ml-auto h-4 w-4 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Aside skeleton (desktop) */}
            <div className="hidden h-full w-72 shrink-0 flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm lg:flex">
              <Skeleton className="h-4 w-36 rounded" />
              <div className="mt-2 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <div className="mb-2 flex justify-between">
                      <Skeleton className="h-3 w-12 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-2 w-14 rounded" />
                        <Skeleton className="h-2 flex-1 rounded-full" />
                        <Skeleton className="h-2 w-3 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-2 w-14 rounded" />
                        <Skeleton className="h-2 flex-1 rounded-full" />
                        <Skeleton className="h-2 w-3 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          <div className="sticky right-0 top-0 z-30 max-h-max w-full">
            <div className="relative flex w-full justify-between gap-10 px-1">
              <div className="flex w-full flex-wrap items-center justify-start gap-3 border">
                <Sheet>
                  <SheetTrigger asChild>
                    <FaFilter className="size-7 cursor-pointer" />
                  </SheetTrigger>
                  <Filters
                    listAnimals={listAnimals}
                    setListAnimals={setListAnimals}
                    originalAnimals={originalAnimals}
                  />
                </Sheet>
                <input
                  className="w-full min-w-28 max-w-40 border border-b-gray-400 bg-input p-1 shadow-sm outline-none"
                  type="search"
                  name="inputSearch"
                  id="inputSearch"
                  placeholder="Pesquisar ID"
                  onChange={(event) => setInputValue(event.target.value)}
                />{' '}
                <button
                  onClick={toggleSaleMode}
                  className={`rounded-sm border px-2 py-1 text-xs font-semibold transition-colors ${
                    isSaleMode
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-foreground bg-background text-foreground'
                  }`}
                >
                  {isSaleMode
                    ? `Selecionando (${selectedIds.size})`
                    : 'Selecionar venda'}
                </button>
                {isSaleMode && (
                  <button
                    onClick={allSelected ? deselectAll : selectAll}
                    className="rounded-sm border border-primary/50 px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-3 min-[500px]:flex-row">
                <Dialog
                  open={importDialogOpen}
                  onOpenChange={setImportDialogOpen}
                >
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
                        download={'agrofinance_importacao_animais.xlsx'}
                        href={'/agrofinance_importacao_animais.xlsx'}
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
                        accept=".xlsx,.xls,.csv"
                      />
                    </div>

                    {inputFile && (
                      <div className="mt-4 rounded-md border p-3">
                        <p className="mb-2 text-sm font-semibold text-foreground">
                          Arquivo selecionado:{' '}
                          <span className="font-normal">{inputFile.name}</span>
                        </p>

                        {parsedJson.length > 0 && (
                          <div className="mb-2">
                            <p className="text-xs text-muted-foreground">
                              Preview (primeiros 5 animais):
                            </p>
                            <ul className="mt-1 list-disc pl-5 text-sm">
                              {parsedJson.slice(0, 5).map((row, idx) => {
                                const keyId = Object.keys(row).find(
                                  (k) =>
                                    k.toLowerCase().includes('brinco') ||
                                    k.toLowerCase().includes('id')
                                );
                                const name = keyId ? row[keyId] : 'Sem ID';
                                return <li key={idx}>{name || 'Sem ID'}</li>;
                              })}
                            </ul>
                          </div>
                        )}

                        {importIssues.length > 0 && (
                          <div className="mt-3 max-h-40 overflow-y-auto rounded bg-red-50 p-2 text-sm text-red-800">
                            <p className="font-bold">Erros encontrados:</p>
                            <p className="mb-1 text-xs text-red-600">
                              Dica: Verifique se escreveu os valores
                              corretamente na planilha (ex: Macho/Fêmea, Status
                              como Ativo/Inativo, e Datas como DD/MM/AAAA).
                            </p>
                            <ul className="list-disc pl-5">
                              {importIssues.map((issue, i) => (
                                <li key={i}>
                                  Linha {issue.row}: {issue.message}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <DialogFooter>
                      <Button
                        variant="outline"
                        className="mr-auto"
                        onClick={() => {
                          setImportDialogOpen(false);
                          setImportIssues([]);
                          setInputFile(null);
                          setParsedJson([]);
                        }}
                      >
                        Cancelar
                      </Button>

                      {inputFile && (
                        <Button
                          disabled={isLoading}
                          onClick={() => {
                            handleUpload();
                          }}
                        >
                          {isLoading ? 'Importando...' : 'Cadastrar animais'}
                        </Button>
                      )}
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

          {/* Summary cards — reactive to active filters */}
          <div className="my-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-xl border-l-4 border-primary bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total
              </p>
              <p className="text-2xl font-black text-primary">
                {listAnimals.length}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Com filtros aplicados
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-green-500 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Ativos
              </p>
              <p className="text-2xl font-black text-foreground">
                {
                  listAnimals.filter(
                    (a) => a.status === 'active' && a.category !== 'neonate'
                  ).length
                }
              </p>
              <div className="mt-1.5 h-1 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width: `${listAnimals.length ? (listAnimals.filter((a) => a.status === 'active').length / listAnimals.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="rounded-xl border-l-4 border-fuchsia-500 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Prenhas
              </p>
              <p className="text-2xl font-black text-foreground">
                {pregnantCowsCount}
              </p>
              <p className="text-[10px] italic text-muted-foreground">
                {pregnantCowsCount === 0 ? 'Nenhuma prenha' : 'Vacas prenhas'}
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-slate-400 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Vazias
              </p>
              <p className="text-2xl font-black text-foreground">
                {emptyCowsCount}
              </p>
              {emptyCowsCount > 0 && (
                <p className="text-[10px] text-red-500">Atenção requerida</p>
              )}
            </div>
          </div>

          <div className="min-h-0 w-full pb-28 md:pb-20 lg:pb-0">
            <div className="flex h-[calc(100vh-200px)] w-full flex-col gap-4 overflow-hidden lg:flex-row lg:items-start lg:justify-between">
              <div className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
                <div
                  className={`overflow-auto scroll-smooth ${isSaleMode && selectedIds.size > 0 ? 'pb-56 lg:pb-24' : ''}`}
                >
                  <table className="relative w-full min-w-[900px] text-left">
                    <thead className="sticky left-0 top-0 z-20 bg-muted text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      <tr>
                        {isSaleMode && <th className="w-8 px-3 py-3"></th>}
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Raça</th>
                        <th className="px-4 py-3">Sexo</th>
                        <th className="px-4 py-3">Mãe</th>
                        <th className="px-4 py-3">Pai</th>
                        <th className="px-4 py-3">Nascimento</th>
                        <th className="px-4 py-3">Categoria</th>
                        <th className="px-4 py-3">Peso atual</th>
                        <th className="sticky right-0 bg-muted px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y overflow-y-auto scroll-smooth">
                      {listAnimals.map((animal: Animal) => {
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

                        const isSelected =
                          isSaleMode && selectedIds.has(animal.id);
                        return (
                          <tr
                            key={animal.id}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-primary/10 outline outline-1 outline-primary'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() =>
                              isSaleMode
                                ? toggleSelectAnimal(animal.id)
                                : handleNavigation(animal.id)
                            }
                          >
                            {isSaleMode && (
                              <td className="px-3 py-3">
                                <span
                                  className={`flex size-4 items-center justify-center rounded-full border-2 transition-colors ${
                                    isSelected
                                      ? 'border-primary bg-primary'
                                      : 'border-muted-foreground/40 bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="size-1.5 rounded-full bg-white" />
                                  )}
                                </span>
                              </td>
                            )}
                            <td className="px-4 py-3 text-sm">
                              <span className="flex w-max items-center gap-1.5">
                                {getStatusNode(animal.status)}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-sm text-primary">
                              {animal.manualId.charAt(0).toUpperCase() +
                                animal.manualId.slice(1)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {animal.breed.charAt(0).toUpperCase() +
                                animal.breed.slice(1)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {animal.gender === 'male' ||
                              animal.gender === 'macho'
                                ? 'Macho'
                                : 'Fêmea'}
                            </td>

                            {animal.motherId === null ? (
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                Comercial
                              </td>
                            ) : (
                              <td
                                className="px-4 py-3 text-sm transition hover:opacity-60"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleNavigation(animal.motherId);
                                }}
                              >
                                <span className="flex w-max items-center gap-1 border-b border-foreground/40">
                                  {`Vaca ${mother?.manualId}`}
                                  <LiaExternalLinkAltSolid className="inline-block size-3.5" />
                                </span>
                              </td>
                            )}

                            {animal.fatherId === null ? (
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                Comercial
                              </td>
                            ) : (
                              <td
                                className="px-4 py-3 text-sm transition hover:opacity-60"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleNavigation(animal.fatherId);
                                }}
                              >
                                <span className="flex w-max items-center gap-1 border-b border-foreground/40">
                                  {`${fatherLabel} ${father?.manualId}`}
                                  <LiaExternalLinkAltSolid className="inline-block size-3.5" />
                                </span>
                              </td>
                            )}

                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {animal.birthDate
                                ? new Date(animal.birthDate).toLocaleDateString(
                                    'pt-BR'
                                  )
                                : 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {getCategoryLabel(animal)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              {animal.weight} kg
                            </td>
                            <td className="sticky right-0 bg-white px-4 py-3">
                              <SquareArrowOutUpLeft
                                size={18}
                                className="text-muted-foreground"
                              />
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
                      <span className="rounded bg-blue-50 px-2 py-1 font-semibold text-blue-700">
                        Machos nascidos: {selectedYearStats.totalMaleBirths}
                      </span>
                      <span className="rounded bg-pink-50 px-2 py-1 font-semibold text-pink-600">
                        Fêmeas nascidas: {selectedYearStats.totalFemaleBirths}
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-1 font-semibold text-gray-700">
                        Mortes: {selectedYearStats.totalDeaths}
                      </span>
                      <span className="rounded bg-muted px-2 py-1 font-semibold">
                        Mudanças: {selectedYearStats.totalStatusChanges}
                      </span>
                    </div>

                    <div className="max-h-[55vh] space-y-2 overflow-y-auto pr-1 text-xs">
                      {selectedYearStats.months
                        .filter(
                          (m) =>
                            m.maleBirths > 0 ||
                            m.femaleBirths > 0 ||
                            m.deaths > 0 ||
                            m.statusChanges > 0
                        )
                        .map((month) => {
                          const malePercent =
                            (month.maleBirths / maxMonthlyValue) * 100;
                          const femalePercent =
                            (month.femaleBirths / maxMonthlyValue) * 100;
                          const deathPercent =
                            (month.deaths / maxMonthlyValue) * 100;
                          const monthStatuses = month.statusBreakdown.filter(
                            (s) => s.total > 0 && s.status !== 'dead'
                          );
                          const maxMonthStatus = Math.max(
                            ...monthStatuses.map((s) => s.total),
                            1
                          );

                          return (
                            <div
                              key={month.month}
                              className="rounded-lg border p-3"
                            >
                              <div className="mb-2 flex items-center justify-between text-[11px]">
                                <span className="font-semibold">
                                  {month.label}
                                </span>
                                <span className="text-muted-foreground">
                                  {month.statusChanges} alteraç
                                  {month.statusChanges !== 1 ? 'ões' : 'ão'}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                {month.maleBirths > 0 && (
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="w-14 truncate text-blue-600">
                                      Nasc. ♂
                                    </span>
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
                                )}
                                {month.femaleBirths > 0 && (
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="w-14 truncate text-pink-600">
                                      Nasc. ♀
                                    </span>
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
                                )}
                                {month.deaths > 0 && (
                                  <div className="flex items-center gap-2 text-[10px]">
                                    <span className="w-14 truncate">
                                      Mortes
                                    </span>
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
                                )}
                                {monthStatuses.map((statusItem) => {
                                  const percent =
                                    (statusItem.total / maxMonthStatus) * 100;
                                  const genderDetail =
                                    statusItem.males > 0 ||
                                    statusItem.females > 0
                                      ? ` (${statusItem.males > 0 ? `${statusItem.males}♂` : ''}${statusItem.males > 0 && statusItem.females > 0 ? ' ' : ''}${statusItem.females > 0 ? `${statusItem.females}♀` : ''})`
                                      : '';

                                  return (
                                    <div
                                      key={`${month.month}-${statusItem.status}`}
                                      className="flex items-center gap-2 text-[10px]"
                                    >
                                      <span
                                        className="w-14 truncate"
                                        title={statusItem.label + genderDetail}
                                      >
                                        {statusItem.label}
                                      </span>
                                      <div className="h-2 flex-1 rounded bg-muted">
                                        <div
                                          className={`h-2 rounded ${getStatusBarColor(statusItem.status)}`}
                                          style={{ width: `${percent}%` }}
                                        />
                                      </div>
                                      <span className="w-4 text-right">
                                        {statusItem.total}
                                      </span>
                                    </div>
                                  );
                                })}

                                {/* Gender detail for status changes */}
                                {monthStatuses.some(
                                  (s) => s.males > 0 || s.females > 0
                                ) && (
                                  <div className="mt-1 border-t pt-1 text-[9px] text-muted-foreground">
                                    {monthStatuses
                                      .filter(
                                        (s) => s.males > 0 || s.females > 0
                                      )
                                      .map((s) => (
                                        <span key={s.status} className="mr-2">
                                          {s.label}:{' '}
                                          {s.males > 0 && (
                                            <span className="text-blue-600">
                                              {s.males}♂
                                            </span>
                                          )}
                                          {s.males > 0 && s.females > 0 && ' '}
                                          {s.females > 0 && (
                                            <span className="text-pink-600">
                                              {s.females}♀
                                            </span>
                                          )}
                                        </span>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {selectedYearStats.months.every(
                        (m) =>
                          m.maleBirths === 0 &&
                          m.femaleBirths === 0 &&
                          m.deaths === 0 &&
                          m.statusChanges === 0
                      ) && (
                        <p className="py-4 text-center text-muted-foreground">
                          Sem eventos em {selectedStatsYear}.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Sem dados para exibir o relatório.
                  </p>
                )}
              </aside>
            </div>
          </div>

          {isSaleMode && selectedIds.size > 0 && (
            <div className="fixed bottom-20 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 rounded-xl border bg-white px-4 py-3 shadow-2xl lg:bottom-4">
              {/* Summary row */}
              <div className="mb-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {selectedIds.size} animal{selectedIds.size !== 1 ? 'is' : ''}{' '}
                  selecionado{selectedIds.size !== 1 ? 's' : ''}
                </span>
                <span>
                  Peso total: <strong>{totalWeight.toFixed(0)} kg</strong>
                </span>
                <span>
                  Peso médio: <strong>{avgWeight.toFixed(0)} kg</strong>
                </span>
                <span>
                  Arroba bruta: <strong>{arrobaCount.toFixed(1)} @</strong>
                </span>
                <span>
                  Arroba carcaça: <strong>{carcassArrobas.toFixed(1)} @</strong>
                </span>
              </div>

              {/* Inputs + actions row */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Carcass % */}
                <div className="flex items-center gap-1 text-xs">
                  <label className="font-medium text-muted-foreground">
                    % Carcaça
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    value={carcassPercent}
                    onChange={(e) => setCarcassPercent(e.target.value)}
                    className="w-14 rounded border px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* R$/@ */}
                <div className="flex items-center gap-1 text-xs">
                  <label className="font-medium text-muted-foreground">
                    R$/@
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={pricePerArroba}
                    onChange={(e) => setPricePerArroba(e.target.value)}
                    placeholder="0"
                    className="w-20 rounded border px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {pricePerArrobaNum > 0 && (
                  <>
                    <span className="text-xs">
                      Por cabeça:{' '}
                      <strong>
                        R${' '}
                        {pricePerHead.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                    </span>
                    <span className="text-xs">
                      Total:{' '}
                      <strong className="text-primary">
                        R${' '}
                        {totalValue.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                    </span>
                  </>
                )}

                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => {
                      setSaleAction('trash');
                      setSaleDialogOpen(true);
                    }}
                    className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Alterar para descarte
                  </button>
                  <button
                    onClick={() => {
                      setSaleAction('sell');
                      setSaleDialogOpen(true);
                    }}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    Vender animais
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Execution confirmation dialog */}
          {saleDialogOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
              <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-2xl">
                <h3 className="mb-1 text-base font-bold">
                  {saleAction === 'sell'
                    ? 'Confirmar venda'
                    : 'Confirmar descarte'}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {saleAction === 'sell'
                    ? `${selectedIds.size} animal(is) serão marcados como vendidos e um lançamento financeiro pendente será criado para cada um (R$ ${pricePerHead.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por cabeça).`
                    : `${selectedIds.size} animal(is) serão marcados para descarte. Esta ação pode ser revertida manualmente.`}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaleDialogOpen(false)}
                    className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={executeBulkAction}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 ${
                      saleAction === 'sell' ? 'bg-primary' : 'bg-red-600'
                    }`}
                  >
                    {saleAction === 'sell'
                      ? 'Confirmar venda'
                      : 'Confirmar descarte'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};
