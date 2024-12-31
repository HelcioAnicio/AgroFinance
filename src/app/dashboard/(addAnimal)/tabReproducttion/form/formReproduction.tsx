"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { Animal } from "@/types/animal";
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';

interface InterfaceComponentFormReproductionProps {
  setStatusComponentAddKids: React.Dispatch<React.SetStateAction<boolean>>;
  animals: Animal[];
  users: User[];
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

const FormMain: React.FC<InterfaceComponentFormReproductionProps> = ({
  setStatusComponentAddKids,
  animals,
  users,
  allDataForm,
  handleInputValues,
  setTabValue,
}) => {

  const { data: session } = useSession();

  const userEmail = users.find((user) => user.email === session?.user?.email);
  const userId = userEmail?.id;
  
  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];

  const handleActiveComponent = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Componente de filhos ativado");
    setStatusComponentAddKids(true);
  };

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(allDataForm);
    setTabValue("sanitarias");
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
              {allDataForm.gender === "male" ? (
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
              ) : (
                <>
                  <article className="flex flex-col gap-1">
                    <label
                      className="text-secondary"
                      htmlFor="reproductiveStatus"
                    >
                      Status reprodutivo:
                    </label>
                    <select
                      name="reproductiveStatus"
                      id="reproductiveStatus"
                      className="w-32 border border-b border-b-primary bg-transparent outline-none"
                      value={allDataForm.reproductiveStatus ?? ""}
                      onChange={handleInputValues}
                    >
                      <option disabled value=""></option>
                      <option value="empty">Vazia</option>
                      <option value="pregnant">Prenha</option>
                      <option value="waiting">Em espera</option>
                      <option value="pev">PEV</option>
                    </select>
                  </article>

                  {allDataForm.reproductiveStatus === "pregnant" && (
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
                              .filter(
                                (animal) =>
                                  animal.ownerId === userId && animal.gender === "male",
                              )
                              .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0))
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
                              .filter(
                                (animal) =>
                                  animal.ownerId === userId && animal.gender === "male",
                              )
                              .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0))
                              .map((animal) => (
                                <option key={animal.id} value={animal.id ?? ""}>
                                  Touro {animal.manualId}
                                </option>
                            ))}
                          </select>
                        </div>
                      </article>
                    </>
                  )}

                  {allDataForm.reproductiveStatus === "waiting" && (
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
                  )}

                  {allDataForm.reproductiveStatus === "pev" && (
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
                  )}
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
                <Button type="submit" onClick={sendForm}>
                  Próximo
                </Button>
              </article>
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default FormMain;
