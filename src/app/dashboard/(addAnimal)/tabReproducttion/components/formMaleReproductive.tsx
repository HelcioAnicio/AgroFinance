import { RadioForm } from '@/components/ui/radioForm';
import { Animal } from '@/types/animal';

interface FormMaleReproductiveProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const FormMaleReproductive: React.FC<FormMaleReproductiveProps> = ({
  allDataForm,
  handleInputValues,
}) => {
  return (
    <>
      <article className="flex flex-col gap-2">
        <p className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
          Andrológico:
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          <RadioForm
            htmlFor="positive"
            label="Positivo"
            type="radio"
            name="andrological"
            id="positive"
            value="positive"
            checked={allDataForm.andrological === 'positive'}
            onChange={handleInputValues}
          />
          <RadioForm
            htmlFor="negative"
            label="Negativo"
            type="radio"
            name="andrological"
            id="negative"
            value="negative"
            checked={allDataForm.andrological === 'negative'}
            onChange={handleInputValues}
          />
          <RadioForm
            htmlFor="notDone"
            label="Não realizado"
            type="radio"
            name="andrological"
            id="notDone"
            value="notDone"
            checked={allDataForm.andrological === 'notDone'}
            onChange={handleInputValues}
          />
        </div>
      </article>
    </>
  );
};
