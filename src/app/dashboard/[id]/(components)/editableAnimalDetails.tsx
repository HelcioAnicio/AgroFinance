"use client";

import { Animal } from "@/types/animal";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardInformation } from "./isNotEditing/cardInformation";
import { CardReproduction } from "./isNotEditing/cardReproduction";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from "sonner";
import { FormBasicInformation } from './isEditing/formBasicInformation';
import { FormMaleReproductive } from './isEditing/formMaleReproductive';
import { FormPevStatus } from './isEditing/formPevStatus';
import { FormPregnantStatus } from './isEditing/formPregnantStatus';
import { FormWaitingStatus } from './isEditing/formWaitingStatus';

interface EditableAnimalDetailsProps {
  animal: Animal;
  animals: Animal[];
}

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  animal,
  animals
}) => {
  const [allDataForm, setAllDataForm] = useState<Animal>(animal);
  console.log('allDataForm: ', allDataForm);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const breedArray = [
    "Nelore",
    "Angus",
    "Hereford",
    "Brangus",
    "Brahman",
    "Tabapuã",
    "Charolês",
    "Senepol",
    "Simental",
    "Guzerá",
    "Holandesa",
    "Jersey",
    "Girolando",
    "Gir Leiteiro",
    "Pardo-Suíço",
    "Ayrshire",
    "Guernsey",
    "Simbrasil",
    "Sindi",
    "Indubrasil",
    "Canchim",
    "Red Poll",
  ];

  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];


  const handleBack = () => {
    router.back();
  }

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleNotEditing = () => {
    setIsEditing(false);
  };

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const newValue =
      type === "number" || type === "range" ? parseInt(value) : value;

    setAllDataForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  

  const submitForm = async (allDataForm: Animal) => {
  const dataToSubmit = {
    ...allDataForm,
    motherId: allDataForm.motherId === "Comercial" ? null : allDataForm.motherId,
    fatherId: allDataForm.fatherId === "Comercial" ? null : allDataForm.fatherId,
  };

  const fieldsToRemove = [
    'bull', 'offspringFromBull', 'father', 'offspringFromFather', 
    'mother', 'offspringFromMother', 'owner', 'dewormings', 
    'diseases', 'vaccines'
  ];
  fieldsToRemove.forEach(field => delete dataToSubmit[field]);
  
  console.log('dataToSubmit: ', dataToSubmit);

  try {
    const response = await axios.put(
      `/api/updateAnimals?id=${dataToSubmit.id}`,
      dataToSubmit,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Animal atualizado com sucesso:", response.data);
    toast.success("Animal atualizado com sucesso!");

  } catch (error) {
    console.log("Erro ao atualizar animal", error);
    toast.error("Ocorreu um erro ao atualizar o animal.");
  }
};

  const handleDelete = async () => {
  if (window.confirm("Tem certeza que deseja excluir este animal?")) {
    try {
      await axios.delete(`/api/animals/${animal.id}`);
      toast.success("Animal excluído com sucesso!");
      router.push("/animais");
    } catch {
      toast.error("Erro ao excluir o animal.");
    }
  }
};



  return (
    <>
      <section className='sticky top-0 bg-background'>
        <div className="flex items-center justify-between py-3 px-2">
          <button onClick={handleBack} >
            <ArrowLeft />
          </button>
          <h1 className="flex-1 text-center text-xl">
            Detalhes do <br /> animal {animal?.manualId}
          </h1>
          <div className="flex items-center gap-4">
            {isEditing === false ? (
              <>
                <button onClick={handleDelete}>
                  <Trash2 className="text-red-500" />
                </button>
                <Button onClick={handleIsEditing}>Editar</Button>
              </>
            ) : (<Button onClick={handleNotEditing}>Cancelar</Button>)
            }
          </div>
        </div>
        <Separator className="bg-foreground" />
      </section>


      {isEditing === false ? (
        <div className='flex flex-col gap-5 p-4'>
          <CardInformation animal={animal as Animal} />
          <CardReproduction animal={animal as Animal} />
          <Card className="flex w-full max-w-lg items-center gap-3 p-2 px-5 py-2">
            <CardHeader>
              <CardTitle>
                Filhos:
              </CardTitle>
            </CardHeader> 
            <CardContent>

            <div className="flex flex-wrap items-center gap-2">
              {animal?.offspringFromMother?.map((offspring) => (
                <Link href={`/${offspring.id}`} key={offspring.id}>
                  <div className="w-max pt-3">
                    <span>Id: {offspring.manualId}</span> {" - "}
                    <span>
                      Sexo: {offspring.gender === "male" ? "Macho" : "Fêmea"}
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
      <>
        <form action="" method="post" className='flex flex-col gap-5 p-3'>
          <FormBasicInformation allDataForm={allDataForm} handleInputValues={handleInputValues} animal={animal as Animal} breedArray={breedArray}/>

          <Card className="h-full">
          <CardHeader className="py-2">
            <CardTitle className="text-base">Informações reprodutivas</CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col p-1">
              <section className="flex w-full max-w-sm flex-col gap-4 ">
                {allDataForm.gender === "male" ? (
                <FormMaleReproductive allDataForm={allDataForm} handleInputValues={handleInputValues} animal={animal as Animal} />
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
                        value={allDataForm.reproductiveStatus ?? ""}
                        onChange={handleInputValues}
                      >
                        <option disabled value=""></option>
                        <option value="empty">Vazia</option>
                        <option value="pregnant">Prenha</option>
                        <option value="waiting">Em espera</option>
                        <option value="pev">PEV</option>
                      </select>
                    </article>

                    {allDataForm.reproductiveStatus === "pregnant" && (
                      <FormPregnantStatus allDataForm={allDataForm} handleInputValues={handleInputValues} animal={animal as Animal} animals={animals} scores={scores} />
                    )}

                    {allDataForm.reproductiveStatus === "waiting" && (
                      <FormWaitingStatus allDataForm={allDataForm} handleInputValues={handleInputValues} animal={animal as Animal} animals={animals} />
                    )}

                    {allDataForm.reproductiveStatus === "pev" && (
                      <FormPevStatus allDataForm={allDataForm} handleInputValues={handleInputValues} animals={animals} />
                    )}
                  </>
                )}
              </section>
            </CardContent >
          </Card>

        <Card className="flex w-full max-w-lg items-center gap-3 p-2 px-5 py-2">
          <CardHeader>
            <CardTitle>
              Filhos:
            </CardTitle>
          </CardHeader> 
          <CardContent>

          <div className="flex flex-wrap items-center gap-2">
            {animal?.offspringFromMother?.map((offspring) => (
              <Link href={`/${offspring.id}`} key={offspring.id}>
                <div className="w-max pt-3">
                  <span>Id: {offspring.manualId}</span> {" - "}
                  <span>
                    Sexo: {offspring.gender === "male" ? "Macho" : "Fêmea"}
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
      </>)}
    </>
  );
};

export default EditableAnimalDetails;
