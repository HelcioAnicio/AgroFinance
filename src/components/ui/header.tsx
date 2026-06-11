'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { NotificationComponent } from './notificationComponent';
import { Notification } from '@/types/notification';
import { CgProfile } from 'react-icons/cg';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { Users } from 'lucide-react';
import { GiCow } from 'react-icons/gi';
import { FarmSwitcher } from './farmSwitcher';

interface TableProps {
  notifications: Notification[];
}

export const Header: React.FC<TableProps> = ({ notifications }) => {
  const { status, data } = useSession();

  const handleLogoutClick = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="flex w-full items-center justify-between p-2">
      <nav className="flex w-full">
        <ul className="flex w-full max-w-lg items-center justify-between gap-4">
          <li>
            <Link href={'/dashboard'}>
              <Image
                priority={true}
                src="/logo.png"
                alt="Logo - Imagem de um touro e uma ovelha"
                width={100}
                height={100}
                className="mr-auto size-16"
              />
            </Link>
          </li>
          <li>
            <Link
              href={'/dashboard/animals'}
              className="relative hidden items-center gap-1 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-secondary hover:after:w-full lg:flex"
            >
              <GiCow size={20} />
              Animais
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              href={'/dashboard/reproduction/'}
              className="relative hidden items-center gap-1 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-secondary hover:after:w-full lg:flex"
            >
              <IoMaleFemaleSharp size={20} />
              Reprodução
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              href={'/dashboard/financial'}
              className="relative hidden items-center gap-1 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-secondary hover:after:w-full lg:flex"
            >
              <FaRegMoneyBillAlt size={20} /> Financeiro
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              href={'/dashboard/profile'}
              className="relative hidden items-center gap-1 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-secondary hover:after:w-full lg:flex"
            >
              <CgProfile size={20} />
              Perfil
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              href={'/dashboard/team'}
              className="relative hidden items-center gap-1 transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-secondary hover:after:w-full lg:flex"
            >
              <Users size={20} />
              Equipe
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex w-full max-w-xs flex-1 flex-col items-end gap-10">
        {status === 'authenticated' && (
          <div className="flex items-center gap-3">
            <FarmSwitcher />
            <Link href={'/dashboard/profile'}>
              <div className="flex w-max items-center gap-1">
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
            <Button className="px-5 py-1" onClick={handleLogoutClick}>
              Sair
            </Button>
            <NotificationComponent notifications={notifications} />
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
          <div className="m-auto flex w-full max-w-screen-lg justify-end py-4">
            <Button>
              <Link href="/login">Login</Link>{' '}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
