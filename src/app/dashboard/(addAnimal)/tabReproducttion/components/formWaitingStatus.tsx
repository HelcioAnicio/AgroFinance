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
          options={[
            { label: 'Montada com touro', value: 'bullMating' },
            {
              label: 'Inseminação Artificial',
              value: 'artificialInsemination',
            },
            { label: 'Todos os métodos', value: 'allMethods' },
          ]}
          defaultOption="Selecione o manejo"
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
          classNameInput={'max-w-32'}
        />
      </article>

      <article className="flex flex-wrap gap-5">
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
              .filter((animal) => animal.gender === 'male')
              .map((animal) => ({
                label: `Touro ${animal.manualId}`,
                value: animal.id,
              })),
          ]}
          onChange={handleInputValues}
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
