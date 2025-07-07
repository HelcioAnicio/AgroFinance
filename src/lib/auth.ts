import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/useDataBase';
import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

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
        const response = await axios.post(
          'http://localhost:3000/login',
          {
            body: JSON.stringify({
              // id: credentials?.id,
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response', response.data);

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
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
