import Link from 'next/link';
import { GiCow } from 'react-icons/gi';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Users } from 'lucide-react';

export const MenuNavegation = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-[calc(4rem+env(safe-area-inset-bottom))] w-full rounded-t-3xl bg-primary pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="relative z-20 mx-auto mt-2 flex max-w-lg justify-evenly px-5 text-primary-foreground">
        <li className="relative flex size-16 flex-col items-center gap-1 rounded-full">
          <Link href="/dashboard">
            <GiCow size={35} />
            <p>Animal</p>
          </Link>
        </li>
        <li className="relative flex size-16 flex-col items-center gap-1 rounded-full">
          <Link href={'/dashboard/reproduction/'}>
            <IoMaleFemaleSharp size={35} />
            <p>Reprodução</p>
          </Link>
        </li>
        <li className="relative flex size-16 flex-col items-center gap-1 rounded-full">
          <Link href="/dashboard/financial">
            <FaRegMoneyBillAlt size={35} />
            <p>Financeiro</p>
          </Link>
        </li>
        <li className="relative flex size-16 flex-col items-center gap-1 rounded-full">
          <Link href="/dashboard/profile">
            <CgProfile size={35} />
            <p>Perfil</p>
          </Link>
        </li>
        <li className="relative flex size-16 flex-col items-center gap-1 rounded-full">
          <Link href="/dashboard/team">
            <Users size={35} />
            <p>Equipe</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
};
