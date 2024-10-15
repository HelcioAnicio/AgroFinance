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
  bodyConditionScore: string;
}

interface InterfaceComponentFormReproductionProps {
  setStatusComponentAddKids: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormMain: React.FC<InterfaceComponentFormReproductionProps> = ({
  setStatusComponentAddKids,
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
                        className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
                        value={dataAnimalMain.bullId}
                        onChange={handleDataAnimalMain}
                      >
                        <option disabled value=""></option>
                        <option value="bull10">Touro 10</option>
                        <option value="bull120">Touro 120</option>
                      </select>
                    </div>

                    <div className="flex w-full flex-col gap-1">
                      <label htmlFor="protocol" className="text-secondary">
                        Protocolo usado:
                      </label>
                      <select
                        name="protocol"
                        id="protocol"
                        className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${dataAnimalMain.handlingType !== "artificialInsemination" && "bg-gray-400"}`}
                        value={dataAnimalMain.protocol}
                        onChange={handleDataAnimalMain}
                        disabled={
                          dataAnimalMain.handlingType !==
                          "artificialInsemination"
                        }
                      >
                        <option disabled value=""></option>
                        <option value="artificialInsemination">
                          Inseminação artificial
                        </option>
                        <option value="insemination">Inseminação </option>
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

                  <article>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="birthday">Data de Nascimento:</label>
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        // onChange={handledataAnimalMain}
                        className="w-full border border-b border-b-primary bg-transparent outline-none"
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
