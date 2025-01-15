import { SelectForm } from '@/components/ui/selectForm';
import { Animal } from '@/types/animal';

interface FormWaitingStatusProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  animals: Animal[];
}

export const FormWaitingStatus: React.FC<FormWaitingStatusProps> = ({
  allDataForm,
  handleInputValues,
  animals,
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
          defaultOption="Selecione o manejo"
          options={[
            { label: 'Touro', value: 'bullMating' },
            {
              label: 'Inseminação Artificial',
              value: 'artificialInsemination',
            },
            { label: 'Todos os métodos', value: 'allMethods' },
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
          defaultOption="Selecione o touro"
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...animals.map((animal) => ({
              label: `Touro ${animal.manualId}`,
              value: animal.id ?? '',
            })),
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'artificialInsemination'}
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
          classNameInput={'max-w-32'}
        />
      </article>
    </>
  );
};
