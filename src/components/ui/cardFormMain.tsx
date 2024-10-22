"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";

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

interface CardFormMainProps {
  animals: Animal[];
}

interface InterfaceDataFormMain {
  manualId: string;
  gender: string;
  birthDate: string;
  weight: number;
  breed: string;
  category: string;
  motherId: string;
  fatherId: string;
}

export const CardFormMain: React.FC<CardFormMainProps> = ({ animals }) => {
  const [dataFormMain, setDataFormMain] = useState<InterfaceDataFormMain>(
    {} as InterfaceDataFormMain,
  );

  const handleDataFormMain = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDataFormMain((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(dataFormMain);
  };

  return (
    <Card className="min-h-96">
      <CardHeader className="py-2">
        <CardTitle>Informações principais</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <form action="" method="post">
          <section className="flex flex-col gap-4">
            <div className="flex items-end gap-1">
              <label className="text-secondary" htmlFor="idAnimal">
                Id do animal:
              </label>
              <input
                type="text"
                name="idAnimal"
                id="idAnimal"
                value={dataFormMain.manualId}
                onChange={handleDataFormMain}
                className="w-20 border border-b border-b-primary bg-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <span className="text-secondary">Sexo:</span>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value={dataFormMain.gender}
                  onChange={handleDataFormMain}
                  className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                />
                <label htmlFor="female">Fêmea</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value={dataFormMain.gender}
                  onChange={handleDataFormMain}
                  className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                />
                <label htmlFor="male">Macho</label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-secondary" htmlFor="birthday">
                  Nascimento:
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={dataFormMain.birthDate}
                  onChange={handleDataFormMain}
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
                  value={dataFormMain.weight}
                  onChange={handleDataFormMain}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="breed">
                  Raça:
                </label>
                <input
                  type="text"
                  name="breed"
                  id="breed"
                  value={dataFormMain.breed}
                  onChange={handleDataFormMain}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="category">
                  Categoria:
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={dataFormMain.category}
                  onChange={handleDataFormMain}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="mother">
                  Mãe:
                </label>
                <input
                  type="text"
                  name="mother"
                  id="mother"
                  value={dataFormMain.motherId}
                  onChange={handleDataFormMain}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-secondary" htmlFor="father">
                  Pai:
                </label>
                <input
                  type="text"
                  name="father"
                  id="father"
                  value={dataFormMain.fatherId}
                  onChange={handleDataFormMain}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
            </div>
            <Button
              className="mt-auto flex justify-self-end"
              type="submit"
              onClick={sendForm}
            >
              Próximo
            </Button>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};
