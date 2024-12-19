import React from "react";
import { Animal } from "@/types/animal";
import { Card } from "@/components/ui/card";
import { empty } from "@prisma/client/runtime/library";

interface ReproductionProps {
  animal: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({ animal }) => {
  return (
    <>
      <Card>
        {animal?.gender === "male" && (
          <>
            <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
              <h2 className="text-xl">Dados reprodutivos</h2>
              <Card className="w-max px-3 py-1">
                <strong>Andrologico: </strong>
                <span>{animal?.andrological}</span>
              </Card>
            </section>
          </>
        )}

        {animal?.gender === "female" && (
          <>
            <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
              <h2 className="text-xl">Dados reprodutivos</h2>
              <Card className="w-max px-3 py-1">
                <strong>Status reprodutivo: </strong>
                <span>
                  {animal?.reproductiveStatus === "empty"
                    ? "Vazio"
                    : animal?.reproductiveStatus === "pregnant"
                      ? "Prenha"
                      : animal?.reproductiveStatus === "waiting"
                        ? "Em espera"
                        : "PEV"}
                </span>
              </Card>
              <Card className="w-max px-3 py-1">
                <strong>Tipo de manejo: </strong>
                <span>{animal?.handlingType || "N/A"}</span>
              </Card>
            </section>
            <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
              <Card className="w-max px-3 py-1">
                <strong>Id Touro: </strong>
                <span>{animal?.bullId || "N/A"}</span>
              </Card>
              <Card className="w-max px-3 py-1">
                <strong>Protocolo usado: </strong>
                <span>{animal?.protocol || "N/A"}</span>
              </Card>
            </section>
            <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
              <Card className="w-max px-3 py-1">
                <strong>Sexo fetal: </strong>
                <span>{animal?.fetalGender || "N/A"}</span>
              </Card>
              <Card className="w-max px-3 py-1">
                <strong>Expectativa parto: </strong>
                <span>
                  {animal?.expectedDueDate
                    ? new Date(animal.expectedDueDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </Card>
            </section>
            <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
              <Card className="w-max px-3 py-1">
                <strong>Touro da IATF: </strong>
                <span>{animal?.bullIatf || "N/A"}</span>
              </Card>
              <Card className="w-max px-3 py-1">
                <strong>ECC: </strong>
                <span>{animal?.bodyConditionScore || "N/A"}</span>
              </Card>
            </section>
          </>
        )}
      </Card>
    </>
  );
};
