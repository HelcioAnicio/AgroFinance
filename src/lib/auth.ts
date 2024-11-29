import NextAuth, { AuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/useDataBase"; // Ajuste conforme o caminho do seu projeto
import GoogleProvider from "next-auth/providers/google";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//     accessToken?: string;
//   }
// }

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET, // Assegure-se de ter a chave secreta definida em .env
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // Adiciona as informações do usuário ao token JWT quando ele fizer login
  //     if (user) {
  //       token.id = user.id as string; // Assegura que 'id' seja do tipo string
  //       token.email = user.email as string; // Assegura que 'email' seja do tipo string
  //       token.role = "authenticated"; // Defina o papel do usuário
  //     }

  //     // Adiciona o token de acesso do Google, se disponível
  //     if (account?.provider === "google" && account?.access_token) {
  //       token.accessToken = account.access_token as string; // Garantindo que accessToken seja uma string
  //     }

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Adiciona os dados do token à sessão
  //     if (session?.user) {
  //       session.user.id = token.id as string; // Garantindo que 'id' seja uma string
  //       session.user.email = token.email as string; // Garantindo que 'email' seja uma string
  //       session.user.role = token.role as string; // Garantindo que 'role' seja uma string
  //     }
  //     session.accessToken = token.accessToken; // Salva o token de acesso na sessão
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
