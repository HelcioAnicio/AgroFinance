import { SquareArrowOutUpLeft } from "lucide-react";
import Link from "next/link";

interface Animal {
  id: string;
  manualId: string;
  gender: string;
  birthDate: Date;
  weight: number;
  breed: string;
  category: string;
  motherId: string;
  fatherId: string;
  reproductiveStatus: string;
  handlingType: string;
  bullId: string;
  protocol: string;
  andrological: string;
  expectedDueDate: Date;
  bullIatf: string;
  bodyConditionScore: number;
}

interface TableProps {
  animals: Animal[];
}

export const Table: React.FC<TableProps> = ({ animals }) => {
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
          {animals.map((animal, index) => (
            <tr
              key={animal.id}
              className={`${index % 2 === 0 ? "bg-muted" : ""}`}
            >
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.manualId}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.breed}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.gender}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.motherId}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.fatherId}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {new Date(animal.birthDate).toLocaleDateString()}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.category}
                </Link>
              </td>
              <td className="px-1 py-3">
                <Link
                  href={`/bovinos/${animal.id}`}
                  className="block h-full w-full"
                >
                  {animal.weight}
                </Link>
              </td>
              <td
                className={`sticky right-0 px-1 py-3 ${
                  index % 2 === 0 ? "bg-muted" : "bg-background"
                }`}
              >
                <Link
                  href={`/bovinos/${animal.id}`}
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
