"use client";

import React from "react";
// import { getServerSession } from "next-auth/next";
// import { GET as handlerGet } from "@/app/api/auth/[...nextauth]/route";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { status, data } = useSession();

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <>
      {status === "authenticated" && (
        <div className="m-auto flex w-full max-w-screen-lg justify-between py-4">
          <h1>
            Olá, seja bem vindo. Acesse nosso dashboard{" "}
            <Link href="/dashboard">click aqui</Link>{" "}
          </h1>
          <div className="flex items-center gap-2">
            {data?.user?.name}

            <Button onClick={async () => await handleLogoutClick()}>
              Logout
            </Button>
            <br />
          </div>
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
    </>
  );
};
export default Home;
