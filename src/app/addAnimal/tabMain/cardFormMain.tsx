"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

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
  fetalGender: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
  ownerId: string | null;
}

interface CardFormMainProps {
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  animals: Animal[];
  setTabValue: (value: string) => void;
}

export const CardFormMain: React.FC<CardFormMainProps> = ({
  animals,
  allDataForm,
  handleInputValues,
  setTabValue,
}) => {
  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Formulário enviado! Dados do formulário:", allDataForm);
    setTabValue("reproducao");
    console.log("Tab alterada para 'reproducao'");
  };

  return (
    <Card className="min-h-96">
      <CardHeader className="py-2">
        <CardTitle>Informações principais</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <form action="" method="post" onSubmit={sendForm}>
          <section className="flex flex-col gap-4">
            <div className="flex items-end gap-1">
              <label className="text-secondary" htmlFor="manualId">
                Id do animal:
              </label>
              <input
                type="number"
                name="manualId"
                id="manualId"
                value={allDataForm.manualId ?? ""}
                onChange={handleInputValues}
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
                  value="female"
                  checked={allDataForm.gender === "female"}
                  onChange={handleInputValues}
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
                  checked={allDataForm.gender === "male"}
                  onChange={handleInputValues}
                  className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                />
                <label htmlFor="male">Macho</label>
              </div>
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
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleInputValues}
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
                  value={allDataForm.weight ?? ""}
                  onChange={handleInputValues}
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
                  value={allDataForm.breed ?? ""}
                  onChange={handleInputValues}
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
                  value={allDataForm.category ?? ""}
                  onChange={handleInputValues}
                  className="w-full border border-b border-b-primary bg-transparent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary" htmlFor="motherId">
                  Mãe:
                </label>
                <select
                  name="motherId"
                  id="motherId"
                  value={allDataForm.motherId ?? ""}
                  onChange={handleInputValues}
                  className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
                >
                  <option disabled value=""></option>
                  <option value="comercial">Comercial</option>
                  {animals
                    .filter((animal) => animal.gender === "Female")
                    .map((animal) => (
                      <option key={animal.id} value={animal.id ?? ""}>
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
                  value={allDataForm.fatherId ?? ""}
                  onChange={handleInputValues}
                  className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
                >
                  <option value="" disabled></option>
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
            </div>
            <Button className="mt-auto flex justify-self-end" type="submit">
              Próximo
            </Button>
          </section>
        </form>
      </CardContent>
    </Card>
  );
};
