import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Animal } from '@/types/animal';

interface FormBasicInformationProps {
  allDataForm: Animal;
  handleInputValues: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  breedArray: string[];
  animal: Animal | null;
}
  

export const FormBasicInformation: React.FC<FormBasicInformationProps> = ({allDataForm, handleInputValues, breedArray}) => {
  return (
  <> 
  <Card className="p-1 max-w-xs">
    <CardHeader className="py-2">
      <CardTitle className="text-base">Informações principais</CardTitle>
    </CardHeader>
    <CardContent className="p-1">
      <section className="flex flex-col gap-4">
        <div className='grid grid-cols-2 gap-4'>
          <div className="flex items-end gap-1">
            <label className="text-secondary" htmlFor="manualId">
              Id do animal:
            </label>
            <input
              type="number"
              name="manualId"
              id="manualId"
              value={allDataForm.manualId ?? ""}
              onChange={handleInputValues}
              className="w-12 border border-b border-b-primary bg-transparent outline-none"
            />
          </div>
          <div className="flex items-end gap-1">
            <label className="text-secondary" htmlFor="status">
              status
            </label>
            <select name="status" id="status" value={allDataForm.status ?? ""} onChange={handleInputValues} className="w-16 border border-b border-b-primary bg-transparent outline-none">
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-secondary" htmlFor="birthDate">
              Nascimento:
            </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={
                allDataForm.birthDate
                  ? new Date(allDataForm.birthDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleInputValues}
              className="w-full border border-b border-b-primary bg-transparent outline-none"
            />
          </div>

          <div>
            <label className="text-secondary" htmlFor="weight">
              Peso:
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={allDataForm.weight ?? ""}
              onChange={handleInputValues}
              className="w-full border border-b border-b-primary bg-transparent outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-secondary" htmlFor="breed">
              Raça:
            </label>
            <select
              name="breed"
              id="breed"
              value={allDataForm.breed ?? ""}
              onChange={handleInputValues}
              className="min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
            >
              <option value="" disabled></option>
              {breedArray.map((breed, id) => (
                <option value={breed} key={id}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-secondary" htmlFor="category">
              Categoria:
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={allDataForm.category ?? ""}
              onChange={handleInputValues}
              className="w-full border border-b border-b-primary bg-transparent outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-secondary" htmlFor="motherId">
              Mãe:
            </label>
            <select
              name="motherId"
              id="motherId"
              value={allDataForm.motherId ?? ""}
              onChange={handleInputValues}
              className="h-20 min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
            >
              <option disabled value=""></option>
              <option value="Comercial">Comercial</option>
                {allDataForm.motherId && (
                  <option value={allDataForm.motherId ?? ""}>
                    Vaca {allDataForm.mother?.manualId}
                  </option>
                ) }
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-secondary" htmlFor="fatherId">
              Pai:
            </label>
            <select
              name="fatherId"
              id="fatherId"
              value={allDataForm.fatherId ?? ""}
              onChange={handleInputValues}
              className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
            >
              <option value="" disabled></option>
              <option value="Comercial">Comercial</option>
                {allDataForm.fatherId && (
                  <option value={allDataForm.fatherId ?? ""}>
                    Touro {allDataForm.father?.manualId}
                  </option>
                )}
            </select>
          </div>
        </div>
      </section>
      </CardContent>
    </Card>
  </>
    );
}
 