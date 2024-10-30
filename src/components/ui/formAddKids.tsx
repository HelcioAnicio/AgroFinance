"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InterfaceAddDataKids {
  handlingType: string;
  bullId: string;
  protocol: string;
  andrological: string;
  gender: string;
  birthday: string;
  bodyConditionScore: string;
  bullIatf: string;
}

interface Animal {
  id: string;
  manualId: number | null;
  gender: string | null;
  birthDate: Date | null;
  weight: number | null;
  breed: string | null;
  category: string | null;
  motherId: string | null;
  fatherId: string | null;
  reproductiveStatus: string | null;
  handlingType: string | null;
  bullId: string | null;
  protocol: string | null;
  andrological: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
}

interface InterfaceComponentFormReproductionProps {
  setStatusComponentAddKids: React.Dispatch<React.SetStateAction<boolean>>;
  animals: Animal[];
  handleDataKids: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  dataKids: InterfaceAddDataKids;
}

export const FormAddKids: React.FC<InterfaceComponentFormReproductionProps> = ({
  setStatusComponentAddKids,
  animals,
  handleDataKids,
  dataKids,
}) => {
  const handleActiveComponent = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Filhos cadastrado.");
    setStatusComponentAddKids(false);
  };

  return (
    <>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Filhos anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-4">
            <article className="flex flex-wrap gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="handlingType">
                  Manejo utilizado:
                </label>
                <select
                  name="handlingType"
                  id="handlingType"
                  className="w-44 border border-b border-b-primary bg-transparent outline-none"
                  value={dataKids.handlingType}
                  onChange={handleDataKids}
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
                  className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataKids.handlingType == "bullMating" && "bg-gray-300"}`}
                  disabled={dataKids.handlingType === "artificialInsemination"}
                  value={dataKids.bullId ?? ""}
                  onChange={handleDataKids}
                >
                  <option disabled value=""></option>
                  <option value="comercial">Comercial</option>

                  {animals
                    .filter((animal) => animal.gender === "male")
                    .map((animal) => (
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
                  className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary bg-transparent outline-none ${dataKids.handlingType == "bullMating" && "bg-gray-300"}`}
                  value={dataKids.protocol}
                  onChange={handleDataKids}
                  disabled={dataKids.handlingType === "bullMating"}
                >
                  <option disabled value=""></option>
                  <option value="protocol1">Inseminação artificial</option>
                  <option value="protocol2">Inseminação </option>
                </select>
              </div>
            </article>

            <article className="flex flex-wrap gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-secondary">Andrológico:</p>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="positive"
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                    value="positive"
                    checked={dataKids.andrological === "positive"}
                    onChange={handleDataKids}
                  />
                  <label htmlFor="positive">Positivo</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="negative"
                    value="negative"
                    checked={dataKids.andrological === "negative"}
                    onChange={handleDataKids}
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
                    checked={dataKids.andrological === "notDone"}
                    onChange={handleDataKids}
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="notDone">Não realizado</label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-secondary">Sexo Fetal:</p>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={dataKids.gender === "female"}
                    onChange={handleDataKids}
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="female">Fêmea</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={dataKids.gender === "male"}
                    onChange={handleDataKids}
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="male">Macho</label>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="birthday">Data de Nascimento:</label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={
                    dataKids.birthday
                      ? new Date(dataKids.birthday).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleDataKids}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label
                  className="text-secondary"
                  htmlFor="bullIbodyConditionScoreatf"
                >
                  ECC (Escore de Condição Corporal):
                </label>
                <input
                  name="bodyConditionScore"
                  id="bullbodyConditionScoreIatf"
                  className={``}
                  type="range"
                  min="0"
                  max="5"
                  step="0,25"
                  value={dataKids.bodyConditionScore ?? ""}
                  onChange={handleDataKids}
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label className="text-secondary" htmlFor="bullIatf">
                  Touro utilizado na IATF:
                </label>
                <select
                  name="bullIatf"
                  id="bullIatf"
                  className={`min-w-24 max-w-40 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataKids.handlingType == "bullMating" && "bg-gray-400"}`}
                  value={dataKids.bullIatf ?? ""}
                  onChange={handleDataKids}
                >
                  <option disabled value=""></option>
                  <option value="comercial">Comercial</option>
                  {animals
                    .filter((animal) => animal.gender === "male")
                    .map((animal) => (
                      <option key={animal.id} value={animal.id ?? ""}>
                        Touro {animal.manualId}
                      </option>
                    ))}
                </select>
              </div>
            </article>

            <article className="flex justify-between">
              <Button
                type="button"
                onClick={handleActiveComponent}
                className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md"
              >
                Cancelar
              </Button>
              <Button type="button" onClick={handleActiveComponent}>
                Salvar
              </Button>
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
};
