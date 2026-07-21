import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { RadioForm } from '@/components/ui/radioForm';
import { SelectForm } from '@/components/ui/selectForm';
import React, { useState } from 'react';

interface FormPregnantStatusProps {
  animal: Animal;
  setAnimal: (animal: Animal | null) => void;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  externalBulls: ExternalBull[];
}

export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({
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

  const handleBullTypeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBullType(event.target.value);
    setAnimal({
      ...animal,
      bullId: null,
      externalBullId: null,
    });
  };

  const handleBullIatfTypeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBullIatfType(event.target.value);
    setAnimal({
      ...animal,
      bullIatfId: null,
      externalBullIatfId: null,
    });
  };

  const handleBullSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullType === 'interno') {
      setAnimal({ ...animal, bullId: value, externalBullId: null });
    } else {
      setAnimal({ ...animal, bullId: null, externalBullId: value });
    }
  };

  const handleBullIatfSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (bullIatfType === 'interno') {
      setAnimal({ ...animal, bullIatfId: value, externalBullIatfId: null });
    } else {
      setAnimal({ ...animal, bullIatfId: null, externalBullIatfId: value });
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
            id="handlingType"
            className="w-44 border border-b border-b-primary bg-transparent outline-none"
            value={animal.handlingType ?? ''}
            onChange={handleInputValues}
          >
            <option value=""></option>
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
                htmlFor="preg-bull-interno"
                label="Interno"
                type="radio"
                name="bullType-preg"
                id="preg-bull-interno"
                value="interno"
                checked={bullType === 'interno'}
                onChange={handleBullTypeChange}
              />
              <RadioForm
                htmlFor="preg-bull-externo"
                label="Externo"
                type="radio"
                name="bullType-preg"
                id="preg-bull-externo"
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
              id="bullId-preg"
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
              id="externalBullId-preg"
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
                htmlFor="preg-bull-iatf-interno"
                label="Interno"
                type="radio"
                name="bullIatfType-preg"
                id="preg-bull-iatf-interno"
                value="interno"
                checked={bullIatfType === 'interno'}
                onChange={handleBullIatfTypeChange}
              />
              <RadioForm
                htmlFor="preg-bull-iatf-externo"
                label="Externo"
                type="radio"
                name="bullIatfType-preg"
                id="preg-bull-iatf-externo"
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
              id="bullIatfId-preg"
              value={animal.bullIatfId || ''}
              options={[{ label: 'Comercial', value: 'comercial' }, ...internalBullOptions]}
              onChange={handleBullIatfSelection}
            />
          ) : (
            <SelectForm
              htmlFor="externalBullIatfId"
              label="Touro utilizado na IATF (Externo):"
              name="externalBullIatfId"
              id="externalBullIatfId-preg"
              value={animal.externalBullIatfId || ''}
              options={externalBullOptions}
              onChange={handleBullIatfSelection}
            />
          )}
        </>
      )}

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Sexo Fetal:</p>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="fetalGender"
              id="female-edit"
              value="female"
              checked={animal.fetalGender === 'female'}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="female-edit">Fêmea</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="fetalGender"
              id="male-edit"
              value="male"
              checked={animal.fetalGender === 'male'}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="male-edit">Macho</label>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-secondary" htmlFor="expectedDueDate">
            Data prevista para o parto:
          </label>
          <input
            type="date"
            name="expectedDueDate"
            id="expectedDueDate-edit"
            value={
              animal.expectedDueDate
                ? new Date(animal.expectedDueDate).toISOString().split('T')[0]
                : ''
            }
            onChange={handleInputValues}
            className="w-full max-w-40 border border-b border-b-primary bg-transparent outline-none"
          />
        </div>
      </article>
    </>
  );
};
