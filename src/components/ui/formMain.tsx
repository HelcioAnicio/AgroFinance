"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

interface InterfaceDataAnimalMain {
  reproductiveStatus: string;
  andrological: string;
}
export default function FormMain() {
  // const [componentStatus, setComponentStatus] = useState<bollean>(false)

  const [dataAnimalMain, setDataAnimalMain] = useState<InterfaceDataAnimalMain>(
    {
      reproductiveStatus: "",
      andrological: "",
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
    </>
  );
}
