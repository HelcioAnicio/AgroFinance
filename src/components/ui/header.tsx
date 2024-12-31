"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const Header = () => {
  const { status, data } = useSession();

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <header className="flex w-full items-center justify-between p-2">
      <div className="w-1/3">
      <Link href={'/dashboard'}>
        <Image
          priority={true}
          src="/logo"
          alt="Logo - Imagem de um touro e uma ovelha"
          width={100}
          height={100}
          className="size-16"
        />
      </Link>
      </div>

      <nav className="flex w-full flex-col items-end gap-4">
        {status === "authenticated" && (
          <div className="flex items-center gap-1">
            {data?.user?.name}
            <Avatar className="size-8">
              <AvatarImage
                src={data?.user?.image ?? undefined}
                alt="Image from google profile"
              />
              <AvatarFallback className="text-foreground">
                {data?.user?.name?.charAt(0)}{" "}
              </AvatarFallback>
            </Avatar>
            <Button
              className="scale-75 bg-secondary p-1 text-accent"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </div>
        )}

        {status === "loading" && (
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-7 w-10" />
          </div>
        )}

        {status === "unauthenticated" && (
          <div className="m-auto flex w-full max-w-screen-lg justify-end py-4">
            <Button>
              <Link href="/login">Login</Link>{" "}
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
