import React from "react";
import { Card } from "@/components/ui/card";
import { Animal } from "@/types/animal";
import { Circle } from "lucide-react";

interface InformationProps {
  animal: Animal | null;
}

export const CardInformation: React.FC<InformationProps> = ({ animal }) => {
  return (
    <Card className="flex w-full max-w-sm flex-col gap-2 p-2 sm:flex-row sm:flex-wrap sm:gap-4">
      <h2 className="pl-2 text-xl">Dados básicos</h2>

      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max px-3 py-1">
          <strong>Id: </strong>
          <span>{animal?.manualId}</span>
        </Card>
        <Card className="w-max px-3 py-1">
          <strong>Status: </strong>
          <span>
            {animal?.status === "active" ? (
              <>
                Ativo{" "}
                <Circle className="inline-block size-3 rounded-full bg-green-400 text-green-400" />
              </>
            ) : (
              <>
                Inativo{" "}
                <Circle className="text-graybg-gray-500 inline-block size-3 rounded-full bg-gray-500" />
              </>
            )}
          </span>
        </Card>
        <Card className="w-max px-3 py-1">
          <strong>Sexo: </strong>
          <span>{animal?.gender === "male" ? "Macho" : "Fêmea"}</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max px-3 py-1">
          <strong>Nascimento: </strong>
          <span>
            {animal?.birthDate
              ? new Date(animal.birthDate).toLocaleDateString()
              : "N/A"}
          </span>
        </Card>
        <Card className="w-max px-3 py-1">
          <strong>Peso: </strong>
          <span>{animal?.weight} kg</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max px-3 py-1">
          <strong>Raça: </strong>
          <span>{animal?.breed}</span>
        </Card>
        <Card className="w-max px-3 py-1">
          <strong>Categoria: </strong>
          <span>{animal?.category}</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max px-3 py-1">
          <strong>Id Mãe: </strong>
          <span>{animal?.mother?.manualId || "Comercial"}</span>
        </Card>
        <Card className="w-max px-3 py-1">
          <strong>Id Pai: </strong>
          <span>{animal?.father?.manualId || "Comercial"}</span>
        </Card>
      </section>
    </Card>
  );
};
