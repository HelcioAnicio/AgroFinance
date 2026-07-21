import { SelectForm } from '@/components/ui/selectForm';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/external-bull';
import { RadioForm } from '@/components/ui/radioForm';
import React, { useState } from 'react';

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
  const [bullType, setBullType] = useState('interno');
  const [bullIatfType, setBullIatfType] = useState('interno');

  const handleBullTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBullType(event.target.value);
    setAllDataForm((prev) => ({
      ...prev,
      bullId: null,
      externalBullId: null,
    }));
  };

  const handleBullIatfTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBullIatfType(event.target.value);
    setAllDataForm((prev) => ({
      ...prev,
      bullIatfId: null,
      externalBullIatfId: null,
    }));
  };

  const handleBullSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullType === 'interno') {
      setAllDataForm((prev) => ({
        ...prev,
        bullId: value,
        externalBullId: null,
      }));
    } else {
      setAllDataForm((prev) => ({
        ...prev,
        bullId: null,
        externalBullId: value,
      }));
    }
  };

  const handleBullIatfSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullIatfType === 'interno') {
      setAllDataForm((prev) => ({
        ...prev,
        bullIatfId: value,
        externalBullIatfId: null,
      }));
    } else {
      setAllDataForm((prev) => ({
        ...prev,
        bullIatfId: null,
        externalBullIatfId: value,
      }));
    }
  };

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

       {allDataForm.handlingType === 'naturalMating' && (
        <>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
              Tipo de Touro (Monta Natural):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <RadioForm
                htmlFor="bull-wait-interno"
                label="Interno"
                type="radio"
                name="bullType-wait"
                id="bull-wait-interno"
                value="interno"
                checked={bullType === 'interno'}
                onChange={handleBullTypeChange}
              />
              <RadioForm
                htmlFor="bull-wait-externo"
                label="Externo"
                type="radio"
                name="bullType-wait"
                id="bull-wait-externo"
                value="externo"
                checked={bullType === 'externo'}
                onChange={handleBullTypeChange}
              />
            </div>
          </div>
          {bullType === 'interno' ? (
            <SelectForm
              htmlFor="bullId"
              label="Touro utilizado:"
              name="bullId"
              id="bullId-wait"
              value={allDataForm.bullId || ''}
              defaultOption="Escolha o touro"
              options={[{ label: 'Comercial', value: 'comercial' }, ...internalBullOptions]}
              onChange={handleBullSelection}
            />
          ) : (
            <SelectForm
              htmlFor="externalBullId"
              label="Touro utilizado (Externo):"
              name="externalBullId"
              id="externalBullId-wait"
              value={allDataForm.externalBullId || ''}
              defaultOption="Escolha o touro externo"
              options={externalBullOptions}
              onChange={handleBullSelection}
            />
          )}
        </>
      )}

      {allDataForm.handlingType === 'artificialInsemination' && (
         <>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
              Tipo de Touro (IATF):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <RadioForm
                htmlFor="bull-iatf-wait-interno"
                label="Interno"
                type="radio"
                name="bullIatfType-wait"
                id="bull-iatf-wait-interno"
                value="interno"
                checked={bullIatfType === 'interno'}
                onChange={handleBullIatfTypeChange}
              />
              <RadioForm
                htmlFor="bull-iatf-wait-externo"
                label="Externo"
                type="radio"
                name="bullIatfType-wait"
                id="bull-iatf-wait-externo"
                value="externo"
                checked={bullIatfType === 'externo'}
                onChange={handleBullIatfTypeChange}
              />
            </div>
          </div>
          {bullIatfType === 'interno' ? (
            <SelectForm
              htmlFor="bullIatfId"
              label="Touro utilizado na IATF:"
              name="bullIatfId"
              id="bullIatfId-wait"
              value={allDataForm.bullIatfId || ''}
              options={[{ label: 'Comercial', value: 'comercial' }, ...internalBullOptions]}
              onChange={handleBullIatfSelection}
            />
          ) : (
            <SelectForm
              htmlFor="externalBullIatfId"
              label="Touro utilizado na IATF (Externo):"
              name="externalBullIatfId"
              id="externalBullIatfId-wait"
              value={allDataForm.externalBullIatfId || ''}
              options={externalBullOptions}
              onChange={handleBullIatfSelection}
            />
          )}
        </>
      )}
    </>
  );
};
