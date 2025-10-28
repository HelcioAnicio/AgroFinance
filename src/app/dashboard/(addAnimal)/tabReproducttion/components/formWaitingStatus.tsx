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

      <article className="flex flex-wrap gap-5">
        <SelectForm
          htmlFor="bullId"
          label="Touro utilizado:"
          name="bullId"
          id="bullId"
          value={allDataForm.bullId || ''}
          defaultOption="Escolha o touro"
          options={[
            { label: 'Comercial', value: 'comercial' },
            ...animals
              .filter(
                (animal) =>
                  animal.gender === 'male' && animal.category.includes('Touro')
              )
              .map((animal) => ({
                label: `Touro ${animal.manualId}`,
                value: animal.id,
              })),
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'artificialInsemination'}
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
              .filter(
                (animal) =>
                  animal.gender === 'male' && animal.category.includes('Touro')
              )
              .map((animal) => ({
                label: `Touro ${animal.manualId}`,
                value: animal.id,
              })),
          ]}
          onChange={handleInputValues}
          disabled={allDataForm.handlingType === 'naturalMating'}
        />
      </article>
    </>
  );
};
