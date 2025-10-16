'use client';
import { Animal } from '@/types/animal';
import { RadioForm } from './radioForm';
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './sheet';
import React, { SetStateAction, useState } from 'react';
import { InputForm } from './inputForm';
import { SelectForm } from './selectForm';

interface FiltersProps {
  originalAnimals: Animal[];
  listAnimals: Animal[];
  setListAnimals: React.Dispatch<SetStateAction<Animal[]>>;
}

export const Filters: React.FC<FiltersProps> = ({
  originalAnimals,
  listAnimals,
  setListAnimals,
}) => {
  const breedArray = [
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

  const [typeFilters, setTypeFilters] = useState({
    status: {
      active: false,
      inactive: false,
      dead: false,
      sold: false,
    },
    gender: {
      male: false,
      female: false,
    },
    age: {
      less12: false,
      between12And24: false,
      between24And36: false,
      between36And120: false,
      more120: false,
    },
    weight: {
      '300kg': false,
      '500kg': false,
      '500kg+': false,
    },
    date: {
      initialDate: '',
      finalDate: '',
    },
    reproductiveStatus: {
      empty: false,
      pregnant: false,
      waiting: false,
      pev: false,
    },
    breed: '',
  });

  const updateListAndInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setListAnimals(originalAnimals);
    handleInputsValues(event);
  };

  const handleInputsValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const inputValue = type === 'checkbox' ? checked : value;

    setTypeFilters((prevFilters) => {
      const [filterType, filterName] = name.split('.') as [
        keyof typeof typeFilters,
        string,
      ];

      if (filterType === 'reproductiveStatus') {
        return {
          ...prevFilters,
          reproductiveStatus: {
            empty: false,
            pregnant: false,
            waiting: false,
            pev: false,
            [value]: true,
          },
        };
      } else if (filterType === 'breed') {
        return {
          ...prevFilters,
          breed: value,
        };
      }

      return {
        ...prevFilters,
        [filterType]: {
          ...prevFilters[filterType],
          [filterName]: inputValue,
        },
      };
    });
  };

  const filterTable = () => {
    const activeStatusFilters = Object.entries(typeFilters.status)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const filtered = listAnimals.filter((animal) => {
      const age = new Date(animal.birthDate);
      const today = new Date();
      const ageInMonths =
        (today.getFullYear() - age.getFullYear()) * 12 +
        (today.getMonth() - age.getMonth());

      const matchesStatus =
        activeStatusFilters.length === 0 ||
        activeStatusFilters.includes(animal.status);

      const matchesGender =
        (!typeFilters.gender.male && !typeFilters.gender.female) ||
        (typeFilters.gender.male && animal.gender === 'male') ||
        (typeFilters.gender.female && animal.gender === 'female');

      const matchesAge =
        (!typeFilters.age.less12 &&
          !typeFilters.age.between12And24 &&
          !typeFilters.age.between24And36 &&
          !typeFilters.age.between36And120 &&
          !typeFilters.age.more120) ||
        (typeFilters.age.less12 && ageInMonths <= 12) ||
        (typeFilters.age.between12And24 &&
          ageInMonths >= 13 &&
          ageInMonths <= 24) ||
        (typeFilters.age.between24And36 &&
          ageInMonths >= 25 &&
          ageInMonths <= 36) ||
        (typeFilters.age.between36And120 &&
          ageInMonths >= 37 &&
          ageInMonths <= 120) ||
        (typeFilters.age.more120 && ageInMonths > 120);

      const matchesWeight =
        (!typeFilters.weight['300kg'] &&
          !typeFilters.weight['500kg'] &&
          !typeFilters.weight['500kg+']) ||
        (typeFilters.weight['300kg'] && animal.weight <= 300) ||
        (typeFilters.weight['500kg'] &&
          animal.weight >= 301 &&
          animal.weight <= 499) ||
        (typeFilters.weight['500kg+'] && animal.weight >= 500);

      const matchesDate =
        (!typeFilters.date.finalDate && !typeFilters.date.initialDate) ||
        (typeFilters.date.initialDate &&
          animal.birthDate >= new Date(typeFilters.date.initialDate) &&
          typeFilters.date.finalDate &&
          animal.birthDate <= new Date(typeFilters.date.finalDate));

      const matchesReproductive =
        (!typeFilters.reproductiveStatus.empty &&
          !typeFilters.reproductiveStatus.pregnant &&
          !typeFilters.reproductiveStatus.waiting &&
          !typeFilters.reproductiveStatus.pev) ||
        (typeFilters.reproductiveStatus &&
          animal.reproductiveStatus === 'empty') ||
        (typeFilters.reproductiveStatus &&
          animal.reproductiveStatus === 'pregnant') ||
        (typeFilters.reproductiveStatus &&
          animal.reproductiveStatus === 'waiting') ||
        (typeFilters.reproductiveStatus && animal.reproductiveStatus === 'pev');

      const matchesBreed =
        !typeFilters.breed ||
        (typeFilters.breed && animal.breed === typeFilters.breed);

      return (
        matchesStatus &&
        matchesGender &&
        matchesAge &&
        matchesWeight &&
        matchesDate &&
        matchesReproductive &&
        matchesBreed
      );
    });
    setListAnimals(filtered);
  };

  const clearFilters = () => {
    setTypeFilters({
      status: {
        active: false,
        inactive: false,
        dead: false,
        sold: false,
      },
      gender: {
        male: false,
        female: false,
      },
      age: {
        less12: false,
        between12And24: false,
        between24And36: false,
        between36And120: false,
        more120: false,
      },
      weight: {
        '300kg': false,
        '500kg': false,
        '500kg+': false,
      },
      date: {
        initialDate: '',
        finalDate: '',
      },
      reproductiveStatus: {
        empty: false,
        pregnant: false,
        waiting: false,
        pev: false,
      },
      breed: '',
    });
    setListAnimals(originalAnimals);
  };

  return (
    <SheetContent
      side={'bottom'}
      className="h-96 space-y-5 overflow-y-auto px-2 pt-5"
    >
      <SheetHeader>
        <SheetTitle>Filtar as informações na tabela</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-semibold">Status:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <RadioForm
              label="Ativos"
              htmlFor="status.active"
              id="status.active"
              name="status.active"
              type="checkbox"
              value="active"
              checked={typeFilters.status.active}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="Inativos"
              htmlFor="status.inactive"
              id="status.inactive"
              name="status.inactive"
              type="checkbox"
              value="inactive"
              checked={typeFilters.status.inactive}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="Mortos"
              htmlFor="status.dead"
              id="status.dead"
              name="status.dead"
              type="checkbox"
              value="dead"
              checked={typeFilters.status.dead}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="Vendidos"
              htmlFor="status.sold"
              id="status.sold"
              name="status.sold"
              type="checkbox"
              value="sold"
              checked={typeFilters.status.sold}
              onChange={updateListAndInput}
            />
          </div>
        </div>
        <div>
          <p className="font-semibold">Gênero:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <RadioForm
              label="Macho"
              htmlFor="gender.male"
              id="gender.male"
              name="gender.male"
              type="checkbox"
              value="male"
              checked={typeFilters.gender.male}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="Fêmea"
              htmlFor="gender.female"
              id="gender.female"
              name="gender.female"
              type="checkbox"
              value="female"
              checked={typeFilters.gender.female}
              onChange={updateListAndInput}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold">Idade:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <RadioForm
              label="0 - 12m"
              htmlFor="age.less12"
              id="age.less12"
              name="age.less12"
              type="checkbox"
              value="11"
              checked={typeFilters.age.less12}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="12m - 24m"
              htmlFor="age.between12And24"
              id="age.between12And24"
              name="age.between12And24"
              type="checkbox"
              value="23"
              checked={typeFilters.age.between12And24}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="24m - 36m"
              htmlFor="age.between24And36"
              id="age.between24And36"
              name="age.between24And36"
              type="checkbox"
              value="35"
              checked={typeFilters.age.between24And36}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="36m - 120m"
              htmlFor="age.between36And120"
              id="age.between36And120"
              name="age.between36And120"
              type="checkbox"
              value="119"
              checked={typeFilters.age.between36And120}
              onChange={updateListAndInput}
            />

            <RadioForm
              label="+ 120m"
              htmlFor="age.more120"
              id="age.more120"
              name="age.more120"
              type="checkbox"
              value="121"
              checked={typeFilters.age.more120}
              onChange={updateListAndInput}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold">Peso:</p>
          <div className="flex flex-col gap-y-2">
            <RadioForm
              label="Até 300kg"
              htmlFor="weight.300kg"
              id="weight.300kg"
              name="weight.300kg"
              type="checkbox"
              value="300kg"
              checked={typeFilters.weight['300kg']}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="Entre 300kg e 500kg"
              htmlFor="weight.500kg"
              id="weight.500kg"
              name="weight.500kg"
              type="checkbox"
              value="500kg"
              checked={typeFilters.weight['500kg']}
              onChange={updateListAndInput}
            />
            <RadioForm
              label="+ 500kg"
              htmlFor="weight.500kg+"
              id="weight.500kg+"
              name="weight.500kg+"
              type="checkbox"
              value="500kg+"
              checked={typeFilters.weight['500kg+']}
              onChange={updateListAndInput}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold">Mês e ano de nascimento:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <InputForm
              label="Data inicial: "
              htmlFor="date.initialDate"
              id="date.initialDate"
              name="date.initialDate"
              type="month"
              value={typeFilters.date.initialDate}
              onChange={updateListAndInput}
            />
            <InputForm
              label="Data final: "
              htmlFor="date.finalDate"
              id="date.finalDate"
              name="date.finalDate"
              type="month"
              value={typeFilters.date.finalDate}
              onChange={updateListAndInput}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold">Status de reprodução:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <SelectForm
              label=""
              htmlFor="reproductiveStatus"
              id="reproductiveStatus"
              name="reproductiveStatus"
              value={
                Object.keys(typeFilters.reproductiveStatus).find(
                  (key) =>
                    typeFilters.reproductiveStatus[
                      key as keyof typeof typeFilters.reproductiveStatus
                    ]
                ) || ''
              }
              onChange={updateListAndInput}
              defaultOption="Status do animal"
              options={[
                { label: 'Todas os status', value: '' },
                { label: 'Vazia', value: 'empty' },
                { label: 'Prenha', value: 'pregnant' },
                { label: 'Em espera', value: 'waiting' },
                { label: 'PEV', value: 'pev' },
              ]}
            />
          </div>
        </div>

        <div>
          <p className="font-semibold">Raça:</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <SelectForm
              htmlFor="breed"
              label=""
              name="breed"
              id="breed"
              value={typeFilters.breed}
              onChange={updateListAndInput}
              options={[
                { label: 'Todas as raças', value: '' },
                ...breedArray.map((breed) => ({
                  label: breed,
                  value: breed,
                })),
              ]}
              defaultOption="Escolha a raça"
            />
          </div>
        </div>
      </div>
      <SheetFooter className="flex w-full flex-row items-center justify-between sm:space-x-5">
        <SheetClose
          className="rounded-sm border p-2 shadow-md"
          onClick={clearFilters}
        >
          Limpar filtros
        </SheetClose>
        <SheetClose
          onClick={filterTable}
          className="ml-auto w-max rounded-sm bg-foreground p-2 text-background shadow-md"
        >
          Filtrar tabela
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};
