import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import { updateStripeSeats } from '@/lib/stripeSeats';
import { createFarmSession, validateFarmSession, deleteFarmSession } from '@/lib/farmSessions';
import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && credentials?.password === user.password) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPass } = user;
          return userWithoutPass as {
            id: string;
            name?: string | null;
            email?: string | null;
            emailVerified?: Date | null;
            image?: string | null;
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, trigger, user }) {
      if (trigger === 'signIn' && user?.id) {
        // Gera um ID único para esta sessão
        const jti = randomUUID();
        token.jti = jti;
        token.userId = user.id;
        token.lastSessionCheck = Date.now();
        // Registra sessão na fazenda em background — não bloqueia o login
        void createFarmSession(user.id, jti);
      } else if (token.jti) {
        // Valida a sessão a cada 5 minutos para detectar evicção
        const CHECK_INTERVAL = 5 * 60 * 1000;
        const now = Date.now();
        const lastCheck = (token.lastSessionCheck as number) ?? 0;
        if (now - lastCheck > CHECK_INTERVAL) {
          const valid = await validateFarmSession(token.jti as string);
          if (!valid) {
            // Sessão foi evictada — marca para sign-out no cliente
            token.evicted = true;
          } else {
            token.lastSessionCheck = now;
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
            data: { farmId: pendingInvite.farmId, userId: user.id!, role: pendingInvite.role },
          });
          await tx.farmInvite.update({
            where: { id: pendingInvite.id },
            data: { status: 'ACCEPTED', acceptedById: user.id, acceptedAt: new Date() },
          });
          await tx.user.update({
            where: { id: user.id! },
            data: { activeFarmId: pendingInvite.farmId },
          });
        });
        if (pendingInvite.role !== 'VIEWER') {
          void updateStripeSeats(pendingInvite.farmId, +1);
        }
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
