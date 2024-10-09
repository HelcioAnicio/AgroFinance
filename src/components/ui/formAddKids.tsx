"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface InterfaceAddDataKids {
  handlingType: string;
  bullId: string;
  protocol: string;
  andrological: string;
  gender: string;
}

export default function FormAddKids() {
  const [dataKids, setDataKids] = useState<InterfaceAddDataKids>({
    handlingType: "",
    bullId: "",
    protocol: "",
    andrological: "",
    gender: "",
  });

  function handleDataKids(
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setDataKids((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function clickConsole() {
    console.log(dataKids);
  }
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

            <article className="flex gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="bullId">
                  Touro utilizado:
                </label>
                <select
                  name="bullId"
                  id="bullId"
                  className="w-24 border border-b border-b-primary bg-transparent outline-none"
                  value={dataKids.bullId}
                  onChange={handleDataKids}
                >
                  <option disabled value=""></option>
                  <option value="bull10">Touro 10</option>
                  <option value="bull120">Touro 120</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="protocol" className="text-secondary">
                  Protocolo usado:
                </label>
                <select
                  name="protocol"
                  id="protocol"
                  className="w-28 border border-b border-b-primary bg-transparent outline-none"
                  value={dataKids.protocol}
                  onChange={handleDataKids}
                >
                  <option disabled value=""></option>
                  <option value="inseminationArtificial">
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
                    value={dataKids.andrological}
                    // onChange={handleDataKids}
                  />
                  <label htmlFor="positive">Positivo</label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="negative"
                    value={dataKids.andrological}
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="negative">Negativo</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="andrological"
                    id="notDone"
                    value={dataKids.andrological}
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
                    value={dataKids.gender}
                    className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                  />
                  <label htmlFor="female">Fêmea</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value={dataKids.gender}
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
                  // onChange={handledataKids}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
            </article>
            <article className="flex justify-between">
              <Button className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md">
                Cancelar
              </Button>
              <Button onClick={clickConsole}>Salvar</Button>
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
