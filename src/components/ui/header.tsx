"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ListFilter, CirclePlus } from "lucide-react";
import { AddAnimal } from "../../app/addAnimal/page";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  ownerId: string;
}

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface HeaderProps {
  animals: Animal[];
  users: User[];
}

export const Header: React.FC<HeaderProps> = ({ animals, users }) => {
  const { status, data } = useSession();

  const handleLogoutClick = () => {
    signOut();
  };

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
          <div>
            {status === "authenticated" && (
              <div className="flex items-center gap-2">
                {data?.user?.name}
                <Avatar>
                  <AvatarImage
                    src={data?.user?.image ?? undefined}
                    alt="Image from google profile"
                  />
                  <AvatarFallback className="text-foreground">
                    {data?.user?.name?.charAt(1)}{" "}
                  </AvatarFallback>
                </Avatar>
                <Button
                  className="bg-secondary p-1 text-foreground"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </div>
            )}

            {status === "unauthenticated" && (
              <div className="flex items-center gap-2">
                <Button>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="w-full max-w-60 border border-b-gray-400 bg-transparent p-1 shadow-md outline-none"
              type="search"
              name="inputSearch"
              id="inputSearch"
              placeholder="Pesquisar ID"
            />

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
          </div>
        </nav>
      </header>
      <AddAnimal animals={animals} users={users} />
    </Sheet>
  );
};
