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
import { FaFileArrowDown } from 'react-icons/fa6';
import { IoDownloadOutline } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import * as XLSX from 'xlsx';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Link from 'next/link';
import { toast } from 'sonner';

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

  const [cardImport, setCardImport] = useState(false);

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
          setCardImport(!cardImport);
        } else {
          setCardImport(!cardImport);
          toast.error('Erro com a importação');
        }
      } catch {
        setCardImport(!cardImport);
        toast.error('Erro com o arquivo');
        setIsLoading(false);
      } finally {
        setCardImport(!cardImport);
        setIsLoading(false);
      }
    };

    if (inputFile !== null) reader.readAsArrayBuffer(inputFile);
  }

  const handleInputFileValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setInputFile(file);
  };

  console.log('inputFile: ', inputFile);

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
      className="relative m-auto max-w-[750px] pb-5"
    >
      {cardImport && (
        <Card className="absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 sm:w-4/5">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              className="absolute right-2 top-2"
              onClick={() => setCardImport(!cardImport)}
            >
              <IoMdCloseCircleOutline size={20} />
            </Button>
            <CardTitle className="flex items-start justify-between text-lg">
              Escolha o arquivo para importar
            </CardTitle>
            <CardDescription>
              Para que a importação funcione, use o arquivo modelo no link
              abaixo. Transfira os animais para o arquivo, salve o novo arquivo
              e importe pelo botão. <br /> <br />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              download={'animal_model_template.xlsx'}
              href={'/animal_model_template.xlsx'}
              className="flex items-center gap-1 underline"
            >
              Arquivo modelo <IoDownloadOutline />
            </Link>
          </CardContent>
          <CardFooter>
            <Button className="mr-auto flex" variant="ghost">
              Cancel
            </Button>
            <div className="flex gap-2">
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
              <Button onClick={handleUpload} disabled={inputFile == null}>
                Cadastrar todos
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
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
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center rounded-md border border-foreground p-2 text-xs"
                  onClick={() => setCardImport(true)}
                >
                  Importar animais
                  <FaFileArrowDown size={16} />
                </Button>

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
