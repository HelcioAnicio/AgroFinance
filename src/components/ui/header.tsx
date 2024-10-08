"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ListFilter, CirclePlus } from "lucide-react";

import AddAnimal from "./addAnimal";

export const Header = () => {
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
            className="w-full max-w-60 rounded-xl border bg-transparent p-1 shadow-md outline-none"
            type="search"
            name="inputSearch"
            id="inputSearch"
            placeholder="Pesquisar ID"
          />
        </nav>
      </header>
      <AddAnimal />
    </Sheet>
  );
};
