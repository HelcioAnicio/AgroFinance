import { RadioForm } from '@/components/ui/radioForm';
import { Animal } from '@/types/animal';

interface FormMaleReproductiveProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const FormMaleReproductive: React.FC<FormMaleReproductiveProps> = ({
  allDataForm,
  handleInputValues,
}) => {
  return (
    <>
      <article className="flex flex-col gap-1">
        <p className="text-secondary">Andrológico:</p>
        <RadioForm
          htmlFor="positive"
          label="Positivo"
          type="radio"
          name="andrological"
          id="andrological"
          value={allDataForm.andrological?.toString() ?? ''}
          onChange={handleInputValues}
          checked={false}
        />
        <RadioForm
          htmlFor="negative"
          label="Negativo"
          type="radio"
          name="andrological"
          id="andrological"
          value={allDataForm.andrological?.toString() ?? ''}
          onChange={handleInputValues}
          checked={false}
        />
        <RadioForm
          htmlFor="notDone"
          label="Não realizado"
          type="radio"
          name="andrological"
          id="andrological"
          value={allDataForm.andrological?.toString() ?? ''}
          onChange={handleInputValues}
          checked={false}
        />
      </article>
    </>
  );
};
