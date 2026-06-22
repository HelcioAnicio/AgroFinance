'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CirclePlus, Loader2 } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaFileArrowDown } from 'react-icons/fa6';
import {
  IoSkull,
  IoDownloadOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { MdHighlightOff } from 'react-icons/md';
import {
  TbMoneybag,
  TbTrashXFilled,
  TbZoomQuestionFilled,
} from 'react-icons/tb';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { ExternalBull } from '@/types/externalBull';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddAnimal } from '../(addAnimal)/addAnimals';
import { AddAnimalDesktop } from '../(addAnimal)/addAnimalsDesktop';

const isFemale = (gender: string) =>
  gender === 'female' || gender === 'femea' || gender === 'fêmea';


const getStatusNode = (status?: string) => {
  if (status === 'active' || status === 'ativo')
    return (
      <>
        <FaCheckCircle className="inline-block size-3 text-green-400" /> Ativo
      </>
    );
  if (status === 'inactive' || status === 'inativo')
    return (
      <>
        <MdHighlightOff className="inline-block size-3 text-gray-500" /> Inativo
      </>
    );
  if (status === 'dead' || status === 'morto')
    return (
      <>
        <IoSkull className="inline-block size-3 text-black" /> Morto
      </>
    );
  if (status === 'lost')
    return (
      <>
        <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" />{' '}
        Perdida
      </>
    );
  if (status === 'trash')
    return (
      <>
        <TbTrashXFilled className="inline-block size-3 text-red-500" /> Descarte
      </>
    );
  return (
    <>
      <TbMoneybag className="inline-block size-3 text-yellow-600" /> Vendido
    </>
  );
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

export function DashboardOverview() {
  const [dataLoading, setDataLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [inputFile, setInputFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsedJson, setParsedJson] = useState<any[]>([]);
  const [importIssues, setImportIssues] = useState<
    Array<{ row: number; message: string }>
  >([]);
  const [isImporting, setIsImporting] = useState(false);

  const router = useRouter();

  const loadData = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/dashboard-table-data');
      if (!res.ok) throw new Error();
      const data: {
        animals: Animal[];
        users: User[];
        externalBulls: ExternalBull[];
      } = await res.json();
      setAnimals(data.animals ?? []);
      setUsers(data.users ?? []);
      setExternalBulls(data.externalBulls ?? []);
    } catch {
      setAnimals([]);
      setUsers([]);
      setExternalBulls([]);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeAnimals = animals.filter(
    (a) => a.status === 'active' && a.category !== 'neonate'
  );
  const pregnantCows = animals.filter(
    (a) =>
      (a.category === 'cow' || a.category === 'old cow') &&
      isFemale(a.gender) &&
      a.reproductiveStatus === 'pregnant'
  );
  const emptyCows = animals.filter(
    (a) =>
      (a.category === 'cow' || a.category === 'old cow') &&
      isFemale(a.gender) &&
      a.reproductiveStatus === 'empty'
  );

  const recentAnimals = useMemo(
    () =>
      [...animals]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6),
    [animals]
  );

  const vaccinationAlerts = useMemo(() => {
    const today = new Date();
    const in30 = new Date(today);
    in30.setDate(in30.getDate() + 30);

    return animals
      .filter((a) => {
        const vaccExp = a.vaccineExpiry ? new Date(a.vaccineExpiry) : null;
        const dewExp = a.dewormingExpiry ? new Date(a.dewormingExpiry) : null;
        return (vaccExp && vaccExp <= in30) || (dewExp && dewExp <= in30);
      })
      .map((a) => {
        const vaccExp = a.vaccineExpiry ? new Date(a.vaccineExpiry) : null;
        const dewExp = a.dewormingExpiry ? new Date(a.dewormingExpiry) : null;
        const alerts: string[] = [];
        if (vaccExp && vaccExp <= in30) {
          const daysLeft = Math.ceil(
            (vaccExp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          alerts.push(
            daysLeft <= 0
              ? `Vacina expirada (${a.vaccineName ?? 'Vacina'})`
              : `Vacina vence em ${daysLeft}d (${a.vaccineName ?? ''})`
          );
        }
        if (dewExp && dewExp <= in30) {
          const daysLeft = Math.ceil(
            (dewExp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          alerts.push(
            daysLeft <= 0
              ? `Vermífugo expirado (${a.dewormingName ?? 'Vermífugo'})`
              : `Vermífugo vence em ${daysLeft}d (${a.dewormingName ?? ''})`
          );
        }
        return { animal: a, alerts };
      })
      .slice(0, 8);
  }, [animals]);

  const handleNavigation = (id: string | null) => {
    if (!id) return;
    setIsLoading(true);
    router.push(`/dashboard/${id}`);
  };

  const handleAnimalAdded = (newAnimal: Animal) => {
    setAnimals((prev) => [newAnimal, ...prev]);
  };

  const handleInputFileValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setInputFile(file);
    setImportIssues([]);
    setParsedJson([]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allRows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
        let headerRowIndex = -1;
        for (let i = 0; i < Math.min(allRows.length, 10); i++) {
          const row = allRows[i];
          if (Array.isArray(row)) {
            // Only check first 5 columns — the ID column is always near the start.
            // Cells longer than 30 chars are description rows, not header rows.
            const hasBrinco = row.slice(0, 5).some((cell) => {
              if (typeof cell !== 'string' || cell.length > 30) return false;
              const norm = cell
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .toLowerCase();
              return (
                norm.includes('brinco') ||
                norm.includes('manualid') ||
                norm.includes('id manual') ||
                norm === 'id'
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
          range: headerRowIndex >= 0 ? headerRowIndex : 0,
          defval: '',
        });
        setParsedJson(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  async function handleUpload() {
    if (!inputFile || parsedJson.length === 0) return;
    setIsImporting(true);
    try {
      const res = await fetch('/api/importAnimals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedJson),
      });
      const result = await res.json();
      if (result.success) {
        toast.success('Lista cadastrada com sucesso!');
        setImportDialogOpen(false);
        setTimeout(() => window.location.reload(), 2500);
      } else {
        if (result.issues) setImportIssues(result.issues);
        toast.error('Erro na importação. Verifique os problemas listados.');
      }
    } catch {
      toast.error('Erro com o arquivo');
    } finally {
      setIsImporting(false);
    }
  }

  if (dataLoading) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-4 min-[740px]:flex min-[740px]:flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 min-w-[160px] flex-1 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-12">
          <Skeleton className="h-72 rounded-2xl xl:col-span-8" />
          <Skeleton className="h-52 rounded-2xl xl:col-span-4" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-[1400px] px-4 py-6 lg:px-6">
      {isLoading && <Loading />}

      {/* Header */}
      <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-xl font-black tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            Gerenciamento de Rebanho
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral da sua propriedade
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-foreground/30 px-4 text-sm font-medium transition-colors hover:bg-muted">
                <FaFileArrowDown size={16} />
                Importar animais
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importar animais</DialogTitle>
                <DialogDescription>
                  Use o arquivo modelo para importar os animais corretamente.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <Link
                  download="agrofinance_importacao_animais.xlsx"
                  href="/agrofinance_importacao_animais.xlsx"
                  className="flex w-max items-center gap-1 text-sm underline"
                >
                  Arquivo modelo <IoDownloadOutline />
                </Link>
                <label
                  htmlFor="doc-overview"
                  className="flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-sm"
                >
                  Escolher arquivo <FaFileArrowDown size={14} />
                </label>
                <input
                  type="file"
                  id="doc-overview"
                  className="hidden"
                  onChange={handleInputFileValue}
                  accept=".xlsx,.xls,.csv"
                />
              </div>
              {inputFile && (
                <div className="mt-3 rounded-md border p-3 text-sm">
                  <p className="font-semibold">
                    Arquivo:{' '}
                    <span className="font-normal">{inputFile.name}</span>
                  </p>
                  {parsedJson.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {parsedJson.length} animais para importar.
                    </p>
                  )}
                  {importIssues.length > 0 && (
                    <ul className="mt-2 max-h-32 overflow-y-auto rounded bg-red-50 p-2 text-xs text-red-700">
                      {importIssues.map((issue, i) => (
                        <li key={i}>
                          Linha {issue.row}: {issue.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setImportDialogOpen(false);
                    setInputFile(null);
                    setParsedJson([]);
                    setImportIssues([]);
                  }}
                >
                  Cancelar
                </Button>
                {inputFile && (
                  <Button onClick={handleUpload} disabled={isImporting}>
                    {isImporting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Importando...
                      </>
                    ) : (
                      'Cadastrar animais'
                    )}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button className="flex h-9 shrink-0 gap-2 sm:hidden">
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
            <DialogTrigger className="hidden h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex">
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
      </header>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 min-[740px]:flex min-[740px]:flex-wrap">
        <div className="min-w-[160px] flex-1 rounded-xl border-l-4 border-primary bg-white p-4 shadow-sm">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Total de animais
          </p>
          <p className="text-2xl font-black text-primary">{animals.length}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Cadastrados na fazenda
          </p>
        </div>

        <div className="min-w-[160px] flex-1 rounded-xl border-l-4 border-green-500 bg-white p-4 shadow-sm">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Animais ativos
          </p>
          <p className="text-2xl font-black text-foreground">
            {activeAnimals.length}
          </p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${animals.length ? (activeAnimals.length / animals.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <div className="min-w-[160px] flex-1 rounded-xl border-l-4 border-fuchsia-500 bg-white p-4 shadow-sm">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Vacas prenhas
          </p>
          <p className="text-2xl font-black text-foreground">
            {pregnantCows.length}
          </p>
          <p className="mt-2 text-[11px] italic text-muted-foreground">
            {pregnantCows.length === 0
              ? 'Nenhuma prenha'
              : 'Acompanhar previsão'}
          </p>
        </div>

        <div className="min-w-[160px] flex-1 rounded-xl border-l-4 border-slate-400 bg-white p-4 shadow-sm">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Vacas vazias
          </p>
          <p className="text-2xl font-black text-foreground">
            {emptyCows.length}
          </p>
          {emptyCows.length > 0 && (
            <p className="mt-2 text-[11px] text-red-500">Atenção requerida</p>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Recent Records */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm xl:col-span-8">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="font-bold text-foreground">Registros Recentes</h2>
            <Link
              href="/dashboard/animals"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Raça</th>
                  <th className="px-5 py-3">Sexo</th>
                  <th className="px-5 py-3">Nascimento</th>
                  <th className="px-5 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentAnimals.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      Nenhum animal cadastrado ainda.
                    </td>
                  </tr>
                )}
                {recentAnimals.map((animal) => (
                  <tr
                    key={animal.id}
                    className="cursor-pointer transition-colors hover:bg-muted/50"
                    onClick={() => handleNavigation(animal.id)}
                  >
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-1.5">
                        {getStatusNode(animal.status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-primary">
                      {animal.manualId}
                    </td>
                    <td className="px-5 py-3">
                      {animal.breed.charAt(0).toUpperCase() +
                        animal.breed.slice(1)}
                    </td>
                    <td className="px-5 py-3">
                      {animal.gender === 'male' || animal.gender === 'macho'
                        ? 'Macho'
                        : 'Fêmea'}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {animal.birthDate
                        ? new Date(animal.birthDate).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="rounded bg-muted px-2 py-1 text-xs font-bold transition-colors hover:bg-primary hover:text-primary-foreground">
                        <LiaExternalLinkAltSolid className="inline size-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {animals.length > 6 && (
            <div className="border-t px-6 py-3">
              <Link
                href="/dashboard/animals"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Ver todos os {animals.length} animais →
              </Link>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="flex flex-col gap-5 xl:col-span-4">
          {/* Alertas de Revacinação */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <IoNotificationsOutline className="size-4 text-amber-500" />
              <h3 className="font-bold text-foreground">
                Alertas de Revacinação
              </h3>
            </div>
            {vaccinationAlerts.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Nenhuma vacina ou vermífugo expirando nos próximos 30 dias.
              </p>
            ) : (
              <div className="space-y-2">
                {vaccinationAlerts.map(({ animal, alerts }) => (
                  <button
                    key={animal.id}
                    type="button"
                    onClick={() => handleNavigation(animal.id)}
                    className="w-full rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-left text-xs transition-colors hover:bg-amber-100"
                  >
                    <p className="font-semibold text-foreground">
                      {animal.manualId} — {animal.breed}
                    </p>
                    {alerts.map((alert, i) => (
                      <p key={i} className="text-amber-700">
                        {alert}
                      </p>
                    ))}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
