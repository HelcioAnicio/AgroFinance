"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const { status, data } = useSession();

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <header className="flex w-full items-center justify-between p-2">
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
                  {data?.user?.name?.charAt(0)}{" "}
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
            <div className="m-auto flex w-full max-w-screen-lg justify-between py-4">
              <h1>
                Olá, se deseja logar e acessar o nosso dashboard{" "}
                <Button>
                  <Link href="/login">click aqui</Link>{" "}
                </Button>
              </h1>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
