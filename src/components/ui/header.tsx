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
    <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center border-b bg-white">
      {/* Logo — on desktop occupies the same width as the sidebar with a right border */}
      <Link
        href="/dashboard"
        className="flex h-full shrink-0 items-center gap-2.5 px-5 transition-opacity hover:opacity-80 lg:w-56 lg:border-r"
      >
        <Image
          priority
          src="/logo.png"
          alt="AgroFinance"
          width={36}
          height={36}
          className="size-9"
        />
        <span className="text-sm font-bold text-foreground">AgroFinance</span>
      </Link>

      {/* Right-side actions — always visible, shifts right on desktop */}
      <div className="ml-auto flex items-center gap-2 px-4">
        {status === 'authenticated' && (
          <>
            <FarmSwitcher />
            <NotificationComponent notifications={notifications} />
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
