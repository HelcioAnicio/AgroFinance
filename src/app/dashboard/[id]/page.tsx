import { Header } from "@/components/ui/header";
import { prisma } from "@/lib/useDataBase";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface AnimalDetailsProps {
  params: { id: string };
}

const DetailAnimalId: React.FC<AnimalDetailsProps> = async ({ params }) => {
  const { id } = await params;
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
      <main className="flex flex-col gap-2">
        <h1 className="text-center text-xl">
          Detalhes do animal {animal?.manualId}
        </h1>
        <Separator className="bg-foreground" />

        <Card>
          <h2 className="pl-2 text-xl">Dados reprodutivos</h2>

          <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
            <Card className="w-max px-3 py-1">
              <strong>Id: </strong>
              <span>{animal?.manualId}</span>
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
                  <span>{animal?.reproductiveStatus || "N/A"}</span>
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

        <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
          <Card className="w-max px-5 py-1">
            <strong>Filhos: </strong>
            {animal?.offspringFromMother?.map((offspring) => (
              <Link href={`/${offspring.id}`}>
                <div className="pt-3">
                  <span>Id: {offspring.manualId}</span> {" - "}
                  <span>
                    Sexo: {offspring.gender === "male" ? "Macho" : "Fêmea"}
                  </span>
                  <Separator className="bg-foreground" />
                </div>
              </Link>
            ))}
          </Card>

          <Card className="w-max px-5 py-1">
            <strong>Owner Id: </strong>
            <span>{animal?.ownerId}</span>
          </Card>
        </section>
      </main>
    </>
  );
};

export default DetailAnimalId;
