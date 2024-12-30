import { Animal } from '@/types/animal';

interface FormMaleReproductiveProps {
  allDataForm: Animal;
  handleInputValues: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  animal: Animal | null;
}


export const FormMaleReproductive: React.FC<FormMaleReproductiveProps> = ({allDataForm, handleInputValues}) => {
  return ( 
    <>
      <article className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Andrológico:</p>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="andrological"
              id="positive"
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
              value="positive"
              checked={allDataForm.andrological === "positive"}
              onChange={handleInputValues}
            />
            <label htmlFor="positive">Positivo</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="andrological"
              id="negative"
              value="negative"
              checked={allDataForm.andrological === "negative"}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="negative">Negativo</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="andrological"
              id="notDone"
              value="notDone"
              checked={allDataForm.andrological === "notDone"}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="notDone">Não realizado</label>
          </div>
        </div>
      </article>
    </>
  );
}
 