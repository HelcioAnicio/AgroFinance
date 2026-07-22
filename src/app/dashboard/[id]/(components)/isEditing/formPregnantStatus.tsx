import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { InputForm } from '@/components/ui/inputForm';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';
import React from 'react';

interface FormPregnantStatusProps {
  animal: Animal;
  animals: Animal[];
  externalBulls: ExternalBull[];
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setAnimal: (animal: Animal | null) => void;
}

export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({
  animal,
  setAnimal,
  handleInputValues,
  animals,
  externalBulls,
}) => {
  const internalBullOptions = animals
    .filter(
      (animal) =>
        animal.gender === 'male' &&
        (animal.category === 'bull' || animal.category === 'old bull')
    )
    .map((animal) => ({
      label: `Touro ${animal.manualId}`,
      value: animal.id,
    }));

  const externalBullOptions = externalBulls.map((externalBull) => ({
    label: `${externalBull.name} (${externalBull.dosesAvailable} doses)`,
    value: externalBull.id,
  }));

  return (
    <>
      <article className="flex flex-wrap gap-5">
        <SelectForm
          htmlFor="handlingType"
          label="Manejo utilizado:"
          name="handlingType"
          id="handlingType"
          value={animal.handlingType ?? ''}
          onChange={handleInputValues}
          options={[
            { label: 'Monta natural', value: 'naturalMating' },
            { label: 'Inseminação Artificial', value: 'artificialInsemination' },
            { label: 'Todos os métodos', value: 'allMethods' },
          ]}
          defaultOption="Escolha o manejo"
        />
      </article>

      {/* Monta natural exige um touro físico na fazenda — sempre interno */}
      {animal.handlingType === 'naturalMating' && (
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId-preg"
          value={animal.bullId || ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...internalBullOptions,
          ]}
          onChange={(event) =>
            setAnimal({
              ...animal,
              bullId: event.target.value,
              externalBullId: null,
            })
          }
        />
      )}

      {/* IATF usa sêmen catalogado como touro externo — sempre externo */}
      {animal.handlingType === 'artificialInsemination' && (
        <SelectForm
          htmlFor="externalBullIatfId"
          label="Touro utilizado na IATF (Externo):"
          name="externalBullIatfId"
          id="externalBullIatfId-preg"
          value={animal.externalBullIatfId || ''}
          defaultOption="Escolha o touro externo"
          options={externalBullOptions}
          onChange={(event) =>
            setAnimal({
              ...animal,
              bullIatfId: null,
              externalBullIatfId: event.target.value,
            })
          }
        />
      )}

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
            Sexo Fetal:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <RadioForm
              htmlFor="female-edit"
              label="Fêmea"
              type="radio"
              name="fetalGender"
              id="female-edit"
              value="female"
              checked={animal.fetalGender === 'female'}
              onChange={handleInputValues}
            />
            <RadioForm
              htmlFor="male-edit"
              label="Macho"
              type="radio"
              name="fetalGender"
              id="male-edit"
              value="male"
              checked={animal.fetalGender === 'male'}
              onChange={handleInputValues}
            />
          </div>
        </div>
      </article>

      <article className="flex flex-wrap gap-5">
        <InputForm
          htmlFor="expectedDueDate"
          label="Data prevista para o parto:"
          type="date"
          name="expectedDueDate"
          id="expectedDueDate-edit"
          value={
            animal.expectedDueDate
              ? new Date(animal.expectedDueDate).toISOString().split('T')[0]
              : ''
          }
          onChange={handleInputValues}
        />
      </article>
    </>
  );
};
