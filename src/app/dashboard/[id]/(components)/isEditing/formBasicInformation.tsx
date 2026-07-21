import { Animal } from '@/types/animal';
import { weightRecordOptions } from '@/lib/weightHistory';
import { ExternalBull } from '@/types/externalBull';
import { RadioForm } from '@/components/ui/radioForm';

interface FormBasicInformationProps {
  animal: Animal;
  externalBulls: ExternalBull[];
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  breedArray: string[];
  animals: Animal[];
  scores: number[];
}

const labelClass =
  'block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1';
const inputClass =
  'w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary';
const selectClass =
  'w-full rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary';

export const FormBasicInformation: React.FC<FormBasicInformationProps> = ({
  animal,
  handleInputValues,
  externalBulls,
  breedArray,
  animals,
  scores,
}) => {
  return (
    <div className="w-full rounded-2xl border bg-white p-5 shadow-sm">
      <p className="mb-5 text-sm font-bold text-foreground">
        Informações principais
      </p>
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="manualId">
              Id do animal
            </label>
            <input
              type="text"
              name="manualId"
              id="manualId"
              value={animal.manualId ?? ''}
              onChange={handleInputValues}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={animal.status ?? ''}
              onChange={handleInputValues}
              className={selectClass}
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="dead">Morto</option>
              <option value="sold">Vendido</option>
              <option value="lost">Perdida</option>
              <option value="trash">Descarte</option>
            </select>
          </div>
          {animal.status && animal.status !== 'active' && (
            <div>
              <label className={labelClass} htmlFor="statusChangeDate">
                Data alteração status
              </label>
              <input
                type="date"
                name="statusChangeDate"
                id="statusChangeDate"
                value={
                  animal.statusChangeDate
                    ? new Date(animal.statusChangeDate)
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                onChange={handleInputValues}
                className={inputClass}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="birthDate">
              Nascimento
            </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={
                animal.birthDate
                  ? new Date(animal.birthDate).toISOString().split('T')[0]
                  : ''
              }
              onChange={handleInputValues}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="weight">
              Peso atual (kg)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={animal.weight ?? ''}
              onChange={handleInputValues}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="bodyConditionScore">
              ECC (Escore de Condição Corporal)
            </label>
            <select
              name="bodyConditionScore"
              id="bodyConditionScore"
              value={animal.bodyConditionScore ?? ''}
              onChange={handleInputValues}
              className={selectClass}
            >
              <option value="">Escolha o ECC</option>
              {scores.map((score, index) => (
                <option key={index} value={score}>
                  ECC - {score}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="weightRecordType">
              Tipo pesagem
            </label>
            <select
              name="weightRecordType"
              id="weightRecordType"
              value={animal.weightRecordType ?? 'OTHER'}
              onChange={handleInputValues}
              className={selectClass}
            >
              {weightRecordOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="weightRecordDate">
              Data da pesagem
            </label>
            <input
              type="date"
              name="weightRecordDate"
              id="weightRecordDate"
              value={
                animal.weightRecordDate
                  ? new Date(animal.weightRecordDate)
                      .toISOString()
                      .split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={handleInputValues}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="breed">
              Raça
            </label>
            <select
              name="breed"
              id="breed"
              value={animal.breed ?? ''}
              onChange={handleInputValues}
              className={selectClass}
            >
              <option value="" disabled></option>
              {breedArray.map((breed: string, id) => (
                <option value={breed} key={id}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="category">
              Categoria
            </label>
            <select
              name="category"
              id="category"
              value={animal.category ?? ''}
              onChange={handleInputValues}
              className={selectClass}
            >
              <option disabled value=""></option>
              <option value="neonate">Neonato (0–3 meses)</option>
              <option value="calf">Bezerro (4–12 meses)</option>
              <option value="steer">
                {animal.gender === 'male' ? 'Garrote' : 'Novilha'}
              </option>
              <option value={animal.gender === 'male' ? 'ox' : 'cow'}>
                {animal.gender === 'male' ? 'Boi' : 'Vaca'}
              </option>
              <option value={animal.gender === 'male' ? 'old ox' : 'old cow'}>
                {animal.gender === 'male' ? 'Boi velho' : 'Vaca Velha'}
              </option>
              {animal.gender === 'male' && (
                <>
                  <option value="bull">Touro</option>
                  <option value="old bull">Touro velho</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="motherId">
              Mãe
            </label>
            <select
              name="motherId"
              id="motherId"
              value={animal.motherId ?? 'Comercial'}
              onChange={handleInputValues}
              className={selectClass}
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
          {!animal.externalBullFatherId ? (
            <div>
              <label className={labelClass} htmlFor="fatherId">
                Pai
              </label>
              <select
                name="fatherId"
                id="fatherId"
                value={animal.fatherId ?? 'Comercial'}
                onChange={handleInputValues}
                className={selectClass}
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
          ) : (
            <div>
              <label className={labelClass} htmlFor="externalBullFatherId">
                Pai Externo
              </label>
              <select
                name="externalBullFatherId"
                id="externalBullFatherId"
                value={animal.externalBullFatherId ?? 'Comercial'}
                onChange={handleInputValues}
                className={selectClass}
              >
                <option value="" disabled></option>
                <option value="Comercial">Comercial</option>
                {externalBulls.map((bull) => (
                  <option key={bull.id} value={bull.id}>
                    Touro {bull.name} - {bull.dosesAvailable}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              name="fatherExternal"
              id="fatherExternal"
              checked={!!animal.externalBullFatherId} // ou a sua variável de estado (ex: isExternal)
              onChange={handleInputValues}
            />
            <label htmlFor="fatherExternal" className="cursor-pointer">
              Pai é touro externo (IA / Sêmen)?
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};
