import React from "react";
import { Header } from "@/components/ui/header";
import ClientAuth from "@/components/ui/clientAuth";

const Home = () => {
  return (
    <ClientAuth>
      <Header />
      <main className="m-auto w-full max-w-72 px-2">
        <h1 className="text-3xl">Tela Inicial</h1>
        <p>
          Aqui teremos uma tela que poderá ser a home do sistema. <br /> Nessa
          tela não precisa de login, e pode ser como apresentação do que será o
          projeto
        </p>
      </main>
    </ClientAuth>
  );
};
export default Home;
