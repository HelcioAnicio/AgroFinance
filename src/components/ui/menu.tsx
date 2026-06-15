'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  BarChart2,
  LogOut,
  Settings,
  X,
} from 'lucide-react';
import { GiCow } from 'react-icons/gi';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

type RouteItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
};

const ALL_ROUTES: RouteItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    exact: true,
  },
  {
    href: '/dashboard/animals',
    label: 'Animais',
    icon: <GiCow size={20} />,
  },
  {
    href: '/dashboard/reproduction',
    label: 'Reprodução',
    icon: <IoMaleFemaleSharp size={20} />,
  },
  {
    href: '/dashboard/financial',
    label: 'Financeiro',
    icon: <FaRegMoneyBillAlt size={20} />,
  },
  {
    href: '/dashboard/reports/birth-mortality',
    label: 'Natalidade e Mortalidade',
    icon: <BarChart2 size={20} />,
  },
  {
    href: '/dashboard/team',
    label: 'Equipe',
    icon: <Users size={20} />,
  },
  {
    href: '/dashboard/profile',
    label: 'Perfil',
    icon: <CgProfile size={20} />,
  },
];

const BOTTOM_ITEMS: RouteItem[] = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: <LayoutDashboard size={22} />,
    exact: true,
  },
  {
    href: '/dashboard/animals',
    label: 'Animais',
    icon: <GiCow size={22} />,
  },
  {
    href: '/dashboard/reproduction',
    label: 'Reprodução',
    icon: <IoMaleFemaleSharp size={22} />,
  },
];

export const MenuNavegation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  const isMoreActive =
    !BOTTOM_ITEMS.some((i) => isActive(i.href, i.exact)) || drawerOpen;

  return (
    <>
      {/* ── Bottom bar ── */}
      <footer className="fixed inset-x-0 bottom-0 z-40 h-[calc(4rem+env(safe-area-inset-bottom))] w-full border-t bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_6px_rgba(0,0,0,0.06)] lg:hidden">
        <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-evenly">
          {BOTTOM_ITEMS.map(({ href, label, icon, exact }) => {
            const active = isActive(href, exact) && !drawerOpen;
            return (
              <li key={href} className="flex flex-1">
                <Link
                  href={href}
                  className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <span className={active ? 'text-primary' : 'text-muted-foreground/70'}>
                    {icon}
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Mais button */}
          <li className="flex flex-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                isMoreActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <span className={isMoreActive ? 'text-primary' : 'text-muted-foreground/70'}>
                <Settings size={22} />
              </span>
              Mais
            </button>
          </li>
        </ul>
      </footer>

      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── Right-side drawer ── */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="AgroFinance" width={36} height={36} className="size-9" />
            <span className="text-sm font-bold">AgroFinance</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="rounded-xl p-1.5 text-muted-foreground transition hover:bg-muted/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Navegação
          </p>
          <ul className="space-y-0.5">
            {ALL_ROUTES.map(({ href, label, icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
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

        {/* Drawer footer */}
        <div className="border-t px-3 py-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </>
  );
};
