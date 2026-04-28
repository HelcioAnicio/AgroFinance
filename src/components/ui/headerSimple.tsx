'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export const HeaderSimple = () => {
  const { status, data } = useSession();

  const handleLogoutClick = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="m-auto flex w-dvw max-w-5xl items-center justify-between p-2">
      <nav className="flex w-full justify-between gap-4">
        <div className="w-1/3">
          <Link href={'/dashboard'}>
            <Image
              priority={true}
              src="/logo.png"
              alt="Logo - Imagem de um touro e uma ovelha"
              width={100}
              height={100}
              className="size-16"
            />
          </Link>
        </div>

        {status === 'authenticated' && (
          <div className="flex items-center gap-3">
            <Link href={'/dashboard/profile'}>
              <div className="flex items-center gap-1">
                {data?.user?.name}
                <Avatar className="size-8">
                  <AvatarImage
                    src={data?.user?.image ?? undefined}
                    alt="Image from google profile"
                  />
                  <AvatarFallback className="text-foreground">
                    {data?.user?.name?.charAt(0)}{' '}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
            <Button className="p-1" onClick={handleLogoutClick}>
              Sair
            </Button>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-7 w-10" />
          </div>
        )}

        {status === 'unauthenticated' && (
          // <nav
          //   aria-label="Navegacao principal"
          //   className="hidden items-center gap-6 px-2 text-sm font-medium text-slate-600 md:flex"
          // >
          <div className="flex items-center gap-6 px-2 text-sm font-medium lg:gap-10">
            <a
              href="#funcionalidades"
              className="hidden transition hover:text-[#2f5b25] md:flex"
            >
              Funcionalidades
            </a>
            <a
              href="#inteligencia"
              className="hidden transition hover:text-[#2f5b25] md:flex"
            >
              Inteligencia
            </a>
            <a
              href="#rentabilidade"
              className="hidden transition hover:text-[#2f5b25] md:flex"
            >
              O Futuro
            </a>
            <Link
              href="/login"
              className="hidden transition hover:text-[#2f5b25] md:flex"
            >
              Blog
            </Link>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          // </nav>
        )}
      </nav>
    </header>
  );
};
