'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check, Building2 } from 'lucide-react';

interface FarmEntry {
  farmId: string;
  name: string;
  role: string;
  isActive: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  OWNER: 'Proprietário',
  EMPLOYEE: 'Funcionário',
  CAREGIVER_VETERINARIAN: 'Veterinário',
  FINANCIAL: 'Financeiro',
};

export function FarmSwitcher() {
  const router = useRouter();
  const [farms, setFarms] = useState<FarmEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch('/api/user/active-farm')
      .then((r) => r.json())
      .then((data) => { if (data.farms) setFarms(data.farms); })
      .catch(() => {});
  }, []);

  const activeFarm = farms.find((f) => f.isActive) ?? farms[0];

  const switchFarm = (farmId: string) => {
    setOpen(false);
    startTransition(async () => {
      await fetch('/api/user/active-farm', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmId }),
      });
      // Hard refresh so Next.js server components re-run with the new active farm
      router.refresh();
      // Update local state
      setFarms((prev) =>
        prev.map((f) => ({ ...f, isActive: f.farmId === farmId }))
      );
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        className="hidden items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-semibold transition hover:border-primary/50 disabled:opacity-60 lg:flex"
      >
        <Building2 className="size-4 text-muted-foreground" />
        <span className="max-w-[140px] truncate">{activeFarm?.name ?? 'Fazenda'}</span>
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border bg-white p-1.5 shadow-lg">
            <p className="px-2 pb-1 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Suas fazendas
            </p>
            {farms.map((farm) => (
              <button
                key={farm.farmId}
                type="button"
                onClick={() => switchFarm(farm.farmId)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted/50 ${
                  farm.isActive ? 'font-semibold text-primary' : 'text-foreground'
                }`}
              >
                <Building2 className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate">{farm.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {ROLE_LABELS[farm.role] ?? farm.role}
                  </p>
                </div>
                {farm.isActive && <Check className="size-4 shrink-0 text-primary" />}
              </button>
            ))}
            <div className="mx-2 mt-1 border-t pt-1.5 pb-0.5">
              <p className="text-[10px] text-muted-foreground">
                Recebeu um convite? Use o link enviado para entrar em outra fazenda.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
