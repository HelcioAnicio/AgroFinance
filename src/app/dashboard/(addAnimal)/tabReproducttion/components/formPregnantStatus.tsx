import { SelectForm } from '@/components/ui/selectForm';
import { RadioForm } from '@/components/ui/radioForm';
import { InputForm } from '@/components/ui/inputForm';
import { Animal } from '@/types/animal';

interface FormPregnantStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
  scores: number[];
}

export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({
  allDataForm,
  handleInputValues,
  animals,
  scores,
}) => {
  return (
    <>
      <article className="flex flex-wrap gap-5">
        <SelectForm
          htmlFor="handlingType"
          label="Manejo utilizado:"
          name="handlingType"
          id="handlingType"
          value={allDataForm.handlingType || ''}
          defaultOption="Escolha o manejo"
          options={[
            { label: 'Touro', value: 'bullMating' },
            {
              label: 'Inseminação Artificial',
              value: 'artificialInsemination',
            },
            { label: 'Todos os Métodos', value: 'allMethods' },
          ]}
          onChange={handleInputValues}
        />
      </article>

      <article className="flex flex-wrap gap-2 md:gap-10">
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId"
          value={allDataForm.bullId || ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'Comercial' },
            ...animals
              .filter((animal) => animal.gender === 'male')
              .map((animal) => ({
                label: `Touro ${animal.manualId}`,
                value: animal.id,
              })),
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
            { label: '3 manejos', value: '3 manejos' },
            { label: '4 manejos', value: '4 manejos' },
            { label: 'Misto', value: 'misto' },
          ]}
          defaultOption="Protocolo"
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'bullMating'}
        />
      </article>

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col">
          <p className="text-secondary">Sexo Fetal:</p>
          <div className="flex items-center gap-4">
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

      <article className="flex flex-wrap gap-5">
        <InputForm
          classNameDiv="flex flex-col gap-1"
          classNameInput="max-w-40"
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
          htmlFor="bodyConditionScore"
          label="ECC (Escore de Condição Corporal):"
          name="bodyConditionScore"
          id="bodyConditionScore"
          value={allDataForm.bodyConditionScore || ''}
          options={scores.map((score) => ({
            label: `ECC - ${score}`,
            value: score,
          }))}
          onChange={handleInputValues}
          classNameInput={'max-w-40'}
        />

        <SelectForm
          htmlFor="bullIatf"
          label="Touro utilizado na IATF:"
          name="bullIatf"
          id="bullIatf"
          value={allDataForm.bullIatf || ''}
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...animals
              .filter((animal) => animal.gender === 'male')
              .map((animal) => ({
                label: `Touro ${animal.manualId}`,
                value: animal.id,
              })),
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'bullMating'}
        />
      </article>
    </>
  );
};
