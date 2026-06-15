'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { NotificationComponent } from './notificationComponent';
import { Notification } from '@/types/notification';
import { FarmSwitcher } from './farmSwitcher';

interface HeaderProps {
  notifications: Notification[];
}

export const Header: React.FC<HeaderProps> = ({ notifications }) => {
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b bg-white/90 px-4 py-2 backdrop-blur-sm">
      {/* Logo — only visible on mobile (desktop sidebar has its own) */}
      <Link href="/dashboard" className="lg:hidden">
        <Image
          priority
          src="/logo.png"
          alt="AgroFinance"
          width={48}
          height={48}
          className="size-12"
        />
      </Link>

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-2">
        {status === 'authenticated' && (
          <>
            <FarmSwitcher />
            <NotificationComponent notifications={notifications} />
            {/* Logout only in header on desktop; on mobile it's in the nav drawer */}
            <Button
              className="hidden px-4 py-1 lg:flex"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sair
            </Button>
          </>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="hidden h-8 w-14 rounded-md lg:block" />
          </div>
        )}
      </div>
    </header>
  );
};
