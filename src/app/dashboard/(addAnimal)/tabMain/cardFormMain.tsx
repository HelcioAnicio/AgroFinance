'use client';

import { ArrowRight, RotateCcw, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Animal } from '@/types/animal';
import { InputForm } from '@/components/ui/inputForm';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';
import { toast } from 'sonner';
import { weightRecordOptions } from '@/lib/weightHistory';

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

  const [isReproductive, setIsReproductive] = useState<boolean>(false);

  const statusLabels = {
    active: 'Ativado',
    inactive: 'Inativado',
    dead: 'Morto',
    sold: 'Vendido',
    lost: 'Perdido',
    trash: 'Descartado',
  };

  const cleanAllDataForm = () => {
    setTabValue('principais');
    setAllDataForm({} as Animal);
    setIsReproductive(false);
  };

  useEffect(() => {
    if (allDataForm.birthDate) {
      const birthDate = new Date(allDataForm.birthDate);
      const ageInMonths =
        (new Date().getFullYear() - birthDate.getFullYear()) * 12 +
        new Date().getMonth() -
        birthDate.getMonth();

      let newCategory: string;

      if (ageInMonths <= 8 && allDataForm.birthDate !== null) {
        newCategory = 'neonate';
      } else if (ageInMonths <= 12) {
        newCategory = 'calf';
      } else if (ageInMonths <= 24) {
        newCategory = 'steer';
      } else if (ageInMonths <= 36) {
        newCategory = allDataForm.gender === 'male' ? 'steer' : 'cow';
      } else if (ageInMonths >= 37 && ageInMonths <= 120) {
        if (allDataForm.gender === 'male') {
          newCategory = isReproductive ? 'bull' : 'ox';
        } else {
          newCategory = 'cow';
        }
      } else {
        if (allDataForm.gender === 'male') {
          newCategory = isReproductive ? 'old bull' : 'old ox';
        } else {
          newCategory = 'old cow';
        }
      }

      if (allDataForm.category !== newCategory) {
        setAllDataForm((prev) => ({ ...prev, category: newCategory }));
      }
    }
  }, [
    allDataForm.birthDate,
    allDataForm.gender,
    allDataForm.category,
    isReproductive,
    setAllDataForm,
  ]);

  useEffect(() => {
    if (allDataForm.gender !== 'male' && isReproductive) {
      setIsReproductive(false);
    }
  }, [allDataForm.gender, isReproductive]);

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="rounded-md border border-border/70 bg-white px-4 py-4 shadow-sm">
        <CardTitle className="flex items-center gap-3 text-base font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <SquarePen className="h-4 w-4" />
          </span>
          Etapa 1: Informações Principais
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-4">
        <form action="" method="post" onSubmit={sendForm}>
          <section className="flex flex-col gap-5">
            <div className="grid gap-4 rounded-md border border-border/70 bg-white p-4 shadow-sm sm:grid-cols-2">
              <InputForm
                htmlFor="manualId"
                label="Id do animal:"
                type="text"
                name="manualId"
                id="manualId"
                value={allDataForm.manualId ?? ''}
                onChange={handleInputValues}
              />

              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
                  Sexo:
                </span>
                <div className="grid grid-cols-2 gap-2">
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
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
                  Reprodutivo:
                </span>
                <label className="flex h-11 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm shadow-sm">
                  <input
                    type="checkbox"
                    id="isReproductive"
                    name="isReproductive"
                    checked={isReproductive}
                    onChange={(event) =>
                      setIsReproductive(event.target.checked)
                    }
                    disabled={
                      !allDataForm.gender || allDataForm.gender !== 'male'
                    }
                    className="h-4 w-4 accent-primary"
                  />
                  <span
                    className={
                      !allDataForm.gender || allDataForm.gender !== 'male'
                        ? 'text-muted-foreground'
                        : ''
                    }
                  >
                    Reprodutivo
                  </span>
                </label>
              </div>

              <SelectForm
                htmlFor="status"
                label="Status:"
                name="status"
                id="status"
                value={allDataForm.status ?? ''}
                onChange={handleInputValues}
                options={[
                  { label: 'Ativo', value: 'active' },
                  { label: 'Inativo', value: 'inactive' },
                  { label: 'Morto', value: 'dead' },
                  { label: 'Vendido', value: 'sold' },
                  { label: 'Perdida', value: 'lost' },
                  { label: 'Descarte', value: 'trash' },
                ]}
                defaultOption="Escolha o status"
              />
              {allDataForm.status && allDataForm.status !== 'active' && (
                <InputForm
                  classNameDiv="flex flex-col"
                  classNameInput="max-w-none"
                  htmlFor="statusChangeDate"
                  label={`Quando foi ${statusLabels[allDataForm.status as keyof typeof statusLabels] || 'alterado'}:`}
                  type="date"
                  name="statusChangeDate"
                  id="statusChangeDate"
                  value={
                    allDataForm.statusChangeDate
                      ? new Date(allDataForm.statusChangeDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={handleInputValues}
                />
              )}
              <SelectForm
                htmlFor="bodyConditionScore"
                label="ECC:"
                name="bodyConditionScore"
                id="bodyConditionScore"
                value={allDataForm.bodyConditionScore ?? ''}
                onChange={handleInputValues}
                options={scores.map((score) => ({
                  label: `ECC - ${score}`,
                  value: score,
                }))}
                defaultOption="Escolha o ECC"
              />
            </div>

            <div className="grid gap-4 rounded-md border border-border/70 bg-white p-4 shadow-sm sm:grid-cols-2">
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
                htmlFor="weight"
                label="Peso:"
                type="number"
                name="weight"
                id="weight"
                value={allDataForm.weight?.toString() ?? ''}
                onChange={handleInputValues}
              />
              <SelectForm
                htmlFor="weightRecordType"
                label="Tipo pesagem:"
                name="weightRecordType"
                id="weightRecordType"
                value={allDataForm.weightRecordType ?? 'OTHER'}
                onChange={handleInputValues}
                options={weightRecordOptions}
                defaultOption="Escolha o tipo"
              />
              <InputForm
                classNameInput="max-w-none"
                htmlFor="weightRecordDate"
                label="Data da pesagem:"
                type="date"
                name="weightRecordDate"
                id="weightRecordDate"
                value={
                  allDataForm.weightRecordDate
                    ? new Date(allDataForm.weightRecordDate)
                        .toISOString()
                        .split('T')[0]
                    : new Date().toISOString().split('T')[0]
                }
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

              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
                  Categoria:
                </span>

                <p className="flex h-11 items-center rounded-md border border-dashed border-primary/30 bg-primary/5 px-3 text-sm font-semibold text-primary">
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
                                  : allDataForm.category === 'bull'
                                    ? 'Touro'
                                    : allDataForm.category === 'old bull'
                                      ? 'Touro velho'
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
            <div className="flex w-full flex-col-reverse gap-3 border-t border-border/70 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="gap-2 bg-white"
                onClick={() => cleanAllDataForm()}
              >
                <RotateCcw className="h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" className="gap-2">
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};
