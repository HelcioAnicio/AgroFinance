import { Animal } from '@/types/animal';
import { RadioForm } from '@/components/ui/radioForm';

interface FormMaleReproductiveProps {
  animal: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const FormMaleReproductive: React.FC<FormMaleReproductiveProps> = ({
  animal,
  handleInputValues,
}) => {
  return (
    <article className="flex flex-col gap-2">
      <span className="text-[0.7rem] font-semibold uppercase text-muted-foreground">
        Andrológico:
      </span>
      <div className="grid grid-cols-3 gap-2">
        <RadioForm
          htmlFor="positive"
          label="Positivo"
          type="radio"
          name="andrological"
          id="positive"
          value="positive"
          checked={animal.andrological === 'positive'}
          onChange={handleInputValues}
        />
        <RadioForm
          htmlFor="negative"
          label="Negativo"
          type="radio"
          name="andrological"
          id="negative"
          value="negative"
          checked={animal.andrological === 'negative'}
          onChange={handleInputValues}
        />
        <RadioForm
          htmlFor="notDone"
          label="Não realizado"
          type="radio"
          name="andrological"
          id="notDone"
          value="notDone"
          checked={animal.andrological === 'notDone'}
          onChange={handleInputValues}
        />
      </div>
    </article>
  );
};
