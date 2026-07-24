import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { SelectForm } from '@/components/ui/selectForm';
import { InputForm } from '@/components/ui/inputForm';
import React from 'react';

interface FormWaitingStatusProps {
  animal: Animal;
  setAnimal: (animal: Animal | null) => void;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  externalBulls: ExternalBull[];
}

export const FormWaitingStatus: React.FC<FormWaitingStatusProps> = ({
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
          id="handlingType-wait"
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
          id="bullId-wait"
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
          id="externalBullIatfId-wait"
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

      <article className="mt-4 flex flex-wrap gap-5">
        <InputForm
          htmlFor="expectedDueDate"
          label="Expectativa de parto (estimativa):"
          type="date"
          name="expectedDueDate"
          id="expectedDueDate-wait"
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
