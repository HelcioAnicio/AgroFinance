'use client';

import { SessionProvider, GetSessionParams } from 'next-auth/react';

export const AuthProvider = ({ children }: GetSessionParams) => {
  return <SessionProvider>{children}</SessionProvider>;
};
