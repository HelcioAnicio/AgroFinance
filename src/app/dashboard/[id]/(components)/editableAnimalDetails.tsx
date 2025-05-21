'use client';

import { Animal } from '@/types/animal';
import { Vaccine } from '@/types/vaccine';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CardInformation } from './isNotEditing/cardInformation';
import { CardReproduction } from './isNotEditing/cardReproduction';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { FormBasicInformation } from './isEditing/formBasicInformation';
import { FormMaleReproductive } from './isEditing/formMaleReproductive';
import { FormPevStatus } from './isEditing/formPevStatus';
import { FormPregnantStatus } from './isEditing/formPregnantStatus';
import { FormWaitingStatus } from './isEditing/formWaitingStatus';
import { InputForm } from '@/components/ui/inputForm';

interface EditableAnimalDetailsProps {
  animal: Animal;
  animals: Animal[];
  vaccines: Vaccine[];
  vaccine: Vaccine;
}

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  animal,
  animals,
  vaccines,
}) => {
  const [allDataForm, setAllDataForm] = useState<Animal>(animal);
  const [dataOfVaccine, setDataOfVaccine] = useState<Vaccine>({} as Vaccine);
  const [isEditing, setIsEditing] = useState(false);
  const [addVaccine, setAddVaccine] = useState(false);
  const router = useRouter();
  console.log('vaccines: ', vaccines);
  console.log('dataOfVaccine: ', dataOfVaccine);

  const breedArray = [
    'Nelore',
    'Angus',
    'Hereford',
    'Brangus',
    'Brahman',
    'Tabapuã',
    'Charolês',
    'Senepol',
    'Simental',
    'Guzerá',
    'Holandesa',
    'Jersey',
    'Girolando',
    'Gir Leiteiro',
    'Pardo-Suíço',
    'Ayrshire',
    'Guernsey',
    'Simbrasil',
    'Sindi',
    'Indubrasil',
    'Canchim',
    'Red Poll',
  ];
  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];

  const handleBack = () => {
    router.back();
  };
  const handleIsEditing = () => {
    setIsEditing(true);
  };
  const handleNotEditing = () => {
    setIsEditing(false);
  };

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const newValue =
      type === 'number' || type === 'range' ? parseInt(value) : value;

    setAllDataForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleInputValuesVaccine = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const newValue =
      type === 'number' || type === 'range'
        ? value === ''
          ? ''
          : Number(value)
        : value;

    setDataOfVaccine((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const submitForm = async (allDataForm: Animal) => {
    const dataToSubmit = {
      ...allDataForm,
      motherId:
        allDataForm.motherId === 'Comercial' ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === 'Comercial' ? null : allDataForm.fatherId,
    };

    delete dataToSubmit.bull;
    delete dataToSubmit.offspringFromBull;
    delete dataToSubmit.father;
    delete dataToSubmit.offspringFromFather;
    delete dataToSubmit.mother;
    delete dataToSubmit.offspringFromMother;
    delete dataToSubmit.owner;
    console.log('dataToSubmit: ', dataToSubmit);

    try {
      const response = await axios.put(
        `/api/updateAnimals?id=${dataToSubmit.id}`,
        dataToSubmit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Animal atualizado com sucesso:', response.data);
      setTimeout(() => {
        toast.success('Animal atualizado com sucesso!');
      }, 2000);
    } catch (error) {
      console.log('Erro ao atualizar animal', error);
      toast.error('Ocorreu um erro ao atualizar o animal.');
    }
  };

  // const submitFormVaccine = async (dataOfVaccine: Vaccine) => {
  //   try {
  //     const response = await axios.put(
  //       `/api/updateAnimals?id=${dataOfVaccine.id}`,
  //       dataOfVaccine,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log('Vacina atualizado com sucesso:', response.data);
  //     setTimeout(() => {
  //       toast.success('Vacina atualizado com sucesso!');
  //     }, 2000);
  //   } catch (error) {
  //     console.log('Erro ao atualizar vacina', error);
  //     toast.error('Ocorreu um erro ao atualizar o vacina.');
  //   }
  // };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      try {
        await axios.delete(`/api/animals/${animal.id}`);
        toast.success('Animal excluído com sucesso!');
        router.push('/animais');
      } catch {
        toast.error('Erro ao excluir o animal.');
      }
    }
  };

  return (
    <>
      <section className="sticky top-0 bg-background">
        <div className="flex items-center justify-between px-2 py-3">
          <button onClick={handleBack}>
            <ArrowLeft />
          </button>
          <h1 className="w-full max-w-32 text-center text-xl sm:max-w-none">
            Detalhes do animal{' '}
            {animal?.manualId.charAt(0).toUpperCase() +
              animal?.manualId.slice(1)}
          </h1>
          <div className="flex items-center gap-4 lg:gap-10">
            {isEditing === false ? (
              <>
                <button onClick={handleDelete}>
                  <Trash2 className="text-red-500" />
                </button>
                <Button onClick={handleIsEditing}>Editar</Button>
              </>
            ) : (
              <Button onClick={handleNotEditing}>Cancelar</Button>
            )}
          </div>
        </div>
        <Separator className="bg-foreground" />
      </section>

      {isEditing === false ? (
        <div className="m-auto flex w-full max-w-lg flex-wrap gap-10 pb-10 pt-5">
          <CardInformation animal={animal as Animal} />
          <CardReproduction animal={animal as Animal} />
          <Card className="flex w-full max-w-lg flex-col gap-3 px-2 py-5">
            <CardHeader>
              <CardTitle className="text-base">Filhos</CardTitle>
            </CardHeader>
            <CardContent className="px-1">
              <div className="flex flex-wrap items-center gap-2">
                {animal?.offspringFromMother?.map((offspring) => (
                  <Link href={`/dashboard/${offspring.id}`} key={offspring.id}>
                    <div className="w-max">
                      <span>
                        Id:{' '}
                        {offspring.manualId.charAt(0).toUpperCase() +
                          offspring.manualId.slice(1)}
                      </span>{' '}
                      {' - '}
                      <span>
                        Sexo: {offspring.gender === 'male' ? 'Macho' : 'Fêmea'}
                      </span>
                      <Separator className="bg-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <form
          action=""
          method="post"
          className="m-auto flex max-w-lg flex-col gap-5 p-3"
        >
          <FormBasicInformation
            allDataForm={allDataForm}
            handleInputValues={handleInputValues}
            animal={animal as Animal}
            breedArray={breedArray}
          />

          <Card className="h-full px-2 py-7">
            <CardHeader className="py-2">
              <CardTitle className="text-base">
                Informações reprodutivas
              </CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col p-1">
              <section className="flex w-full max-w-sm flex-col gap-4">
                {allDataForm.gender === 'male' ? (
                  <FormMaleReproductive
                    allDataForm={allDataForm}
                    handleInputValues={handleInputValues}
                    animal={animal as Animal}
                  />
                ) : (
                  <>
                    <article className="flex flex-col gap-1">
                      <label
                        className="text-secondary"
                        htmlFor="reproductiveStatus"
                      >
                        Status reprodutivo:
                      </label>
                      <select
                        name="reproductiveStatus"
                        id="reproductiveStatus"
                        className="w-32 border border-b border-b-primary bg-transparent outline-none"
                        value={allDataForm.reproductiveStatus ?? ''}
                        onChange={handleInputValues}
                      >
                        <option disabled value=""></option>
                        <option value="empty">Vazia</option>
                        <option value="pregnant">Prenha</option>
                        <option value="waiting">Em espera</option>
                        <option value="pev">PEV</option>
                      </select>
                    </article>

                    {allDataForm.reproductiveStatus === 'pregnant' && (
                      <FormPregnantStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animal={animal as Animal}
                        animals={animals}
                        scores={scores}
                      />
                    )}

                    {allDataForm.reproductiveStatus === 'waiting' && (
                      <FormWaitingStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animal={animal as Animal}
                        animals={animals}
                      />
                    )}

                    {allDataForm.reproductiveStatus === 'pev' && (
                      <FormPevStatus
                        allDataForm={allDataForm}
                        handleInputValues={handleInputValues}
                        animals={animals}
                      />
                    )}
                  </>
                )}
              </section>
            </CardContent>
          </Card>

          <Card className="flex w-full max-w-lg flex-col gap-3 px-2 py-7">
            <CardHeader className="py-2">
              <CardTitle className="text-base">Filhos</CardTitle>
            </CardHeader>
            <CardContent className="px-1 py-2">
              <div className="flex flex-col gap-2">
                {animal?.offspringFromMother?.map((offspring) => (
                  <Link href={`/${offspring.id}`} key={offspring.id}>
                    <div className="w-max">
                      <span>
                        Id:{' '}
                        {offspring.manualId.charAt(0).toUpperCase() +
                          offspring.manualId.slice(1)}
                      </span>{' '}
                      {' - '}
                      <span>
                        Sexo: {offspring.gender === 'male' ? 'Macho' : 'Fêmea'}
                      </span>
                      <Separator className="bg-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => submitForm(allDataForm)}>Salvar</Button>
        </form>
      )}
      {addVaccine ? (
        <form action="" method="post">
          <Card className="m-auto flex w-full max-w-lg flex-col gap-3 px-2 py-7">
            <CardHeader className="py-2">
              <CardTitle className="flex items-center justify-between text-base">
                Vacinas
              </CardTitle>
            </CardHeader>
            <CardContent className="px-1 py-2">
              <InputForm
                classNameDiv={'flex flex-col gap-1'}
                htmlFor={'name'}
                label={'Nome da vacina: '}
                type={'text'}
                name={'name'}
                id={'name'}
                value={dataOfVaccine.name ?? ''}
                onChange={handleInputValuesVaccine}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                className="bg-transparent text-foreground hover:bg-muted"
                onClick={() => setAddVaccine(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setAddVaccine(false)}>
                Adicionar Vacinas
              </Button>
            </CardFooter>
          </Card>{' '}
        </form>
      ) : (
        <Card className="m-auto flex w-full max-w-lg flex-col gap-3 px-2 py-7">
          <CardHeader className="py-2">
            <CardTitle className="flex justify-between text-base">
              Vacinas{' '}
              {addVaccine === false && (
                <Button onClick={() => setAddVaccine(true)}>
                  Adicionar Vacinas
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-10 px-1 py-2">
            {vaccines.map((vaccineItem, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h2 className="font-bold">Vacina: {index + 1}</h2>
                <Card className="w-full max-w-max rounded-sm px-3 py-1">
                  <strong>Name: </strong>
                  <span>{vaccineItem.name}</span>
                </Card>
                <Card className="w-full max-w-max rounded-sm px-3 py-1">
                  <strong>Descrição: </strong>
                  <span className="">{vaccineItem.description}</span>
                </Card>
                <Card className="w-full max-w-max rounded-sm px-3 py-1">
                  <strong>Data de aplicação: </strong>
                  <span>{vaccineItem.date?.toLocaleDateString()}</span>
                </Card>
                <Card className="w-full max-w-max rounded-sm px-3 py-1">
                  <strong>Data de expiração: </strong>
                  <span>{vaccineItem.expiryDate?.toLocaleDateString()}</span>
                </Card>
                <Separator className="mt-2 border border-secondary" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default EditableAnimalDetails;
