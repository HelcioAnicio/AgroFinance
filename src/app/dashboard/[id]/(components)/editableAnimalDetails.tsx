"use client";

import { Animal } from "@/types/animal";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { CardInformation } from "./cardInformation";
import { CardReproduction } from "./cardReproduction";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface EditableAnimalDetailsProps {
  animal: Animal;
}

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  animal,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const editDataOfAnimal = () => {
    setIsEditing(true);
  };
  const viewDataOfAnimal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between py-1">
        <h1 className="flex-1 text-center text-xl">
          Detalhes do animal {animal?.manualId}
        </h1>
        <div className="flex items-center gap-4">
          {isEditing === false ? (
            <>
              <button>
                <Trash2 className="text-red-500" />
              </button>
              <Button onClick={editDataOfAnimal}>Editar</Button>
            </>
          ) : (
            <>
              <Button onClick={viewDataOfAnimal}>Salvar</Button>
            </>
          )}
        </div>
      </div>
      <Separator className="bg-foreground" />

      <section className="flex flex-col gap-3 p-3">
        <CardInformation animal={animal as Animal} />

        <CardReproduction animal={animal as Animal} />

        <Card className="flex w-full max-w-lg items-center gap-3 p-2 px-5 py-2">
          <strong className="">Filhos: </strong>
          <div className="flex flex-wrap items-center gap-2">
            {animal?.offspringFromMother?.map((offspring) => (
              <Link href={`/${offspring.id}`} key={offspring.id}>
                <div className="w-max pt-3">
                  <span>Id: {offspring.manualId}</span> {" - "}
                  <span>
                    Sexo: {offspring.gender === "male" ? "Macho" : "Fêmea"}
                  </span>
                  <Separator className="bg-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
};

export default EditableAnimalDetails;
