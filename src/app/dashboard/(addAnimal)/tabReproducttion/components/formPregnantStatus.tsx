import { SelectForm } from '@/components/ui/selectForm';
import { RadioForm } from '@/components/ui/radioForm';
import { InputForm } from '@/components/ui/inputForm';
import { Animal } from '@/types/animal';

interface FormPregnantStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  animals: Animal[];
  scores: number[];
  userId: string | undefined | null;
}

export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({
  allDataForm,
  handleInputValues,
  animals,
  scores,
  userId,
}) => {
  return (
    <>
      <article className="flex flex-wrap gap-5">
        <SelectForm
          htmlFor="handlingType"
          label="Manejo utilizado:"
          name="handlingType"
          id="handlingType"
          value={allDataForm.handlingType ?? ''}
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

      <article className="flex w-full justify-between gap-2">
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId"
          value={allDataForm.bullId ?? ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'Comercial' },
            ...animals
              .filter(
                (animal) =>
                  animal.ownerId === userId && animal.gender === 'male',
              )
              .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0))
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
          value={allDataForm.protocol ?? ''}
          options={[
            { label: 'Inseminação artificial', value: 'protocol1' },
            { label: 'Inseminação', value: 'protocol2' },
          ]}
          defaultOption="Protocolo"
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'bullMating'}
          classNameInput={`max-w-32`}
        />
      </article>

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Sexo Fetal:</p>
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
          value={allDataForm.bodyConditionScore?.toFixed() ?? ''}
          options={scores.map((score) => ({
            label: `ECC - ${score}`,
            value: score.toString(),
          }))}
          onChange={handleInputValues}
          classNameInput={`max-w-40`}
        />

        <SelectForm
          htmlFor="bullIatf"
          label="Touro utilizado na IATF:"
          name="bullIatf"
          id="bullIatf"
          value={allDataForm.bullIatf ?? ''}
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...animals
              .filter(
                (animal) =>
                  animal.ownerId === userId && animal.gender === 'male',
              )
              .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0))
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
