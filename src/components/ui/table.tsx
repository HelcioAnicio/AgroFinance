'use client';

import { SquareArrowOutUpLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { CirclePlus } from 'lucide-react';
import { FaFilter } from 'react-icons/fa';
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
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState<string | null>('');

  useEffect(() => {
    const sortedAnimals = animals.sort((a, b) => {
      const aIsNumber = !isNaN(Number(a.manualId));
      const bIsNumber = !isNaN(Number(b.manualId));

      if (!aIsNumber && !bIsNumber) {
        return String(a.manualId).localeCompare(String(b.manualId));
      } else if (aIsNumber && bIsNumber) {
        return Number(a.manualId) - Number(b.manualId);
      } else {
        return aIsNumber ? 1 : -1;
      }
    });

    setOriginalAnimals(sortedAnimals);
    setListAnimals(sortedAnimals);
  }, [animals]);

  useEffect(() => {
    if (inputValue === '') {
      const listWithoutDependents = originalAnimals.filter((animal) => {
        return animal.category !== 'dependente';
      });
      setListAnimals(listWithoutDependents);
    } else {
      setListAnimals(originalAnimals);
      const filtered = originalAnimals.filter((animal) => {
        const manualId = String(animal.manualId);
        const input = String(inputValue?.toLowerCase());
        return manualId.includes(input);
      });
      setListAnimals(filtered);
    }
  }, [inputValue, originalAnimals]);

  const router = useRouter();

  const handleNavigation = (id: string | null) => {
    setIsLoading(true);
    router.push(`dashboard/${id}`);
  };

  const handleAnimalAdded = (newAnimal: Animal) => {
    setListAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort((a, b) => {
        const aIsNumber = !isNaN(Number(a.manualId));
        const bIsNumber = !isNaN(Number(b.manualId));

        if (!aIsNumber && !bIsNumber) {
          return String(a.manualId).localeCompare(String(b.manualId));
        } else if (aIsNumber && bIsNumber) {
          return Number(a.manualId) - Number(b.manualId);
        } else {
          return aIsNumber ? 1 : -1;
        }
      });
    });
    setOriginalAnimals((prev) => {
      const updatedListAnimals = [...prev, newAnimal];
      return updatedListAnimals.sort((a, b) => {
        const aIsNumber = !isNaN(Number(a.manualId));
        const bIsNumber = !isNaN(Number(b.manualId));

        if (!aIsNumber && !bIsNumber) {
          return String(a.manualId).localeCompare(String(b.manualId));
        } else if (aIsNumber && bIsNumber) {
          return Number(a.manualId) - Number(b.manualId);
        } else {
          return aIsNumber ? 1 : -1;
        }
      });
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <main
      style={{ height: 'calc(100vh - 160px)' }}
      className="m-auto max-w-[750px] pb-5"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="sticky right-0 top-0 z-50 max-h-[300px] w-full">
            <div className="flex w-full justify-between gap-10 px-1">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <FaFilter className="size-6 cursor-pointer" />
                  </SheetTrigger>
                  <Filters
                    listAnimals={listAnimals}
                    setListAnimals={setListAnimals}
                    originalAnimals={originalAnimals}
                  />
                </Sheet>
                <input
                  className="w-full max-w-40 border border-b-gray-400 bg-input p-1 shadow-sm outline-none"
                  type="search"
                  name="inputSearch"
                  id="inputSearch"
                  placeholder="Pesquisar ID"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-1">
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
                  <DialogTrigger className="hidden items-center justify-center gap-2 rounded-sm bg-primary p-1 text-background sm:flex">
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
          <div className="h-full w-full overflow-y-auto pb-10">
            <table className="m-auto max-w-[750px] border-collapse overflow-x-auto overflow-y-scroll scroll-smooth text-left xl:text-sm">
              <thead className="sticky top-0 z-50 border-collapse bg-primary text-background">
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
              <tbody className="overflow-y-auto scroll-smooth">
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
                      <td className="px-1 py-3 pr-4">
                        <span className="flex w-max items-center gap-1">
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
                        </span>
                      </td>
                      <td className="px-1 py-3">
                        {animal.manualId.charAt(0).toLocaleUpperCase() +
                          animal.manualId.slice(1)}
                      </td>
                      <td className="px-1 py-3">{animal.breed}</td>
                      <td className="px-1 py-3 pr-4">
                        {animal.gender === 'male' ? 'Macho' : 'Fêmea'}
                      </td>
                      {animal.motherId === null ? (
                        <td className="cursor-default px-1 py-3">
                          <span className="flex w-max items-center gap-1">
                            Comercial
                          </span>
                        </td>
                      ) : (
                        <td
                          className="px-1 py-3 pr-4 transition duration-300 ease-in-out hover:opacity-50"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleNavigation(animal.motherId);
                          }}
                        >
                          <span className="flex w-max items-center gap-1 border-b border-foreground">
                            {`Vaca ${mother?.manualId}`}
                            <LiaExternalLinkAltSolid className="inline-block size-4" />
                          </span>
                        </td>
                      )}
                      {animal.fatherId === null ? (
                        <td className="cursor-default px-1 py-3">
                          <span className="flex w-max items-center gap-1">
                            Comercial
                          </span>
                        </td>
                      ) : (
                        <td
                          className="px-1 py-3 pr-4 transition duration-300 ease-in-out hover:opacity-50"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleNavigation(animal.fatherId);
                          }}
                        >
                          <span className="flex w-max items-center gap-1 border-b border-foreground">
                            {`Touro ${father?.manualId}`}
                            <LiaExternalLinkAltSolid className="inline-block size-4" />
                          </span>
                        </td>
                      )}
                      <td className="px-1 py-3">
                        {animal.birthDate
                          ? new Date(animal.birthDate).toLocaleDateString()
                          : 'N/A'}
                      </td>

                      <td className="px-2 py-3">
                        <span className="flex w-max">
                          {/* {animal.category === 'calf'
                            ? 'Bezerro'
                            : animal.category === 'steer'
                              ? 'Novilho'
                              : animal.category === 'adult'
                                ? animal.gender === 'female'
                                  ? 'Vaca'
                                  : 'Boi'
                                : animal.category === 'senior'
                                  ? animal.gender === 'female'
                                    ? 'Vaca velha'
                                    : 'Boi velho'
                                  : animal.category
                                    ? `${animal.category[0].toUpperCase()}${animal.category.substring(1)}`
                                    : 'N/A'} */}
                          {animal.category[0].toLocaleUpperCase()}
                          {animal.category.substring(1)}
                        </span>
                      </td>

                      <td className="px-2 py-3">
                        <span className="flex w-max">{animal.weight} Kg</span>
                      </td>
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
          </div>
        </>
      )}
    </main>
  );
};
