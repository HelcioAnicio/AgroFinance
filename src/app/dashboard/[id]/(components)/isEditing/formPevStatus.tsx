import { Animal } from '@/types/animal';

interface FormPevStatusProps {
  allDataForm: Animal;
  handleInputValues: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  animals: Animal[];
}


export const FormPevStatus: React.FC<FormPevStatusProps> = ({allDataForm, handleInputValues}) => {
  return ( 
    <>
      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label
            className="text-secondary"
            htmlFor="expectedDueDate"
          >
            Manejo utilizado:
          </label>
          <input
            type="date"
            name="expectedDueDate"
            id="expectedDueDate"
            value={
              allDataForm.expectedDueDate
                ? new Date(allDataForm.expectedDueDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={handleInputValues}
            className="w-full max-w-40 border border-b border-b-primary bg-transparent outline-none"
          />
        </div>
      </article>
    </>
  );
}
 