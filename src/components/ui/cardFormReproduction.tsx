"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function CardFormReproduction() {
  const [reproductiveStatus, setReproductiveStatus] = useState<string>("");

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setReproductiveStatus(event.target.value);
    console.log(reproductiveStatus);
  }

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
                  value={reproductiveStatus}
                  onChange={handleChangeSelect}
                >
                  <option disabled value=""></option>
                  <option value="empty">Vazia</option>
                  <option value="pregnant">Prenha</option>
                  <option value="waiting">Em espera</option>
                  <option value="pev">PEV</option>
                </select>
              </article>
              {reproductiveStatus === "empty" && (
                <article className="flex flex-col gap-1">
                  <p className="text-secondary">Andrológico:</p>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="positive"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                    />
                    <label htmlFor="positive">Positivo</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="negative"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                    />
                    <label htmlFor="negative">Negativo</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="andrological"
                      id="notDone"
                      className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                    />
                    <label htmlFor="notDone">Não realizado</label>
                  </div>
                </article>
              )}

              <article className="flex w-full justify-between">
                <Button className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md">
                  Adicionar filhos <CirclePlus />
                </Button>
                <Button type="submit">Próximo</Button>
              </article>
            </section>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>Filhos anteriores</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-4">
            <article className="flex flex-wrap gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="handlingMethod">
                  Manejo utilizado:
                </label>
                <select
                  name="handlingMethod"
                  id="handlingMethod"
                  className="w-44 border border-b border-b-primary bg-transparent outline-none"
                  value={reproductiveStatus}
                >
                  <option disabled value=""></option>
                  <option value="bullMating">Touro</option>
                  <option value="artificialInsemination">
                    Inteligência Artifical
                  </option>
                  <option value="allMethods">Todos os metodos</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="reproductiveStatus">
                  Touro utilizado:
                </label>
                <select
                  name="reproductiveStatus"
                  id="reproductiveStatus"
                  className="w-32 border border-b border-b-primary bg-transparent outline-none"
                  value={reproductiveStatus}
                  onChange={handleChangeSelect}
                >
                  <option disabled value=""></option>
                  <option value="bull">Touro 10</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="inseminationProtocol"
                  className="text-secondary"
                >
                  Protocolo utilizado
                </label>
                <select
                  name="inseminationProtocol"
                  id="inseminationProtocol"
                  className="w-32 border border-b border-b-primary bg-transparent outline-none"
                  value=""
                >
                  <option disabled value=""></option>
                  <option value="insemination">Inseminação artificial</option>
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
                  />
                  <label htmlFor="positive">Positivo</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="negative"
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="negative">Negativo</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="notDone"
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
                    name="gender"
                    id="female"
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="female">Fêmea</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
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
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
            </article>
            <article className="flex justify-between">
              <Button className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md">
                Cancelar
              </Button>
              <Button>Salvar</Button>
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
