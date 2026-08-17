import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import {
  createFarmSession,
  validateFarmSession,
  deleteFarmSession,
} from '@/lib/farmSessions';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AdapterUser } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const passwordMatch = user?.password
          ? await bcrypt.compare(credentials?.password ?? '', user.password)
          : false;
        if (user && passwordMatch) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPass } = user;
          return userWithoutPass as AdapterUser;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // Precisa bater com SESSION_TTL_MS em farmSessions.ts: se a linha de
    // FarmSession expirar antes do cookie, o cookie continua válido depois
    // dela já ter sido limpa e o dono é deslogado à força sem motivo.
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, trigger, user }) {
      if (trigger === 'signIn' && user?.id) {
        // Gera um ID único para esta sessão
        const jti = randomUUID();
        token.jti = jti;
        token.userId = user.id;
        token.lastSessionCheck = Date.now();
        // Precisa ser esperado de verdade: unstable_after() não se mostrou
        // confiável aqui (logs de produção mostram sessões que nunca chegavam
        // a ser gravadas). Await garante que a sessão já existe no banco antes
        // do cookie ser devolvido ao navegador — sem isso a checagem seguinte
        // não encontra a sessão e desloga o usuário mesmo tendo acabado de
        // logar.
        await createFarmSession(user.id, jti);
      } else if (token.jti) {
        // Valida a sessão a cada 5 minutos para detectar evicção
        const CHECK_INTERVAL = 5 * 60 * 1000;
        const now = Date.now();
        const lastCheck = (token.lastSessionCheck as number) ?? 0;
        if (now - lastCheck > CHECK_INTERVAL) {
          const valid = await validateFarmSession(
            token.jti as string,
            token.userId as string | undefined
          );
          // Sempre avança o relógio do throttle, mesmo em caso de falha: boa
          // parte das chamadas que chegam aqui vêm de getServerSession() em
          // rotas de API comuns, que não conseguem persistir essa mutação de
          // volta no cookie (só os endpoints do próprio NextAuth reemitem
          // Set-Cookie) — sem isso, uma vez que a checagem falhasse uma vez,
          // ela rodava de novo em toda requisição seguinte, martelando o banco.
          token.lastSessionCheck = now;
          if (!valid) {
            // Não foi possível validar nem autocurar — marca para sign-out
            token.evicted = true;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.evicted) {
        // Propaga flag para o cliente disparar signOut automático
        (session as unknown as Record<string, unknown>).evicted = true;
      }
      return session;
    },
  },
  events: {
    async signOut(message) {
      // Remove a sessão da fazenda ao fazer logout (JWT strategy: message.token)
      const token = 'token' in message ? message.token : null;
      if (token?.jti) {
        await deleteFarmSession(String(token.jti));
      }
    },
    async createUser({ user }) {
      if (!user.id || !user.email) return;

      const existingMembership = await prisma.farmMembership.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });

      if (existingMembership) return;

      // Verifica se existe um convite pendente para este e-mail (ex: cadastro via Google)
      const pendingInvite = await prisma.farmInvite.findFirst({
        where: {
          email: { equals: user.email, mode: 'insensitive' },
          status: 'PENDING',
          expiresAt: { gt: new Date() },
        },
      });

      if (pendingInvite) {
        await prisma.$transaction(async (tx) => {
          await tx.farmMembership.create({
            data: {
              farmId: pendingInvite.farmId,
              userId: user.id!,
              role: pendingInvite.role,
            },
          });
          await tx.farmInvite.update({
            where: { id: pendingInvite.id },
            data: {
              status: 'ACCEPTED',
              acceptedById: user.id,
              acceptedAt: new Date(),
            },
          });
          await tx.user.update({
            where: { id: user.id! },
            data: { activeFarmId: pendingInvite.farmId },
          });
        });
        return;
      }

      const trialEndsAt = new Date();

      const farm = await prisma.farm.create({
        data: {
          name: user.name ? `${user.name} Fazenda` : 'Minha Fazenda',
          ownerUserId: user.id,
          trialEndsAt,
          subscriptionStatus: 'INCOMPLETE',
        },
      });

      await prisma.farmMembership.create({
        data: {
          farmId: farm.id,
          userId: user.id,
          role: 'OWNER',
        },
      });
    },
  },
  // pages: {
  //   signIn: '/login',
  // },
};

export default NextAuth(authOptions);
