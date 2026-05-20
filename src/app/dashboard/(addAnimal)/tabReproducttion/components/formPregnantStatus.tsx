import { SelectForm } from '@/components/ui/selectForm';
import { RadioForm } from '@/components/ui/radioForm';
import { InputForm } from '@/components/ui/inputForm';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { buildExternalBullValue } from '@/lib/externalBull';

interface FormPregnantStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  externalBulls: ExternalBull[];
}

export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({
  allDataForm,
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
    label: `Externo - ${externalBull.name} (${externalBull.dosesAvailable} doses)`,
    value: buildExternalBullValue(externalBull.id),
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
      </article>

      <article className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId"
          value={allDataForm.bullId || ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...internalBullOptions,
            ...externalBullOptions,
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'artificialInsemination'}
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

      <article className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <p className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
            Sexo Fetal:
          </p>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <RadioForm
              htmlFor="female"
              label="Fêmea"
              type="radio"
              name="fetalGender"
              id="female"
              value="female"
              checked={allDataForm.fetalGender === 'female'}
              onChange={handleInputValues}
            />
            <RadioForm
              htmlFor="male"
              label="Macho"
              type="radio"
              name="fetalGender"
              id="male"
              value="male"
              checked={allDataForm.fetalGender === 'male'}
              onChange={handleInputValues}
            />
          </div>
        </div>
      </article>

      <article className="mt-4 grid gap-4 sm:grid-cols-2">
        <InputForm
          htmlFor="expectedDueDate"
          label="Data prevista para o parto:"
          type="date"
          name="expectedDueDate"
          id="expectedDueDate"
          value={
            allDataForm.expectedDueDate
              ? new Date(allDataForm.expectedDueDate)
                  .toISOString()
                  .split('T')[0]
              : ''
          }
          onChange={handleInputValues}
        />

        <SelectForm
          htmlFor="bullIatfId"
          label="Touro utilizado na IATF:"
          name="bullIatfId"
          id="bullIatfId"
          value={allDataForm.bullIatfId || ''}
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...internalBullOptions,
            ...externalBullOptions,
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'naturalMating'}
        />
      </article>
    </>
  );
};
