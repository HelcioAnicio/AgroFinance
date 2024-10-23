"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ListFilter, CirclePlus } from "lucide-react";
import { AddAnimal } from "./addAnimal";

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
}

interface HeaderProps {
  animals: Animal[];
}

export const Header: React.FC<HeaderProps> = ({ animals }) => {
  return (
    <Sheet>
      <header className="flex w-full items-end justify-between p-2">
        <div className="w-1/3">
          <Image
            src="/logo"
            alt="Logo - Imagem de um touro e uma ovelha"
            width={100}
            height={100}
            className="size-24"
          />
        </div>
        <nav className="flex w-full flex-col items-end gap-4">
          <div className="flex gap-3">
            <Button className="flex gap-2 p-1">
              Filtros <ListFilter />
            </Button>
            <SheetTrigger asChild>
              <Button className="flex gap-2 p-1">
                Adicionar <CirclePlus />
              </Button>
            </SheetTrigger>
          </div>
          <input
            className="w-full max-w-60 border border-b-gray-400 bg-transparent p-1 shadow-md outline-none"
            type="search"
            name="inputSearch"
            id="inputSearch"
            placeholder="Pesquisar ID"
          />
        </nav>
      </header>
      <AddAnimal animals={animals} />
    </Sheet>
  );
};
