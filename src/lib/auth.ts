import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { updateStripeSeats } from '@/lib/stripeSeats';
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
  events: {
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
