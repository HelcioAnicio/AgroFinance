import { SquareArrowOutUpLeft } from "lucide-react";
import Link from "next/link";

interface Bovinos {
  id: number;
  raca: string;
  sexo: string;
  mae: string;
  pai: string;
  nascimento: string;
  categoria: string;
  peso: string;
}

export const Table = () => {
  const bovinos: Bovinos[] = [
    {
      id: 1,
      raca: "Nelore",
      sexo: "Fêmea",
      mae: "Vaca 10",
      pai: "Touro 5",
      nascimento: "01/01/2010",
      categoria: "Bovino",
      peso: "40@",
    },
    {
      id: 2,
      raca: "Angus",
      sexo: "Macho",
      mae: "Vaca 12",
      pai: "Touro 7",
      nascimento: "01/01/2010",
      categoria: "Bovino",
      peso: "40@",
    },
    {
      id: 3,
      raca: "Hereford",
      sexo: "Fêmea",
      mae: "Vaca 15",
      pai: "Touro 9",
      nascimento: "01/01/2010",
      categoria: "Bovino",
      peso: "40@",
    },
    {
      id: 4,
      raca: "Brahman",
      sexo: "Macho",
      mae: "Vaca 11",
      pai: "Touro 6",
      nascimento: "01/01/2010",
      categoria: "Bovino",
      peso: "40@",
    },
  ];

  return (
    <main className="overflow-x-auto scroll-smooth pb-5">
      <table className="min-w-[700px] border-collapse text-left">
        <thead className="border-collapse bg-primary text-background">
          <tr>
            <th className="px-1 py-2">ID</th>
            <th className="px-1 py-2">Raça</th>
            <th className="px-1 py-2">Sexo</th>
            <th className="px-1 py-2">Mãe</th>
            <th className="px-1 py-2">Pai</th>
            <th className="px-1 py-2">Nascimento</th>
            <th className="px-1 py-2">Categoria</th>
            <th className="px-1 py-2">Peso</th>
            <th className="sticky right-0 bg-primary px-1 py-2 text-background"></th>
          </tr>
        </thead>
        <tbody className="relative">
          {bovinos.map((bovino, index) => (
            <tr
              key={bovino.id}
              className={`${index % 2 === 0 ? "bg-muted" : ""}`}
            >
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.id}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.raca}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.sexo}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.mae}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.pai}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.nascimento}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.categoria}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  {bovino.peso}
                </Link>
              </td>
              <td
                className={`sticky right-0 px-1 py-3 ${
                  index % 2 === 0 ? "bg-muted" : "bg-background"
                }`}
              >
                <Link
                  href={`/bovinos/${bovino.id}`}
                  className="block h-full w-full"
                >
                  <SquareArrowOutUpLeft size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
