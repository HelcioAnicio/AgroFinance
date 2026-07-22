import { SelectForm } from '@/components/ui/selectForm';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import React from 'react';

interface FormWaitingStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setAllDataForm: React.Dispatch<React.SetStateAction<Animal>>;
  animals: Animal[];
  externalBulls: ExternalBull[];
}

export const FormWaitingStatus: React.FC<FormWaitingStatusProps> = ({
  allDataForm,
  handleInputValues,
  setAllDataForm,
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
      <article className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectForm
          htmlFor="handlingType"
          label="Manejo utilizado:"
          name="handlingType"
          id="handlingType"
          value={allDataForm.handlingType || ''}
          defaultOption="Escolha o manejo"
          options={[
            { label: 'Monta natural', value: 'naturalMating' },
            {
              label: 'Inseminação Artificial',
              value: 'artificialInsemination',
            },
            { label: 'Todos os metodos', value: 'allMethods' },
          ]}
          onChange={handleInputValues}
        />
        <SelectForm
          htmlFor="protocol"
          label="Protocolo usado:"
          name="protocol"
          id="protocol"
          value={allDataForm.protocol || ''}
          options={[
            { label: '3 manejos', value: '3 handlings' },
            { label: '4 manejos', value: '4 handlings' },
            { label: 'Misto', value: 'mixed' },
          ]}
          defaultOption="Protocolo"
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'naturalMating'}
        />
      </article>

      {/* Monta natural exige um touro físico na fazenda — sempre interno */}
      {allDataForm.handlingType === 'naturalMating' && (
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId-wait"
          value={allDataForm.bullId || ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...internalBullOptions,
          ]}
          onChange={(event) =>
            setAllDataForm((prev) => ({
              ...prev,
              bullId: event.target.value,
              externalBullId: null,
            }))
          }
        />
      )}

      {/* IATF usa sêmen catalogado como touro externo — sempre externo */}
      {allDataForm.handlingType === 'artificialInsemination' && (
        <SelectForm
          htmlFor="externalBullIatfId"
          label="Touro utilizado na IATF (Externo):"
          name="externalBullIatfId"
          id="externalBullIatfId-wait"
          value={allDataForm.externalBullIatfId || ''}
          defaultOption="Escolha o touro externo"
          options={externalBullOptions}
          onChange={(event) =>
            setAllDataForm((prev) => ({
              ...prev,
              bullIatfId: null,
              externalBullIatfId: event.target.value,
            }))
          }
        />
      )}
    </>
  );
};
