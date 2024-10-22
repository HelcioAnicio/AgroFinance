"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

interface InterfaceDataAnimalMain {
  reproductiveStatus: string;
  handlingType: string;
  bullId: string;
  protocol: string;
  andrological: string;
  fetalGender: string;
  expectedDueDate: string;
  bullIatf: string;
  bodyConditionScore: string;
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
}

const FormMain: React.FC<InterfaceComponentFormReproductionProps> = ({
  setStatusComponentAddKids,
  animals,
}) => {
  const [dataAnimalMain, setDataAnimalMain] = useState<InterfaceDataAnimalMain>(
    {
      reproductiveStatus: "",
      handlingType: "",
      bullId: "",
      protocol: "",
      andrological: "",
      fetalGender: "",
      expectedDueDate: "",
      bullIatf: "",
      bodyConditionScore: "",
    },
  );

  function handleDataAnimalMain(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setDataAnimalMain((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleActiveComponent = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Componente de filhos ativado");
    setStatusComponentAddKids(true);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="py-2">
          <CardTitle>Informações reprodutivas</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col p-1">
          <form action="" method="post" className="flex h-full flex-col">
            <section className="flex flex-grow flex-col gap-4">
              <article className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="reproductiveStatus">
                  Status reprodutivo:
                </label>
                <select
                  name="reproductiveStatus"
                  id="reproductiveStatus"
                  className="w-32 border border-b border-b-primary bg-transparent outline-none"
                  value={dataAnimalMain.reproductiveStatus}
                  onChange={handleDataAnimalMain}
                >
                  <option disabled value=""></option>
                  <option value="empty">Vazia</option>
                  <option value="pregnant">Prenha</option>
                  <option value="waiting">Em espera</option>
                  <option value="pev">PEV</option>
                </select>
              </article>
              {dataAnimalMain.reproductiveStatus === "empty" && (
                <article className="flex flex-col gap-1">
                  <p className="text-secondary">Andrológico:</p>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="positive"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                      value={dataAnimalMain.andrological}
                    />
                    <label htmlFor="positive">Positivo</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="negative"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                      value={dataAnimalMain.andrological}
                    />
                    <label htmlFor="negative">Negativo</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="notDone"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                      value={dataAnimalMain.andrological}
                    />
                    <label htmlFor="notDone">Não realizado</label>
                  </div>
                </article>
              )}

              {dataAnimalMain.reproductiveStatus === "pregnant" && (
                <>
                  <article className="flex flex-wrap gap-5">
                    <div className="flex flex-col gap-1">
                      <label className="text-secondary" htmlFor="handlingType">
                        Manejo utilizado:
                      </label>
                      <select
                        name="handlingType"
                        id="handlingType"
                        className="w-44 border border-b border-b-primary bg-transparent outline-none"
                        value={dataAnimalMain.handlingType}
                        onChange={handleDataAnimalMain}
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
                        className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType == "bullMating" && "bg-gray-300"}`}
                        disabled={
                          dataAnimalMain.handlingType ===
                          "artificialInsemination"
                        }
                        value={dataAnimalMain.bullId}
                        onChange={handleDataAnimalMain}
                      >
                        <option disabled value=""></option>
                        <option value="comercial">Comercial</option>

                        {animals.map((animal) => (
                          <option key={animal.id} value={animal.manualId ?? ""}>
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
                        className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType === "bullMating" && "bg-gray-300"}`}
                        value={dataAnimalMain.protocol}
                        onChange={handleDataAnimalMain}
                        disabled={dataAnimalMain.handlingType === "bullMating"}
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
                      <p className="text-secondary">Andrológico:</p>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="andrological"
                          id="positive"
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                          value={dataAnimalMain.andrological}
                          onChange={handleDataAnimalMain}
                        />
                        <label htmlFor="positive">Positivo</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="andrological"
                          id="negative"
                          value={dataAnimalMain.andrological}
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="negative">Negativo</label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="andrological"
                          id="notDone"
                          value={dataAnimalMain.andrological}
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="notDone">Não realizado</label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-secondary">Sexo:</p>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="fetalGender"
                          id="female"
                          value={dataAnimalMain.fetalGender}
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="female">Fêmea</label>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="fetalGender"
                          id="male"
                          value={dataAnimalMain.fetalGender}
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="male">Macho</label>
                      </div>
                    </div>
                  </article>

                  <article className="flex flex-wrap gap-5">
                    {/* <h2 className="mb-3 text-xl text-primary">
                      Diagnóstico de gestação
                    </h2> */}
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
                        value={dataAnimalMain.expectedDueDate}
                        onChange={handleDataAnimalMain}
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
                      <input
                        name="bodyConditionScore"
                        id="bullbodyConditionScoreIatf"
                        className={``}
                        type="range"
                        min="0"
                        max="5"
                        step="0,25"
                        value={dataAnimalMain.bodyConditionScore}
                        onChange={handleDataAnimalMain}
                      />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                      <label className="text-secondary" htmlFor="bullIatf">
                        Touro utilizado na IATF:
                      </label>
                      <select
                        name="bullIatf"
                        id="bullIatf"
                        className={`min-w-24 max-w-40 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType == "bullMating" && "bg-gray-400"}`}
                        value={dataAnimalMain.bullIatf}
                        onChange={handleDataAnimalMain}
                      >
                        <option disabled value=""></option>
                        <option value="comercial">Comercial</option>

                        {animals.map((animal) => (
                          <option key={animal.id} value={animal.manualId ?? ""}>
                            Touro {animal.manualId}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                </>
              )}

              {dataAnimalMain.reproductiveStatus === "waiting" && (
                <>
                  <article className="flex flex-wrap gap-5">
                    <div className="flex flex-col gap-1">
                      <label className="text-secondary" htmlFor="handlingType">
                        Manejo utilizado:
                      </label>
                      <select
                        name="handlingType"
                        id="handlingType"
                        className="w-44 border border-b border-b-primary bg-transparent outline-none"
                        value={dataAnimalMain.handlingType}
                        onChange={handleDataAnimalMain}
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
                        className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType == "bullMating" && "bg-gray-300"}`}
                        disabled={
                          dataAnimalMain.handlingType ===
                          "artificialInsemination"
                        }
                        value={dataAnimalMain.bullId}
                        onChange={handleDataAnimalMain}
                      >
                        <option disabled value=""></option>
                        <option value="comercial">Comercial</option>

                        {animals.map((animal) => (
                          <option key={animal.id} value={animal.manualId ?? ""}>
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
                        className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType === "bullMating" && "bg-gray-300"}`}
                        value={dataAnimalMain.protocol}
                        onChange={handleDataAnimalMain}
                        disabled={dataAnimalMain.handlingType === "bullMating"}
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
              )}

              {dataAnimalMain.reproductiveStatus === "pev" && (
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
                        value={dataAnimalMain.expectedDueDate}
                        onChange={handleDataAnimalMain}
                        className="w-full max-w-40 border border-b border-b-primary bg-transparent outline-none"
                      />
                    </div>
                  </article>
                </>
              )}

              <article className="flex w-full justify-between">
                <Button
                  type="button"
                  className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md"
                  onClick={handleActiveComponent}
                >
                  Adicionar filhos <CirclePlus />
                </Button>
                <Button type="submit">Próximo</Button>
              </article>
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default FormMain;
