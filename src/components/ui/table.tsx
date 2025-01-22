'use client';

import { SquareArrowOutUpLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { ListFilter, CirclePlus } from 'lucide-react';
import { AddAnimal } from '../../app/dashboard/(addAnimal)/addAnimals';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { AddAnimalDesktop } from '@/app/dashboard/(addAnimal)/addAnimalsDesktop';
import { Filters } from './modalFilters';
import { Loading } from './loading';
import { FaCheckCircle } from 'react-icons/fa';
import { IoSkull } from 'react-icons/io5';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';
import { TbMoneybag } from 'react-icons/tb';
import { MdHighlightOff } from 'react-icons/md';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface TableProps {
  animals: Animal[];
  users: User[];
}

export const Table: React.FC<TableProps> = ({ animals, users }) => {
  const { data: session } = useSession();
  const userEmail = users.find((user) => user.email === session?.user?.email);
  const userId = userEmail?.id;
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    const sorted = animals
      .filter((animal) => animal.ownerId === userId)
      .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0));
    setOriginalAnimals(sorted);
    setListAnimals(sorted);
  }, [animals, userId]);

  useEffect(() => {
    if (inputValue === undefined) {
      setListAnimals(originalAnimals);
    } else {
      const filtered = originalAnimals
        .filter((animal) => animal.manualId == inputValue)
        .sort((a, b) => (a.manualId ?? 0) - (b.manualId ?? 0));
      setListAnimals(filtered);
    }
  }, [inputValue, originalAnimals]);

  const router = useRouter();

  const handleNavigation = (id: string | null) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);

    router.push(`dashboard/${id}`);
  };

  const handleAnimalAdded = (newAnimal: Animal) => {
    setListAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort(
        (a, b) => (a.manualId ?? 0) - (b.manualId ?? 0)
      );
    });
    setOriginalAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort(
        (a, b) => (a.manualId ?? 0) - (b.manualId ?? 0)
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(
      event.target.value ? parseFloat(event.target.value) : undefined
    );
  };

  return (
    <main className="m-auto max-w-[750px] overflow-x-auto scroll-smooth pb-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="sticky right-0 top-0 z-50 w-full">
            <div className="flex w-full justify-between gap-10 px-1 sm:justify-end">
              <input
                className="w-full max-w-40 border border-b-gray-400 bg-input p-1 shadow-sm outline-none"
                type="search"
                name="inputSearch"
                id="inputSearch"
                placeholder="Pesquisar ID"
                onChange={handleInputChange}
              />

              <div className="flex gap-1">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="flex gap-1 p-1">
                      Filtros <ListFilter className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <Filters
                    listAnimals={listAnimals}
                    setListAnimals={setListAnimals}
                    originalAnimals={originalAnimals}
                  />
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild className="sm:hidden">
                    <Button className="flex gap-2 p-1 sm:hidden">
                      Adicionar <CirclePlus className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <AddAnimal
                    animals={animals}
                    users={users}
                    onAnimalAdded={handleAnimalAdded}
                  />
                </Sheet>
                <Dialog>
                  <DialogTrigger className="hidden items-center justify-center gap-2 rounded-md bg-primary p-1 text-background sm:flex">
                    Adicionar <CirclePlus className="size-4" />
                  </DialogTrigger>
                  <AddAnimalDesktop
                    animals={animals}
                    users={users}
                    onAnimalAdded={handleAnimalAdded}
                  />
                </Dialog>
              </div>
            </div>
          </div>
          <br />
          <table className="m-auto min-w-[750px] border-collapse text-left xl:text-sm">
            <thead className="border-collapse bg-primary text-background">
              <tr>
                <th className="w-20 px-1 py-2">Status</th>
                <th className="px-1 py-2">ID</th>
                <th className="px-1 py-2">Raça</th>
                <th className="px-1 py-2">Sexo</th>
                <th className="px-1 py-2">Mãe</th>
                <th className="px-1 py-2">Pai</th>
                <th className="px-1 py-2">Nascimento</th>
                <th className="px-1 py-2">Categoria</th>
                <th className="px-1 py-2">Peso</th>
                <th className="sticky right-0 bg-primary px-1 py-2 text-background"></th>
              </tr>
            </thead>
            <tbody className="h-[calc(100%-200px)] overflow-y-auto scroll-smooth">
              {listAnimals.map((animal: Animal, index: number) => {
                const mother: Animal | undefined = animals.find(
                  (a) => a.id === animal.motherId
                );
                const father: Animal | undefined = animals.find(
                  (a) => a.id === animal.fatherId
                );

                return (
                  <tr
                    key={animal.id}
                    className={`${index % 2 === 0 ? 'bg-muted' : ''} cursor-pointer`}
                    onClick={() => handleNavigation(animal.id)}
                  >
                    <td className="max-w-max px-1 py-3">
                      {animal?.status === 'active' ? (
                        <>
                          <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                          Ativo
                        </>
                      ) : animal?.status === 'inactive' ? (
                        <>
                          <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                          Inativo
                        </>
                      ) : animal?.status === 'dead' ? (
                        <>
                          <IoSkull className="inline-block size-3 text-black" />{' '}
                          Morto
                        </>
                      ) : (
                        <>
                          <TbMoneybag className="inline-block size-3 text-yellow-600" />{' '}
                          Vendido
                        </>
                      )}
                    </td>
                    <td className="px-1 py-3">{animal.manualId}</td>
                    <td className="px-1 py-3">{animal.breed}</td>
                    <td className="px-1 py-3">
                      {animal.gender === 'male' ? 'Macho' : 'Fêmea'}
                    </td>
                    <td
                      className="px-1 py-3 transition duration-300 ease-in-out hover:opacity-50"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleNavigation(animal.motherId);
                      }}
                    >
                      {mother ? (
                        <span className="flex w-max items-center gap-1 border-b border-foreground">
                          {`Vaca ${mother.manualId}`}
                          <LiaExternalLinkAltSolid className="inline-block size-4" />
                        </span>
                      ) : (
                        'Comercial'
                      )}
                    </td>
                    <td
                      className="px-1 py-3 transition duration-300 ease-in-out hover:opacity-50"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleNavigation(animal.fatherId);
                      }}
                    >
                      {father ? (
                        <span className="flex w-max items-center gap-1 border-b border-foreground">
                          {`Touro ${father.manualId}`}
                          <LiaExternalLinkAltSolid className="inline-block size-4" />
                        </span>
                      ) : (
                        'Comercial'
                      )}
                    </td>
                    <td className="px-1 py-3">
                      {animal.birthDate
                        ? new Date(animal.birthDate).toLocaleDateString()
                        : 'N/A'}
                    </td>

                    <td className="px-1 py-3">
                      {animal.category === 'calf'
                        ? 'Bezerro'
                        : animal.category === 'steer'
                          ? 'Novilho'
                          : animal.category === 'adult'
                            ? 'Adulto'
                            : animal.category === 'senior'
                              ? 'Idoso'
                              : animal.category
                                ? `${animal.category[0].toUpperCase()}${animal.category.substring(1)}`
                                : 'N/A'}
                    </td>

                    <td className="px-1 py-3">{animal.weight} Kg</td>
                    <td
                      className={`sticky right-0 px-1 py-3 ${
                        index % 2 === 0 ? 'bg-muted' : 'bg-background'
                      }`}
                    >
                      <SquareArrowOutUpLeft size={20} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};
