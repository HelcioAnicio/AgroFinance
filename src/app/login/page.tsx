"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <div className="w-lwv">
      {status === "unauthenticated" && (
        <>
          <header className="flex items-center justify-center py-5">
            <figure className="flex flex-col items-center">
              <Image
                src="/logo"
                alt="Logo - Imagem de um touro e uma ovelha"
                width={200}
                height={200}
                className="size-40"
              />

              <figcaption>Seu agronegócio descomplicado</figcaption>
            </figure>
          </header>

          <main className="rounded-t-3xl bg-secondary px-2 py-6">
            <section>
              <form
                className="m-auto flex max-w-64 flex-col gap-4 py-5"
                action=""
                method="get"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded p-2 outline-none"
                />
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    placeholder="Senha"
                    className="rounded-2xl p-2 outline-none"
                  />
                  <p className="text-xs text-primary-foreground underline">
                    Esqueci minha senha
                  </p>
                </div>
                <Button className="m-auto mt-5 w-40 bg-foreground text-lg">
                  Entrar
                </Button>
              </form>
            </section>

            <div className="flex items-center gap-5 px-5">
              <hr className="black flex-1" />
              <span>ou</span>
              <hr className="black flex-1" />
            </div>

            <section className="flex flex-col items-center">
              <div className="flex justify-center gap-3 py-8">
                <button type="button" onClick={handleLoginClick}>
                  <FcGoogle className="text-3xl text-background" />
                </button>
              </div>
              <p>
                Ainda não tem conta?{" "}
                <span className="underline">Cadastre-se</span>
              </p>
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default LoginPage;
