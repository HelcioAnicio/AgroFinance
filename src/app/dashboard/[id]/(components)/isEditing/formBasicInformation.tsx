import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { weightRecordOptions } from '@/lib/weightHistory';

interface FormBasicInformationProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  breedArray: string[];
  animal: Animal | null;
  animals: Animal[];
  scores: number[];
}

export const FormBasicInformation: React.FC<FormBasicInformationProps> = ({
  allDataForm,
  handleInputValues,
  breedArray,
  animals,
  scores,
}) => {
  return (
    <>
      <Card className="w-full max-w-lg px-2 py-7">
        <CardHeader className="py-2">
          <CardTitle className="text-base">Informações principais</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <section className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label className="text-secondary" htmlFor="manualId">
                  Id do animal:
                </label>
                <input
                  type="text"
                  name="manualId"
                  id="manualId"
                  value={allDataForm.manualId ?? ''}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="status">
                  Status:
                </label>
                <select
                  name="status"
                  id="status"
                  value={allDataForm.status ?? ''}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="dead">Morto</option>
                  <option value="sold">Vendido</option>
                  <option value="lost">Perdida</option>
                  <option value="trash">Descarte</option>
                </select>
              </div>
              {allDataForm.status && allDataForm.status !== 'active' && (
                <div>
                  <label className="text-secondary" htmlFor="statusChangeDate">
                    Data alteração status:
                  </label>
                  <input
                    type="date"
                    name="statusChangeDate"
                    id="statusChangeDate"
                    value={
                      allDataForm.statusChangeDate
                        ? new Date(allDataForm.statusChangeDate)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={handleInputValues}
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                  />
                </div>
              )}
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
                          .split('T')[0]
                      : ''
                  }
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>

              <div>
                <label className="text-secondary" htmlFor="weight">
                  Peso atual:
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={allDataForm.weight ?? ''}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="bodyConditionScore">
                  ECC (Escore de Condição Corporal):
                </label>
                <select
                  name="bodyConditionScore"
                  id="bodyConditionScore"
                  value={allDataForm.bodyConditionScore ?? ''}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                >
                  <option value="">Escolha o ECC</option>
                  {scores.map((score, index) => (
                    <option key={index} value={score}>
                      ECC - {score}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="weightRecordType">
                  Tipo pesagem:
                </label>
                <select
                  name="weightRecordType"
                  id="weightRecordType"
                  value={allDataForm.weightRecordType ?? 'OTHER'}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                >
                  {weightRecordOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-secondary" htmlFor="weightRecordDate">
                  Data da pesagem:
                </label>
                <input
                  type="date"
                  name="weightRecordDate"
                  id="weightRecordDate"
                  value={
                    allDataForm.weightRecordDate
                      ? new Date(allDataForm.weightRecordDate)
                          .toISOString()
                          .split('T')[0]
                      : new Date().toISOString().split('T')[0]
                  }
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
                  value={allDataForm.breed ?? ''}
                  onChange={handleInputValues}
                  className="min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
                >
                  <option value="" disabled></option>
                  {breedArray.map((breed: string, id) => (
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
                <select
                  name="category"
                  id="category"
                  value={allDataForm.category ?? ''}
                  onChange={handleInputValues}
                  className="h-20 min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
                >
                  <option disabled value=""></option>
                  <option value="neonate">Dependente</option>
                  <option value="calf">Bezerro</option>
                  <option value="steer">
                    {allDataForm.category && allDataForm.gender === 'male'
                      ? 'Garrote'
                      : 'Novilha'}
                  </option>

                  <option
                    value={
                      allDataForm.category && allDataForm.gender === 'male'
                        ? 'ox'
                        : 'cow'
                    }
                  >
                    {allDataForm.category && allDataForm.gender === 'male'
                      ? 'Boi'
                      : 'Vaca'}
                  </option>

                  <option
                    value={
                      allDataForm.category && allDataForm.gender === 'male'
                        ? 'old ox'
                        : 'old cow'
                    }
                  >
                    {allDataForm.category && allDataForm.gender === 'male'
                      ? 'Boi velho'
                      : 'Vaca Velha'}
                  </option>

                  {allDataForm.category && allDataForm.gender === 'male' && (
                    <>
                      <option value="bull">Touro</option>
                      <option value="old bull">Touro velho</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="motherId">
                  Mãe:
                </label>
                <select
                  name="motherId"
                  id="motherId"
                  value={allDataForm.motherId ?? 'Comercial'}
                  onChange={handleInputValues}
                  className="h-20 min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
                >
                  <option disabled value=""></option>
                  <option value="Comercial">Comercial</option>
                  {animals
                    .filter(
                      (animal) =>
                        animal.gender === 'female' &&
                        animal.status === 'active' &&
                        animal.category !== 'calf' &&
                        animal.category !== 'neonate'
                    )
                    .map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        Vaca {animal.manualId}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="fatherId">
                  Pai:
                </label>
                <select
                  name="fatherId"
                  id="fatherId"
                  value={allDataForm.fatherId ?? 'Comercial'}
                  onChange={handleInputValues}
                  className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
                >
                  <option value="" disabled></option>
                  <option value="Comercial">Comercial</option>
                  {animals
                    .filter(
                      (animal) =>
                        animal.gender === 'male' &&
                        animal.status === 'active' &&
                        (animal.category === 'bull' ||
                          animal.category === 'old bull')
                    )
                    .map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        Touro {animal.manualId}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </>
  );
};
