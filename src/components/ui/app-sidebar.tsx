'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, BarChart2, LogOut, Bell, TrendingUp, Package } from 'lucide-react';
import { GiCow } from 'react-icons/gi';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { signOut } from 'next-auth/react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={17} />,
    exact: true,
  },
  {
    href: '/dashboard/animals',
    label: 'Animais',
    icon: <GiCow size={17} />,
  },
  {
    href: '/dashboard/reproduction',
    label: 'Reprodução',
    icon: <IoMaleFemaleSharp size={17} />,
  },
  {
    href: '/dashboard/financial',
    label: 'Financeiro',
    icon: <FaRegMoneyBillAlt size={17} />,
  },
  {
    href: '/dashboard/insumos',
    label: 'Insumos',
    icon: <Package size={17} />,
  },
  {
    href: '/dashboard/reports/birth-mortality',
    label: 'Natalidade',
    icon: <BarChart2 size={17} />,
  },
  {
    href: '/dashboard/reports/lucro-prejuizo',
    label: 'Relatório L/P',
    icon: <TrendingUp size={17} />,
  },
  {
    href: '/dashboard/team',
    label: 'Equipe',
    icon: <Users size={17} />,
  },
  {
    href: '/dashboard/notifications',
    label: 'Notificações',
    icon: <Bell size={17} />,
  },
  {
    href: '/dashboard/profile',
    label: 'Perfil',
    icon: <CgProfile size={17} />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    /* Starts at top-14 (below the fixed header) */
    <aside className="sticky top-14 hidden h-[calc(100vh-56px)] w-56 shrink-0 flex-col border-r bg-white lg:flex">
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Gerenciamento
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <span className={active ? 'text-primary' : 'text-muted-foreground'}>
                    {icon}
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t px-3 py-4">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />
          Sair
        </button>
      </div>
    </aside>
  );
}
