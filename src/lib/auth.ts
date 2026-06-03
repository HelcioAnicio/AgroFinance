import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

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

        if (user && user.password === credentials.password) {
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
  },
  events: {
    async createUser({ user }: { user: User }) {
      if (!user.id || !user.email) return;

      const invite = await prisma.farmInvite.findFirst({
        where: {
          email: user.email,
          status: 'PENDING',
          expiresAt: { gt: new Date() },
        },
      });

      if (invite) {
        await prisma.$transaction([
          prisma.farmMembership.create({
            data: {
              farmId: invite.farmId,
              userId: user.id,
              role: invite.role,
            },
          }),
          prisma.farmInvite.update({
            where: { id: invite.id },
            data: {
              status: 'ACCEPTED',
              acceptedById: user.id,
              acceptedAt: new Date(),
            },
          }),
        ]);
      } else {
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 30);

        const farm = await prisma.farm.create({
          data: {
            name: user.name ? `${user.name}'s Farm` : 'Minha Fazenda',
            ownerUserId: user.id,
            trialEndsAt,
            subscriptionStatus: 'TRIAL',
          },
        });

        await prisma.farmMembership.create({
          data: {
            farmId: farm.id,
            userId: user.id,
            role: 'OWNER',
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.sub) {
        const membership = await prisma.farmMembership.findFirst({
          where: { userId: token.sub },
          include: { farm: true },
        });
        if (membership) {
          session.user.id = token.sub;
          session.farm = membership.farm;
          session.role = membership.role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
};

export default NextAuth(authOptions);
