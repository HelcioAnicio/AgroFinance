'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Animal } from '@/types/animal';
import { InputForm } from '@/components/ui/inputForm';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';

interface CardFormMainProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  breedArray?: string[];
  setTabValue: (value: string) => void;
}

export const CardFormMain: React.FC<CardFormMainProps> = ({
  animals,
  allDataForm,
  handleInputValues,
  setTabValue,
}) => {
  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Formulário enviado! Dados do formulário:', allDataForm);
    setTabValue('reproducao');
    console.log('Tab alterada para "reproducao"');
  };

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

            <div className="flex gap-2">
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
                  {allDataForm.birthDate
                    ? (() => {
                        const birthDate = new Date(allDataForm.birthDate);
                        const ageInMonths =
                          (new Date().getFullYear() - birthDate.getFullYear()) *
                            12 +
                          new Date().getMonth() -
                          birthDate.getMonth();
                        if (ageInMonths <= 12) return 'Bezerro';
                        if (ageInMonths <= 24) return 'Novilho';
                        if (ageInMonths <= 36) return 'Adulto';
                        return 'Idoso';
                      })()
                    : ''}
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
                  { label: 'Comercial', value: 'Comercial' },
                  ...animals
                    .filter((animal) => animal.gender === 'female')
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
                  { label: 'Comercial', value: 'Comercial' },
                  ...animals
                    .filter((animal) => animal.gender === 'male')
                    .map((animal) => ({
                      label: `Touro ${animal.manualId}`,
                      value: animal.id,
                    })),
                ]}
                defaultOption="Escolha o pai"
              />
            </div>
            <Button className="mt-auto flex justify-self-end" type="submit">
              Próximo
            </Button>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};
