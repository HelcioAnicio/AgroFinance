import { Animal } from '@/types/animal';

interface FormWaitingStatusProps {
  allDataForm: Animal;
  handleInputValues: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  animals: Animal[];
  animal: Animal | null;
}


export const FormWaitingStatus: React.FC<FormWaitingStatusProps> = ({allDataForm, handleInputValues, animals}) => {
  return ( 
    <>
      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label
            className="text-secondary"
            htmlFor="handlingType"
          >
            Manejo utilizado:
          </label>
          <select
            name="handlingType"
            id="handlingType"
            className="w-44 border border-b border-b-primary bg-transparent outline-none"
            value={allDataForm.handlingType ?? ""}
            onChange={handleInputValues}
          >
            <option disabled value=""></option>
            <option value="bullMating">Touro</option>
            <option value="artificialInsemination">
              Inseminação Artifical
            </option>
            <option value="allMethods">Todos os metodos</option>
          </select>
        </div>
      </article>

      <article className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col gap-1">
          <label className="text-secondary" htmlFor="bullId">
            Touro utilizado:
          </label>
          <select
            name="bullId"
            id="bullId"
            className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${allDataForm.handlingType == "bullMating" && "bg-gray-300"}`}
            disabled={
              allDataForm.handlingType ===
              "artificialInsemination"
            }
            value={allDataForm.bullId ?? ""}
            onChange={handleInputValues}
          >
            <option disabled value=""></option>
            <option value="comercial">Comercial</option>

            {animals.map((animal) => (
              <option
                key={animal.id}
                value={animal.manualId ?? ""}
              >
                Touro {animal.manualId}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col gap-1">
          <label htmlFor="protocol" className="text-secondary">
            Protocolo usado:
          </label>
          <select
            name="protocol"
            id="protocol"
            className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary bg-transparent outline-none ${allDataForm.handlingType === "bullMating" && "bg-gray-300"}`}
            value={allDataForm.protocol ?? ""}
            onChange={handleInputValues}
            disabled={allDataForm.handlingType === "bullMating"}
          >
            <option disabled value=""></option>
            <option value="protocol1">
              Inseminação artificial
            </option>
            <option value="protocol2">Inseminação </option>
          </select>
        </div>
      </article>
    </>
  );
}
 