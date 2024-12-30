import { Animal } from '@/types/animal';

interface FormPregnantStatusProps {
  allDataForm: Animal;
  handleInputValues: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  animals: Animal[];
  animal: Animal | null;
  scores: number[];
}


export const FormPregnantStatus: React.FC<FormPregnantStatusProps> = ({allDataForm, handleInputValues, animals, scores}) => {
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
            <option value=""></option>
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

            {animals
              .filter((animal) => animal.gender === "male")
              .sort(
                (a, b) => (a.manualId ?? 0) - (b.manualId ?? 0),
              ).map((animal) => (
                <option key={animal.id} value={animal.id ?? ""}>
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
            className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary outline-none ${allDataForm.handlingType == "bullMating" ? "rounded-t-md bg-gray-300" : "bg-transparent"}`}
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

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Sexo Fetal:</p>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="fetalGender"
              id="female"
              value="female"
              checked={allDataForm.fetalGender === "female"}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="female">Fêmea</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="fetalGender"
              id="male"
              value="male"
              checked={allDataForm.fetalGender === "male"}
              onChange={handleInputValues}
              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
            />
            <label htmlFor="male">Macho</label>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-1">
          <label
            className="text-secondary"
            htmlFor="expectedDueDate"
          >
            Data prevista para o parto:
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

        <div className="flex w-full flex-col gap-1">
          <label
            className="text-secondary"
            htmlFor="bullIbodyConditionScoreatf"
          >
            ECC (Escore de Condição Corporal):
          </label>

          <select
            name="bodyConditionScore"
            id="bullbodyConditionScoreIatf"
            className={`min-w-24 max-w-40 flex-1 overflow-y-scroll scroll-smooth border border-b-primary outline-none`}
            value={allDataForm.bodyConditionScore ?? ""}
            onChange={handleInputValues}
            style={{
              overflowY: "scroll",
              maxHeight: "100px",
            }}
          >
            <option disabled value=""></option>
            {scores.map((score, index) => (
              <option key={index} value={score}>
                ECC - {score}
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-secondary" htmlFor="bullIatf">
            Touro utilizado na IATF:
          </label>
          <select
            name="bullIatf"
            id="bullIatf"
            className={`min-w-24 max-w-40 flex-1 border border-b border-b-primary outline-none ${allDataForm.handlingType == "bullMating" ? "rounded-t-md bg-gray-400" : "bg-transparent"}`}
            disabled={allDataForm.handlingType === "bullMating"}
            value={allDataForm.bullIatf ?? ""}
            onChange={handleInputValues}
          >
            <option disabled value=""></option>
            <option value="comercial">Comercial</option>
            {animals
              .filter((animal) => animal.gender === "male")
              .map((animal) => (
                <option key={animal.id} value={animal.id ?? ""}>
                  Touro {animal.manualId}
                </option>
              ))}{" "}
          </select>
        </div>
      </article>
    </>
  );
}
 