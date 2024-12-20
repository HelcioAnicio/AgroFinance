import { Header } from "@/components/ui/header";
import { prisma } from "@/lib/useDataBase";
import { Animal } from "@/types/animal";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { CardInformation } from "./(components)/cardInformation";
import { CardReproduction } from "./(components)/cardReproduction";

interface AnimalDetailsProps {
  params: { id: string };
}

export const DetailAnimalId = async ({ params }: AnimalDetailsProps) => {
  const { id } = params;
  const animal = await prisma.animal.findUnique({
    where: { id },
    include: {
      bull: true,
      offspringFromBull: true,
      father: true,
      offspringFromFather: true,
      mother: true,
      offspringFromMother: true,
      owner: true,
      dewormings: true,
      diseases: true,
      vaccines: true,
    },
  });

  return (
    <>
      <Header />
      <div>
        <h1 className="text-center text-xl">
          Detalhes do animal {animal?.manualId}
        </h1>
        <Separator className="bg-foreground" />
      </div>

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
