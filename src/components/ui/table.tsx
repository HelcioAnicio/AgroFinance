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
import { FaFileArrowDown } from 'react-icons/fa6';
import { IoDownloadOutline } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import Link from 'next/link';
import { toast } from 'sonner';
import { Card, CardContent } from './card';

interface TableProps {
  animals: Animal[];
  users: User[];
}

export const Table: React.FC<TableProps> = ({ animals, users }) => {
  const [listAnimals, setListAnimals] = useState<Animal[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState<string | null>('');
  const [inputFile, setInputFile] = useState<File | null>(null);

  async function handleUpload() {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setIsLoading(!isLoading);

      try {
        const res = await fetch('/api/importAnimals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(json),
        });

        const result = await res.json();
        if (result.success) {
          toast.success('Lista cadastrada com sucesso!');
        } else {
          toast.error('Erro com a importação');
        }
      } catch {
        toast.error('Erro com o arquivo');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (inputFile !== null) reader.readAsArrayBuffer(inputFile);
  }

  const handleInputFileValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setInputFile(file);
  };

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
        return animal.category !== 'neonate';
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
      style={{ height: 'calc(100vh - 170px)' }}
      className="relative m-auto max-w-max pb-5"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="sticky right-0 top-0 z-50 max-h-[300px] w-full">
            <div className="relative flex w-full justify-between gap-10 px-1">
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
              <div className="flex flex-col gap-3 md:flex-row">
                <Dialog>
                  <DialogTrigger className="flex items-center rounded-md border border-foreground p-2 text-xs">
                    Importar animais
                    <FaFileArrowDown size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Escolha o arquivo para importar</DialogTitle>
                      <DialogDescription>
                        Para que a importação funcione, use o arquivo modelo no
                        link abaixo. Transfira os animais para o arquivo, salve
                        o novo arquivo e importe pelo botão. <br /> <br />
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Link
                        download={'animal_model_template.xlsx'}
                        href={'/animal_model_template.xlsx'}
                        className="flex w-max items-center gap-1 underline"
                      >
                        Arquivo modelo <IoDownloadOutline />
                      </Link>
                      <label
                        htmlFor="document"
                        className="flex items-center rounded-md border border-foreground p-2"
                      >
                        Escolher arquivo
                        <FaFileArrowDown size={16} />
                      </label>
                      <input
                        type="file"
                        name="document"
                        id="document"
                        className="hidden"
                        onChange={handleInputFileValue}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose className="mr-auto" asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <DialogClose>
                        {inputFile && (
                          <Button onClick={handleUpload}>
                            Cadastrar animais
                          </Button>
                        )}
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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
          <br className="md:hidden" />
          <div className="my-5 hidden gap-3 md:flex">
            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Total de Animais: {animals.length}
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total de animais contabilizando todos os cadastrados,
                  incluindo neonate.
                </HoverCardContent>
              </HoverCard>
            </Card>

            <Card className="rounded-sm p-2">
              <HoverCard>
                <HoverCardTrigger className="cursor-default">
                  Animais ativos:{' '}
                  {
                    animals.filter(
                      (a) => a.status === 'active' && a.category !== 'neonate'
                    ).length
                  }
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary text-background">
                  Total de animais ativos na fazenda.
                </HoverCardContent>
              </HoverCard>
            </Card>
          </div>
          <div className="h-full w-full overflow-y-auto pb-28 md:pb-10">
            <table className="m-auto max-w-max overflow-x-auto overflow-y-scroll scroll-smooth text-left xl:text-sm">
              <thead className="sticky top-0 z-20 border-collapse bg-primary text-background">
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

                  const checkFatherCategory = (): string => {
                    const category = father?.category;
                    if (category === 'bull' || category === 'old bull') {
                      return 'Touro';
                    } else if (category === 'ox' || category === 'old ox') {
                      return 'Boi';
                    } else {
                      return '';
                    }
                  };
                  return (
                    <tr
                      key={animal.id}
                      className={`${index % 2 === 0 ? 'bg-muted' : ''} cursor-pointer`}
                      onClick={() => handleNavigation(animal.id)}
                    >
                      <td className="px-1 py-3 pr-4">
                        <span className="flex w-max items-center gap-1">
                          {animal?.status === 'active' ||
                          animal?.status === 'ativo' ? (
                            <>
                              <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                              Ativo
                            </>
                          ) : animal?.status === 'inactive' ||
                            animal?.status === 'inativo' ? (
                            <>
                              <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                              Inativo
                            </>
                          ) : animal?.status === 'dead' ||
                            animal?.status === 'morto' ? (
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
                      <td className="px-1 py-3">
                        {animal.breed.charAt(0).toUpperCase() +
                          animal.breed.slice(1)}
                      </td>
                      <td className="px-1 py-3 pr-4">
                        {animal.gender === 'male' || animal.gender === 'macho'
                          ? 'Macho'
                          : 'Fêmea'}
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
                            {`${checkFatherCategory()} ${father?.manualId}`}
                            <LiaExternalLinkAltSolid className="inline-block size-4" />
                          </span>
                        </td>
                      )}
                      <td className="px-1 py-3">
                        {animal.birthDate
                          ? new Date(animal.birthDate).toLocaleDateString()
                          : 'N/A'}
                      </td>

                      <td className="px-1 py-3 pr-4">
                        <span className="flex w-max">
                          {animal.category == 'neonate'
                            ? 'Neonato'
                            : animal.category == 'calf'
                              ? 'Bezerro'
                              : animal.category == 'steer' &&
                                  animal.gender == 'male'
                                ? 'Garrote'
                                : animal.category == 'steer' &&
                                    animal.gender == 'female'
                                  ? 'Novilho'
                                  : animal.category == 'cow'
                                    ? 'Vaca'
                                    : animal.category == 'old cow'
                                      ? 'Vaca velha'
                                      : animal.category == 'ox'
                                        ? 'Boi'
                                        : animal.category == 'old ox'
                                          ? 'Boi Velho'
                                          : animal.category == 'bull'
                                            ? 'Touro'
                                            : animal.category == 'old bull' &&
                                              'Touro velho'}
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
