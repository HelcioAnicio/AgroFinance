'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronUp, SquareArrowOutUpLeft } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { FaFilter, FaCheckCircle } from 'react-icons/fa';
import { IoSkull, IoDownloadOutline } from 'react-icons/io5';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { MdHighlightOff } from 'react-icons/md';
import { FaFileArrowDown } from 'react-icons/fa6';
import {
  TbMoneybag,
  TbTrashXFilled,
  TbZoomQuestionFilled,
} from 'react-icons/tb';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';
import { AddAnimal } from '../../app/dashboard/(addAnimal)/addAnimals';
import { AddAnimalDesktop } from '@/app/dashboard/(addAnimal)/addAnimalsDesktop';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Filters } from '@/components/ui/modalFilters';
import { Loading } from '@/components/ui/loading';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppGlobal } from '@/context/appContext';

interface TableProps {
  animals: Animal[];
  users: User[];
  externalBulls: ExternalBull[];
  livestockStats?: LivestockStatsYear[];
  dataLoading?: boolean;
}

const isFemale = (gender: string) =>
  gender === 'female' || gender === 'femea' || gender === 'fêmea';

const getStatusNode = (status?: string) => {
  if (status === 'active' || status === 'ativo') {
    return (
      <>
        <FaCheckCircle className="inline-block size-3 text-green-400" /> Ativo
      </>
    );
  }
  if (status === 'inactive' || status === 'inativo') {
    return (
      <>
        <MdHighlightOff className="inline-block size-3 text-gray-500" /> Inativo
      </>
    );
  }
  if (status === 'dead' || status === 'morto') {
    return (
      <>
        <IoSkull className="inline-block size-3 text-black" /> Morto
      </>
    );
  }
  if (status === 'lost') {
    return (
      <>
        <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" /> Perdida
      </>
    );
  }
  if (status === 'trash') {
    return (
      <>
        <TbTrashXFilled className="inline-block size-3 text-red-500" /> Descarte
      </>
    );
  }
  return <><TbMoneybag className="inline-block size-3 text-yellow-600" /> Vendido</>;
};

const getCategoryLabel = (animal: Animal) => {
  if (animal.category === 'neonate') return 'Neonato';
  if (animal.category === 'calf') return 'Bezerro';
  if (animal.category === 'steer' && animal.gender === 'male') return 'Garrote';
  if (animal.category === 'steer' && animal.gender === 'female') return 'Novilha';
  if (animal.category === 'cow') return 'Vaca';
  if (animal.category === 'old cow') return 'Vaca velha';
  if (animal.category === 'ox') return 'Boi';
  if (animal.category === 'old ox') return 'Boi velho';
  if (animal.category === 'bull') return 'Touro';
  if (animal.category === 'old bull') return 'Touro velho';
  return '-';
};

export const Table: React.FC<TableProps> = ({
  users,
  externalBulls,
  livestockStats = [],
  dataLoading = false,
}) => {
  const { animals, setAnimal } = useAppGlobal();
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  // ... (rest of the state declarations)

  const router = useRouter();

  useEffect(() => {
    if (dataLoading) return;
    const sortedAnimals = [...animals].sort((a, b) => {
      const aIsNumber = !isNaN(Number(a.manualId));
      const bIsNumber = !isNaN(Number(b.manualId));
      if (!aIsNumber && !bIsNumber) return String(a.manualId).localeCompare(String(b.manualId));
      if (aIsNumber && bIsNumber) return Number(a.manualId) - Number(b.manualId);
      return aIsNumber ? 1 : -1;
    });
    setOriginalAnimals(sortedAnimals);
    setListAnimals(sortedAnimals.filter((animal) => animal.category !== 'neonate'));
  }, [animals, dataLoading]);

  const handleNavigation = (id: string | null) => {
    if (!id) return;
    const selectedAnimal = animals.find((a) => a.id === id);
    if (selectedAnimal) {
      setAnimal(selectedAnimal);
    }
    router.push(`/dashboard/${id}`);
  };

  // ... (rest of the component logic)

  return (
    <main className="... omitted for brevity ...">
      {/* ... other components ... */}
      <div className="min-h-0 w-full pb-28 md:pb-20 lg:pb-0">
        <div className="flex h-[calc(100vh-200px)] w-full overflow-hidden">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="overflow-auto scroll-smooth ...">
              <table className="relative w-full min-w-[900px] text-left">
                <thead className="...">
                  <tr>
                    {/* ... headers ... */}
                    <th className="px-4 py-3">Pai</th>
                    {/* ... headers ... */}
                  </tr>
                </thead>
                <tbody className="divide-y overflow-y-auto scroll-smooth">
                  {listAnimals.map((animal: Animal) => {
                    const mother = animals.find((a) => a.id === animal.motherId);
                    const father = animals.find((a) => a.id === animal.fatherId);
                    const externalFather = externalBulls.find((b) => b.id === animal.externalBullFatherId);

                    const fatherLabel = father?.category.includes('bull') ? 'Touro' : father?.category.includes('ox') ? 'Boi' : '';

                    return (
                      <tr key={animal.id} onClick={() => handleNavigation(animal.id)} className="...">
                        {/* ... other cells ... */}
                        
                        {animal.externalBullFatherId ? (
                          <td className="px-4 py-3 text-sm">
                            {`Ex. ${externalFather?.name || 'Desconhecido'}`}
                          </td>
                        ) : animal.fatherId === null ? (
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            Comercial
                          </td>
                        ) : (
                          <td className="px-4 py-3 text-sm transition hover:opacity-60" onClick={(e) => { e.stopPropagation(); handleNavigation(animal.fatherId); }}>
                            <span className="flex w-max items-center gap-1 border-b border-foreground/40">
                              {`${fatherLabel} ${father?.manualId}`}
                              <LiaExternalLinkAltSolid className="inline-block size-3.5" />
                            </span>
                          </td>
                        )}

                        {/* ... other cells ... */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* ... other components ... */}
    </main>
  );
};
