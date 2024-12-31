"use client";

import { Circle, SquareArrowOutUpLeft } from "lucide-react";
import Link from "next/link";
import { Animal } from "@/types/animal";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ListFilter, CirclePlus } from "lucide-react";
import { AddAnimal } from "../../app/dashboard/(addAnimal)/addAnimals";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AddAnimalDesktop } from "@/app/dashboard/(addAnimal)/addAnimalsDesktop";

interface TableProps {
  animals: Animal[];
  users: User[];
}

export const Table: React.FC<TableProps> = ({ animals, users }) => {
  const { data: session } = useSession();
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const userId = userEmail?.id;
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    const sorted = animals
      .filter((animal) => animal.ownerId === userId)
      .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0));
    setOriginalAnimals(sorted);
    setListAnimals(sorted);
  }, [animals, userId]);

  useEffect(() => {
    if (inputValue === undefined) {
      setListAnimals(originalAnimals);
    } else {
      const filtered = originalAnimals
        .filter((animal) => animal.manualId == inputValue)
        .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0));
      setListAnimals(filtered);
    }
  }, [inputValue, originalAnimals]);

  const handleAnimalAdded = (newAnimal: Animal) => {
    setListAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort(
        (a, b) => (a.manualId ?? 0) - (b.manualId ?? 0),
      );
    });
    setOriginalAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort(
        (a, b) => (a.manualId ?? 0) - (b.manualId ?? 0),
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(
      event.target.value ? parseFloat(event.target.value) : undefined,
    );
  };

  return (
    <main className="overflow-x-auto scroll-smooth pb-5 max-w-[750px] m-auto">
      <div className="sticky right-0 top-0 z-50 w-full">
        <div className="flex w-full justify-between gap-10 px-1 sm:justify-end">
          <input
            className="w-full max-w-40 border border-b-gray-400 bg-input p-1 shadow-sm outline-none"
            type="search"
            name="inputSearch"
            id="inputSearch"
            placeholder="Pesquisar ID"
            onChange={handleInputChange}
          />

          <div className="flex gap-1">
            <Button className="flex gap-1 p-1">
              Filtros <ListFilter className="size-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex gap-2 p-1 sm:hidden">
                  Adicionar <CirclePlus className="size-4" />
                </Button>
              </SheetTrigger>
              <AddAnimal
                animals={animals}
                users={users}
                onAnimalAdded={handleAnimalAdded}
              />
            </Sheet>
            <AlertDialog>
              <AlertDialogTrigger className="hidden bg-primary text-background gap-2 p-1 rounded-md sm:flex items-center justify-center">
                  Adicionar <CirclePlus className="size-4" />
              </AlertDialogTrigger>
              <AddAnimalDesktop
                animals={animals}
                users={users}
                onAnimalAdded={handleAnimalAdded}
              />
            </AlertDialog>
          </div>
        </div>
      </div>
      <br />
      <table className="m-auto min-w-[750px] border-collapse text-left xl:text-sm">
        <thead className="border-collapse bg-primary text-background">
          <tr>
            <th className="px-1 py-2">Status</th>
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
        <tbody className="h-[calc(100%-200px)] overflow-y-auto scroll-smooth">
          {listAnimals.map((animal: Animal, index: number) => {

            return (
              <tr
                key={animal.id}
                className={`${index % 2 === 0 ? "bg-muted" : ""}`}
              >
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal?.status === "active" ? (
                      <>
                        <Circle className="inline-block size-3 rounded-full bg-green-400 text-green-400" />
                        {" "}Ativo
                      </>
                    ) : (
                      <>
                        <Circle className="text-graybg-gray-500 inline-block size-3 rounded-full bg-gray-500" />
                        {" "}Inativo
                      </>
                    )}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal.manualId}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal.breed}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal.gender === "male" ? "Macho" : "Fêmea"}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.motherId}`}
                    className="block h-full w-full"
                  >
                    {animal.motherId ? `Vaca ${animal.mother?.id}` : "Comercial"}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.fatherId}`}
                    className="block h-full w-full"
                  >
                    {animal.fatherId ? `Touro ${animal.father?.manualId}` : "Comercial"}
                  </Link>
                </td>
                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal.birthDate
                      ? new Date(animal.birthDate).toLocaleDateString()
                      : "N/A"}
                  </Link>
                </td>

                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {`${animal.category[0].toUpperCase()}${animal.category.substring(1)}`}
                  </Link>
                </td>

                <td className="px-1 py-3">
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    {animal.weight} Kg
                  </Link>
                </td>
                <td
                  className={`sticky right-0 px-1 py-3 ${
                    index % 2 === 0 ? "bg-muted" : "bg-background"
                  }`}
                >
                  <Link
                    href={`dashboard/${animal.id}`}
                    className="block h-full w-full"
                  >
                    <SquareArrowOutUpLeft size={20} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
