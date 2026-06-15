'use client';
import { Animal } from '@/types/animal';
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './sheet';
import React, { SetStateAction, useState } from 'react';

interface FiltersProps {
  originalAnimals: Animal[];
  listAnimals: Animal[];
  setListAnimals: React.Dispatch<SetStateAction<Animal[]>>;
}

const breedArray = [
  'Cruzado','Nelore','Angus','Hereford','Brangus','Brahman','Tabapuã','Charolês',
  'Senepol','Simental','Guzerá','Holandesa','Jersey','Girolando','Gir Leiteiro',
  'Pardo-Suíço','Ayrshire','Guernsey','Simbrasil','Sindi','Indubrasil','Canchim','Red Poll',
];

const defaultFilters = {
  status: { active: false, inactive: false, dead: false, sold: false, lost: false, trash: false },
  gender: { male: false, female: false },
  age: { less3: false, between3And12: false, between12And24: false, between24And36: false, between36And120: false, more120: false },
  weight: { '300kg': false, '500kg': false, '600kg': false, '600kg+': false },
  date: { initialDate: '', finalDate: '' },
  reproductiveStatus: { empty: false, pregnant: false, waiting: false, pev: false },
  breed: '',
  andrological: { positive: false, negative: false, notDone: false },
};

export const Filters: React.FC<FiltersProps> = ({ originalAnimals, listAnimals, setListAnimals }) => {
  const [typeFilters, setTypeFilters] = useState(defaultFilters);

  const toggle = <T extends object>(group: T, key: keyof T): T => ({
    ...group,
    [key]: !group[key],
  });

  const toggleStatus = (key: keyof typeof defaultFilters.status) =>
    setTypeFilters((prev) => ({ ...prev, status: toggle(prev.status, key) }));

  const toggleGender = (key: keyof typeof defaultFilters.gender) =>
    setTypeFilters((prev) => ({
      ...prev,
      gender: { male: false, female: false, [key]: !prev.gender[key] },
    }));

  const toggleAge = (key: keyof typeof defaultFilters.age) =>
    setTypeFilters((prev) => ({ ...prev, age: toggle(prev.age, key) }));

  const toggleWeight = (key: keyof typeof defaultFilters.weight) =>
    setTypeFilters((prev) => ({
      ...prev,
      weight: { '300kg': false, '500kg': false, '600kg': false, '600kg+': false, [key]: !prev.weight[key as keyof typeof defaultFilters.weight] },
    }));

  const setReproductive = (val: string) =>
    setTypeFilters((prev) => ({
      ...prev,
      reproductiveStatus: { empty: false, pregnant: false, waiting: false, pev: false, [val]: true },
    }));

  const setAndrological = (val: string) =>
    setTypeFilters((prev) => ({
      ...prev,
      andrological: { positive: false, negative: false, notDone: false, [val]: true },
    }));

  const filterTable = () => {
    const activeStatusFilters = Object.entries(typeFilters.status)
      .filter(([, v]) => v)
      .map(([k]) => k);

    // Always filter from the FULL original list — filters should include neonates when selected
    // (Only the default listing removes neonates automatically)
    const base = originalAnimals;

    const filtered = base.filter((animal) => {
      // birthDate comes as a string after JSON serialization — always convert
      const birthDate = new Date(animal.birthDate);
      const today = new Date();
      // Day-accurate age in months
      const ageInMonths =
        (today.getFullYear() - birthDate.getFullYear()) * 12 +
        (today.getMonth() - birthDate.getMonth()) +
        (today.getDate() < birthDate.getDate() ? -1 : 0);

      const matchesStatus =
        activeStatusFilters.length === 0 || activeStatusFilters.includes(animal.status);

      const matchesGender =
        (!typeFilters.gender.male && !typeFilters.gender.female) ||
        (typeFilters.gender.male && animal.gender === 'male') ||
        (typeFilters.gender.female && animal.gender === 'female');

      const anyAge = Object.values(typeFilters.age).some(Boolean);
      const matchesAge =
        !anyAge ||
        (typeFilters.age.less3 && ageInMonths <= 3) ||
        (typeFilters.age.between3And12 && ageInMonths > 3 && ageInMonths <= 12) ||
        (typeFilters.age.between12And24 && ageInMonths > 12 && ageInMonths <= 24) ||
        (typeFilters.age.between24And36 && ageInMonths > 24 && ageInMonths <= 36) ||
        (typeFilters.age.between36And120 && ageInMonths > 36 && ageInMonths <= 120) ||
        (typeFilters.age.more120 && ageInMonths > 120);

      const anyWeight = Object.values(typeFilters.weight).some(Boolean);
      const matchesWeight =
        !anyWeight ||
        (typeFilters.weight['300kg'] && animal.weight <= 300) ||
        (typeFilters.weight['500kg'] && animal.weight > 300 && animal.weight <= 500) ||
        (typeFilters.weight['600kg'] && animal.weight > 500 && animal.weight <= 599) ||
        (typeFilters.weight['600kg+'] && animal.weight >= 600);

      // Date input type="month" gives "YYYY-MM" — build proper Date boundaries
      let matchesDate = true;
      if (typeFilters.date.initialDate || typeFilters.date.finalDate) {
        const birthMs = birthDate.getTime();
        if (typeFilters.date.initialDate) {
          const start = new Date(typeFilters.date.initialDate + '-01').getTime();
          if (birthMs < start) matchesDate = false;
        }
        if (matchesDate && typeFilters.date.finalDate) {
          const [fy, fm] = typeFilters.date.finalDate.split('-').map(Number);
          // Last millisecond of the final month
          const end = new Date(fy, fm, 0, 23, 59, 59, 999).getTime();
          if (birthMs > end) matchesDate = false;
        }
      }

      const matchesReproductive =
        (!typeFilters.reproductiveStatus.empty &&
          !typeFilters.reproductiveStatus.pregnant &&
          !typeFilters.reproductiveStatus.waiting &&
          !typeFilters.reproductiveStatus.pev) ||
        (typeFilters.reproductiveStatus.empty && animal.reproductiveStatus === 'empty') ||
        (typeFilters.reproductiveStatus.pregnant && animal.reproductiveStatus === 'pregnant') ||
        (typeFilters.reproductiveStatus.waiting && animal.reproductiveStatus === 'waiting') ||
        (typeFilters.reproductiveStatus.pev && animal.reproductiveStatus === 'pev');

      const matchesBreed = !typeFilters.breed || animal.breed === typeFilters.breed;

      const anyAndro =
        typeFilters.andrological.positive ||
        typeFilters.andrological.negative ||
        typeFilters.andrological.notDone;
      const matchesAndrological =
        !anyAndro ||
        (typeFilters.andrological.positive && animal.andrological === 'positive') ||
        (typeFilters.andrological.negative && animal.andrological === 'negative') ||
        (typeFilters.andrological.notDone && animal.andrological === 'notDone');

      return (
        matchesStatus &&
        matchesGender &&
        matchesAge &&
        matchesWeight &&
        matchesDate &&
        matchesReproductive &&
        matchesBreed &&
        matchesAndrological
      );
    });

    setListAnimals(filtered);
  };

  const clearFilters = () => {
    setTypeFilters(defaultFilters);
    const withoutNeonates = originalAnimals.filter((a) => a.category !== 'neonate');
    setListAnimals(withoutNeonates);
  };

  const PillBtn = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-white text-foreground hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  );

  const GenderBtn = ({
    label,
    icon,
    active,
    onClick,
  }: {
    label: string;
    icon: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-white text-foreground hover:border-primary/50'
      }`}
    >
      <span>{icon}</span> {label}
    </button>
  );

  const AgeBox = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-white text-foreground hover:border-primary/40'
      }`}
    >
      {active && (
        <span className="flex size-4 items-center justify-center rounded bg-primary">
          <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      )}
      {!active && <span className="size-4 rounded border border-border bg-white" />}
      {label}
    </button>
  );

  const WeightRadio = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors ${
        active
          ? 'border-primary bg-primary/5 font-semibold text-primary'
          : 'border-border bg-white text-foreground hover:border-primary/40'
      }`}
    >
      {label}
      <span className={`flex size-4 items-center justify-center rounded-full border-2 transition-colors ${active ? 'border-primary' : 'border-muted-foreground/40'}`}>
        {active && <span className="size-2 rounded-full bg-primary" />}
      </span>
    </button>
  );

  const sectionLabel = (text: string) => (
    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{text}</p>
  );

  const reproductiveValue = Object.keys(typeFilters.reproductiveStatus).find(
    (k) => typeFilters.reproductiveStatus[k as keyof typeof typeFilters.reproductiveStatus]
  ) || '';

  const andrologicalValue = Object.keys(typeFilters.andrological).find(
    (k) => typeFilters.andrological[k as keyof typeof typeFilters.andrological]
  ) || '';

  return (
    <SheetContent side="right" className="flex w-11/12 flex-col gap-0 p-0 md:w-[400px]">
      {/* Header */}
      <SheetHeader className="shrink-0 border-b px-5 py-4">
        <SheetTitle className="text-base font-bold">Filtros Avançados</SheetTitle>
        <p className="text-xs text-muted-foreground">Refine sua busca no rebanho</p>
      </SheetHeader>

      {/* Scrollable body */}
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
        {/* Status */}
        <div>
          {sectionLabel('Status do Animal')}
          <div className="flex flex-wrap gap-2">
            <PillBtn label="Ativos" active={typeFilters.status.active} onClick={() => toggleStatus('active')} />
            <PillBtn label="Inativos" active={typeFilters.status.inactive} onClick={() => toggleStatus('inactive')} />
            <PillBtn label="Mortos" active={typeFilters.status.dead} onClick={() => toggleStatus('dead')} />
            <PillBtn label="Vendidos" active={typeFilters.status.sold} onClick={() => toggleStatus('sold')} />
            <PillBtn label="Perdida" active={typeFilters.status.lost} onClick={() => toggleStatus('lost')} />
            <PillBtn label="Descarte" active={typeFilters.status.trash} onClick={() => toggleStatus('trash')} />
          </div>
        </div>

        {/* Gender */}
        <div>
          {sectionLabel('Gênero')}
          <div className="flex gap-3">
            <GenderBtn label="Macho" icon="♂" active={typeFilters.gender.male} onClick={() => toggleGender('male')} />
            <GenderBtn label="Fêmea" icon="♀" active={typeFilters.gender.female} onClick={() => toggleGender('female')} />
          </div>
        </div>

        {/* Age */}
        <div>
          {sectionLabel('Idade (Meses)')}
          <div className="grid grid-cols-2 gap-2">
            <AgeBox label="0 – 3m (Neonatos)" active={typeFilters.age.less3} onClick={() => toggleAge('less3')} />
            <AgeBox label="3 – 12m (Bezerros)" active={typeFilters.age.between3And12} onClick={() => toggleAge('between3And12')} />
            <AgeBox label="12m – 24m" active={typeFilters.age.between12And24} onClick={() => toggleAge('between12And24')} />
            <AgeBox label="24m – 36m" active={typeFilters.age.between24And36} onClick={() => toggleAge('between24And36')} />
            <AgeBox label="36m – 120m" active={typeFilters.age.between36And120} onClick={() => toggleAge('between36And120')} />
            <AgeBox label="+120 meses" active={typeFilters.age.more120} onClick={() => toggleAge('more120')} />
          </div>
        </div>

        {/* Weight */}
        <div>
          {sectionLabel('Peso')}
          <div className="space-y-2">
            <WeightRadio label="Até 300kg" active={typeFilters.weight['300kg']} onClick={() => toggleWeight('300kg')} />
            <WeightRadio label="Entre 300kg e 500kg" active={typeFilters.weight['500kg']} onClick={() => toggleWeight('500kg')} />
            <WeightRadio label="Entre 500kg e 599kg" active={typeFilters.weight['600kg']} onClick={() => toggleWeight('600kg')} />
            <WeightRadio label="+600kg" active={typeFilters.weight['600kg+']} onClick={() => toggleWeight('600kg+')} />
          </div>
        </div>

        {/* Birth date range */}
        <div>
          {sectionLabel('Mês/Ano de Nascimento')}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Data inicial</label>
              <input
                type="month"
                value={typeFilters.date.initialDate}
                onChange={(e) => setTypeFilters((prev) => ({ ...prev, date: { ...prev.date, initialDate: e.target.value } }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Data final</label>
              <input
                type="month"
                value={typeFilters.date.finalDate}
                onChange={(e) => setTypeFilters((prev) => ({ ...prev, date: { ...prev.date, finalDate: e.target.value } }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Reproductive status */}
        <div>
          {sectionLabel('Status de Reprodução')}
          <select
            value={reproductiveValue}
            onChange={(e) => setReproductive(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="">Todos os status</option>
            <option value="empty">Vazia</option>
            <option value="pregnant">Prenha</option>
            <option value="waiting">Em espera</option>
            <option value="pev">PEV</option>
          </select>
        </div>

        {/* Breed */}
        <div>
          {sectionLabel('Raça')}
          <select
            value={typeFilters.breed}
            onChange={(e) => setTypeFilters((prev) => ({ ...prev, breed: e.target.value }))}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="">Todas as raças</option>
            {breedArray.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Andrological */}
        <div className="pb-2">
          {sectionLabel('Status do Andrológico')}
          <select
            value={andrologicalValue}
            onChange={(e) => setAndrological(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="">Todos os status</option>
            <option value="positive">Positivo</option>
            <option value="negative">Negativo</option>
            <option value="notDone">Não realizado</option>
          </select>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="shrink-0 space-y-2 border-t bg-background px-5 py-4">
        <SheetClose
          onClick={filterTable}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          Aplicar Filtros
        </SheetClose>
        <SheetClose
          onClick={clearFilters}
          className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          Limpar Todos os Filtros
        </SheetClose>
      </div>
    </SheetContent>
  );
};
