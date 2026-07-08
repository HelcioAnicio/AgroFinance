import NextAuth, { NextAuthOptions } from 'next-auth';
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
    async createUser({ user }) {
      if (!user.id || !user.email) return;

      const existingMembership = await prisma.farmMembership.findFirst({
        where: { userId: user.id },
        select: { id: true },
      });

      if (existingMembership) return;

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
