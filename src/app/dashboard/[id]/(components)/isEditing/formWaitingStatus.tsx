import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/external-bull';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';
import React, { useState } from 'react';

interface FormWaitingStatusProps {
  animal: Animal;
  setAnimal: React.Dispatch<React.SetStateAction<Animal>>;
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
  const [bullType, setBullType] = useState(
    animal.externalBullId ? 'externo' : 'interno'
  );
  const [bullIatfType, setBullIatfType] = useState(
    animal.externalBullIatfId ? 'externo' : 'interno'
  );

  const handleBullTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBullType(event.target.value);
    setAnimal((prev) => ({
      ...prev,
      bullId: null,
      externalBullId: null,
    }));
  };

  const handleBullIatfTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBullIatfType(event.target.value);
    setAnimal((prev) => ({
      ...prev,
      bullIatfId: null,
      externalBullIatfId: null,
    }));
  };

  const handleBullSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullType === 'interno') {
      setAnimal((prev) => ({
        ...prev,
        bullId: value,
        externalBullId: null,
      }));
    } else {
      setAnimal((prev) => ({
        ...prev,
        bullId: null,
        externalBullId: value,
      }));
    }
  };

  const handleBullIatfSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullIatfType === 'interno') {
      setAnimal((prev) => ({
        ...prev,
        bullIatfId: value,
        externalBullIatfId: null,
      }));
    } else {
      setAnimal((prev) => ({
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
      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-secondary" htmlFor="handlingType">
            Manejo utilizado:
          </label>
          <select
            name="handlingType"
            id="handlingType-wait"
            className="w-44 border border-b border-b-primary bg-transparent outline-none"
            value={animal.handlingType ?? ''}
            onChange={handleInputValues}
          >
            <option disabled value=""></option>
            <option value="naturalMating">Monta natural</option>
            <option value="artificialInsemination">
              Inseminação Artifical
            </option>
            <option value="allMethods">Todos os metodos</option>
          </select>
        </div>
      </article>

      {animal.handlingType === 'naturalMating' && (
        <>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
              Tipo de Touro (Monta Natural):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <RadioForm
                htmlFor="wait-bull-interno"
                label="Interno"
                type="radio"
                name="bullType-wait"
                id="wait-bull-interno"
                value="interno"
                checked={bullType === 'interno'}
                onChange={handleBullTypeChange}
              />
              <RadioForm
                htmlFor="wait-bull-externo"
                label="Externo"
                type="radio"
                name="bullType-wait"
                id="wait-bull-externo"
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
              value={animal.bullId || ''}
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
              value={animal.externalBullId || ''}
              defaultOption="Escolha o touro externo"
              options={externalBullOptions}
              onChange={handleBullSelection}
            />
          )}
        </>
      )}

      {animal.handlingType === 'artificialInsemination' && (
         <>
          <div className="flex flex-col gap-2 mt-4">
            <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
              Tipo de Touro (IATF):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <RadioForm
                htmlFor="wait-bull-iatf-interno"
                label="Interno"
                type="radio"
                name="bullIatfType-wait"
                id="wait-bull-iatf-interno"
                value="interno"
                checked={bullIatfType === 'interno'}
                onChange={handleBullIatfTypeChange}
              />
              <RadioForm
                htmlFor="wait-bull-iatf-externo"
                label="Externo"
                type="radio"
                name="bullIatfType-wait"
                id="wait-bull-iatf-externo"
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
              value={animal.bullIatfId || ''}
              options={[{ label: 'Comercial', value: 'comercial' }, ...internalBullOptions]}
              onChange={handleBullIatfSelection}
            />
          ) : (
            <SelectForm
              htmlFor="externalBullIatfId"
              label="Touro utilizado na IATF (Externo):"
              name="externalBullIatfId"
              id="externalBullIatfId-wait"
              value={animal.externalBullIatfId || ''}
              options={externalBullOptions}
              onChange={handleBullIatfSelection}
            />
          )}
        </>
      )}
    </>
  );
};
