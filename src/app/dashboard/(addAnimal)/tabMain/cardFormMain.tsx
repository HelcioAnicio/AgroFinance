'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Animal } from '@/types/animal';
import { InputForm } from '@/components/ui/inputForm';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';
import { toast } from 'sonner';

interface CardFormMainProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  breedArray?: string[];
  setTabValue: (value: string) => void;
  setAllDataForm: React.Dispatch<React.SetStateAction<Animal>>;
}

export const CardFormMain: React.FC<CardFormMainProps> = ({
  animals,
  allDataForm,
  handleInputValues,
  setTabValue,
  setAllDataForm,
}) => {
  const checked = animals.find(
    (animal) =>
      animal?.manualId?.toLowerCase() === allDataForm?.manualId?.toLowerCase()
  );

  useEffect(() => {
    if (checked !== undefined) {
      setTimeout(() => toast.warning('Encontrado um animal com esse ID'), 1000);
    } else if (allDataForm.manualId === '') {
      setTimeout(() => toast.warning('Favor preencher o ID'), 1000);
    } else if (checked === undefined && allDataForm.manualId) {
      setTimeout(() => toast.success('ID válido'), 1000);
    }
  }, [allDataForm.manualId, checked]);

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (checked) {
      toast.error('Favor alterar o ID do animal');
    } else {
      setTabValue('reproducao');
    }
  };

  const cleanAllDataForm = () => {
    setTabValue('principais');
    setAllDataForm({} as Animal);
  };

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

  const [category, setCategory] = useState<string>('');
  useEffect(() => {
    if (allDataForm.birthDate) {
      const birthDate = new Date(allDataForm.birthDate);
      const ageInMonths =
        (new Date().getFullYear() - birthDate.getFullYear()) * 12 +
        new Date().getMonth() -
        birthDate.getMonth();
      if (ageInMonths <= 8 && allDataForm.birthDate !== null) {
        setCategory('neonate');
      } else if (ageInMonths <= 12) {
        setCategory('calf');
      } else if (ageInMonths <= 24) {
        setCategory(allDataForm.gender === 'male' ? 'steer' : 'steer');
      } else if (ageInMonths <= 36) {
        setCategory(allDataForm.gender === 'male' ? 'steer' : 'cow');
      } else if (ageInMonths >= 37 && ageInMonths <= 120) {
        setCategory(allDataForm.gender === 'male' ? 'ox' : 'cow');
      } else {
        setCategory(allDataForm.gender === 'male' ? 'old ox' : 'old cow');
      }
      if (allDataForm.category !== category) {
        setAllDataForm((prev) => ({ ...prev, category }));
      }
    }
  }, [
    category,
    allDataForm.birthDate,
    allDataForm.gender,
    allDataForm.category,
    setAllDataForm,
  ]);

  return (
    <Card className="min-h-80">
      <CardHeader className="py-2">
        <CardTitle>Informações principais</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <form action="" method="post" onSubmit={sendForm}>
          <section className="flex flex-col gap-4">
            <InputForm
              classNameDiv="flex items-end gap-1"
              htmlFor="manualId"
              label="Id do animal:"
              type="text"
              name="manualId"
              id="manualId"
              value={allDataForm.manualId ?? ''}
              onChange={handleInputValues}
            />

            <div className="flex items-center gap-2">
              <span className="text-secondary">Sexo:</span>
              <RadioForm
                htmlFor="female"
                label="Fêmea"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={allDataForm.gender === 'female'}
                onChange={handleInputValues}
              />
              <RadioForm
                htmlFor="male"
                label="Macho"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={allDataForm.gender === 'male'}
                onChange={handleInputValues}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputForm
                classNameInput="max-w-none"
                htmlFor="birthDate"
                label="Nascimento:"
                type="date"
                name="birthDate"
                id="birthDate"
                value={
                  allDataForm.birthDate
                    ? new Date(allDataForm.birthDate)
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                onChange={handleInputValues}
              />

              <InputForm
                classNameDiv="flex flex-col"
                classNameInput="max-w-28"
                htmlFor="weight"
                label="Peso:"
                type="number"
                name="weight"
                id="weight"
                value={allDataForm.weight?.toString() ?? ''}
                onChange={handleInputValues}
              />

              <SelectForm
                htmlFor="breed"
                label="Raça:"
                name="breed"
                id="breed"
                value={allDataForm.breed ?? ''}
                onChange={handleInputValues}
                options={breedArray.map((breed) => ({
                  label: breed,
                  value: breed,
                }))}
                defaultOption="Escolha a raça"
              />

              <div className="flex flex-col gap-1">
                <span className="text-secondary">Categoria:</span>

                <p>
                  {allDataForm.category === 'neonate'
                    ? 'Neonate'
                    : allDataForm.category === 'calf'
                      ? 'Bezerro'
                      : allDataForm.category === 'steer' &&
                          allDataForm.gender === 'male'
                        ? 'Garrote'
                        : allDataForm.category === 'steer' &&
                            allDataForm.gender === 'female'
                          ? 'Novilha'
                          : allDataForm.category === 'ox'
                            ? 'Boi'
                            : allDataForm.category === 'cow'
                              ? 'Vaca'
                              : allDataForm.category === 'old ox'
                                ? 'Boi velho'
                                : allDataForm.category === 'old cow'
                                  ? 'Vaca velha'
                                  : 'Não informada'}
                </p>
              </div>

              <SelectForm
                htmlFor="motherId"
                label="Mãe:"
                name="motherId"
                id="motherId"
                value={allDataForm.motherId ?? ''}
                onChange={handleInputValues}
                options={[
                  { label: 'Comercial', value: 'comercial' },
                  ...animals
                    .filter(
                      (animal) =>
                        animal.gender === 'female' &&
                        animal.category !== 'steer' &&
                        animal.category !== 'neonate' &&
                        animal.status === 'active'
                    )
                    .map((animal) => ({
                      label: `Vaca ${animal.manualId}`,
                      value: animal.id,
                    })),
                ]}
                defaultOption="Escolha a mãe"
              />

              <SelectForm
                htmlFor="fatherId"
                label="Pai:"
                name="fatherId"
                id="fatherId"
                value={allDataForm.fatherId ?? ''}
                onChange={handleInputValues}
                options={[
                  { label: 'Comercial', value: 'comercial' },
                  ...animals
                    .filter(
                      (animal) =>
                        animal.gender === 'male' &&
                        animal.category.includes('bull') &&
                        animal.status === 'active'
                    )
                    .map((animal) => ({
                      label: `Touro ${animal.manualId}`,
                      value: animal.id,
                    })),
                ]}
                defaultOption="Escolha o pai"
              />
            </div>
            <div className="flex w-full flex-row justify-end gap-5">
              <Button
                className="bg-card text-card-foreground hover:bg-primary-foreground"
                onClick={() => cleanAllDataForm()}
              >
                Cancelar
              </Button>
              <Button type="submit">Próximo</Button>
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};
