"use client";

import { Animal } from "@/types/animal";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardInformation } from "./cardInformation";
import { CardReproduction } from "./cardReproduction";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from "sonner";

interface EditableAnimalDetailsProps {
  animal: Animal;
}

const EditableAnimalDetails: React.FC<EditableAnimalDetailsProps> = ({
  animal,
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

  const editDataOfAnimal = () => {
    setIsEditing(true);
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
      motherId:
        allDataForm.motherId === "Comercial" ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === "Comercial" ? null : allDataForm.fatherId,
    };

    try {
      const response = await axios.post(
        "/api/addAnimals",
        { allDataForm: dataToSubmit },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Animal cadastrado com sucesso:", response.data.dataToSubmit);
      setAllDataForm({} as Animal);
      toast.success("Animal cadastrado com sucesso!");
      setIsEditing(false);

    } catch (error) {
      console.log("Erro ao cadastrar animal:", error);
      toast.error("Ocorreu um erro ao cadastrar o animal.");
    }
  };


  return (
    <>
    <section className='sticky top-0 bg-background'>
      <div className="flex items-center justify-between py-3">
        <button onClick={handleBack} className='p-2'>
          <ArrowLeft />
        </button>
        <h1 className="flex-1 text-center text-xl">
          Detalhes do animal {animal?.manualId}
        </h1>
        <div className="flex items-center gap-4">
          {isEditing === false && (
            <>
              <button>
                <Trash2 className="text-red-500" />
              </button>
              <Button onClick={editDataOfAnimal}>Editar</Button>
            </>
          )}
        </div>
      </div>
      <Separator className="bg-foreground" />
      </section>


      <section className="flex flex-col gap-3 p-3">
        {isEditing === false ? (
          <>
          <CardInformation animal={animal as Animal} />
          <CardReproduction animal={animal as Animal} />
          </>
        ) : (
        <>
          <form action="" method="post">
        <Card className="p-1">
            <section className="flex flex-col gap-4">
              <div className="flex items-end gap-1">
                <label className="text-secondary" htmlFor="manualId">
                  Id do animal:
                </label>
                <input
                  type="number"
                  name="manualId"
                  id="manualId"
                  value={allDataForm.manualId ?? ""}
                  onChange={handleInputValues}
                  className="w-20 border border-b border-b-primary bg-transparent outline-none"
                />
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-secondary" htmlFor="birthDate">
                    Nascimento:
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={
                      allDataForm.birthDate
                        ? new Date(allDataForm.birthDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleInputValues}
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                  />
                </div>
  
                <div>
                  <label className="text-secondary" htmlFor="weight">
                    Peso:
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={allDataForm.weight ?? ""}
                    onChange={handleInputValues}
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                  />
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="breed">
                    Raça:
                  </label>
                  <select
                    name="breed"
                    id="breed"
                    value={allDataForm.breed ?? ""}
                    onChange={handleInputValues}
                    className="min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
                  >
                    <option value="" disabled></option>
                    {breedArray.map((breed, id) => (
                      <option value={breed} key={id}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="category">
                    Categoria:
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    value={allDataForm.category ?? ""}
                    onChange={handleInputValues}
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                  />
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="motherId">
                    Mãe:
                  </label>
                  <select
                    name="motherId"
                    id="motherId"
                    value={allDataForm.motherId ?? ""}
                    onChange={handleInputValues}
                    className="h-20 min-w-24 flex-1 overflow-y-auto scroll-smooth border border-b border-b-primary bg-transparent outline-none"
                  >
                    <option disabled value=""></option>
                    <option value="Comercial">Comercial</option>
                      {allDataForm.motherId && (
                        <option key={animal.id} value={animal.id ?? ""}>
                          Vaca {animal.mother?.manualId}
                        </option>
                      ) }
                  </select>
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="fatherId">
                    Pai:
                  </label>
                  <select
                    name="fatherId"
                    id="fatherId"
                    value={allDataForm.fatherId ?? ""}
                    onChange={handleInputValues}
                    className="min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none"
                  >
                    <option value="" disabled></option>
                    <option value="Comercial">Comercial</option>
                      {allDataForm.fatherId && (
                        <option key={animal.id} value={animal.id ?? ""}>
                          Touro {animal.father?.manualId}
                        </option>
                      )}
                  </select>
                </div>
              </div>
              <Button onClick={() => submitForm(allDataForm)}>Salvar</Button>
            </section>
        </Card>

        <Card className="h-full">
        <CardHeader className="py-2">
          <CardTitle>Informações reprodutivas</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col p-1">
            <section className="flex flex-grow flex-col gap-4">
              {allDataForm.gender === "male" ? (
                <article className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <p className="text-secondary">Andrológico:</p>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="andrological"
                        id="positive"
                        className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        value="positive"
                        checked={allDataForm.andrological === "positive"}
                        onChange={handleInputValues}
                      />
                      <label htmlFor="positive">Positivo</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="andrological"
                        id="negative"
                        value="negative"
                        checked={allDataForm.andrological === "negative"}
                        onChange={handleInputValues}
                        className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                      />
                      <label htmlFor="negative">Negativo</label>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="andrological"
                        id="notDone"
                        value="notDone"
                        checked={allDataForm.andrological === "notDone"}
                        onChange={handleInputValues}
                        className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                      />
                      <label htmlFor="notDone">Não realizado</label>
                    </div>
                  </div>
                </article>
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
                    <>
                      <article className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-1">
                          <label
                            className="text-secondary"
                            htmlFor="handlingType"
                          >
                            Manejo utilizado:
                          </label>
                          <select
                            name="handlingType"
                            id="handlingType"
                            className="w-44 border border-b border-b-primary bg-transparent outline-none"
                            value={allDataForm.handlingType ?? ""}
                            onChange={handleInputValues}
                          >
                            <option value=""></option>
                            <option value="bullMating">Touro</option>
                            <option value="artificialInsemination">
                              Inseminação Artifical
                            </option>
                            <option value="allMethods">Todos os metodos</option>
                          </select>
                        </div>
                      </article>

                      <article className="flex w-full justify-between gap-2">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-secondary" htmlFor="bullId">
                            Touro utilizado:
                          </label>
                          <select
                            name="bullId"
                            id="bullId"
                            className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${allDataForm.handlingType == "bullMating" && "bg-gray-300"}`}
                            disabled={
                              allDataForm.handlingType ===
                              "artificialInsemination"
                            }
                            value={allDataForm.bullId ?? ""}
                            onChange={handleInputValues}
                          >
                            <option disabled value=""></option>
                            <option value="comercial">Comercial</option>

                            {animals
                              .filter((animal) => animal.gender === "male")
                              .map((animal) => (
                                <option key={animal.id} value={animal.id ?? ""}>
                                  Touro {animal.manualId}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <label htmlFor="protocol" className="text-secondary">
                            Protocolo usado:
                          </label>
                          <select
                            name="protocol"
                            id="protocol"
                            className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary outline-none ${allDataForm.handlingType == "bullMating" ? "rounded-t-md bg-gray-300" : "bg-transparent"}`}
                            value={allDataForm.protocol ?? ""}
                            onChange={handleInputValues}
                            disabled={allDataForm.handlingType === "bullMating"}
                          >
                            <option disabled value=""></option>
                            <option value="protocol1">
                              Inseminação artificial
                            </option>
                            <option value="protocol2">Inseminação </option>
                          </select>
                        </div>
                      </article>

                      <article className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-secondary">Sexo Fetal:</p>
                          <div className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="fetalGender"
                              id="female"
                              value="female"
                              checked={allDataForm.fetalGender === "female"}
                              onChange={handleInputValues}
                              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                            />
                            <label htmlFor="female">Fêmea</label>
                          </div>

                          <div className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="fetalGender"
                              id="male"
                              value="male"
                              checked={allDataForm.fetalGender === "male"}
                              onChange={handleInputValues}
                              className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                            />
                            <label htmlFor="male">Macho</label>
                          </div>
                        </div>
                      </article>

                      <article className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-1">
                          <label
                            className="text-secondary"
                            htmlFor="expectedDueDate"
                          >
                            Data prevista para o parto:
                          </label>
                          <input
                            type="date"
                            name="expectedDueDate"
                            id="expectedDueDate"
                            value={
                              allDataForm.expectedDueDate
                                ? new Date(allDataForm.expectedDueDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={handleInputValues}
                            className="w-full max-w-40 border border-b border-b-primary bg-transparent outline-none"
                          />
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <label
                            className="text-secondary"
                            htmlFor="bullIbodyConditionScoreatf"
                          >
                            ECC (Escore de Condição Corporal):
                          </label>

                          <select
                            name="bodyConditionScore"
                            id="bullbodyConditionScoreIatf"
                            className={`min-w-24 max-w-40 flex-1 overflow-y-scroll scroll-smooth border border-b-primary outline-none`}
                            value={allDataForm.bodyConditionScore ?? ""}
                            onChange={handleInputValues}
                            style={{
                              overflowY: "scroll",
                              maxHeight: "100px",
                            }}
                          >
                            <option disabled value=""></option>
                            {scores.map((score, index) => (
                              <option key={index} value={score}>
                                ECC - {score}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <label className="text-secondary" htmlFor="bullIatf">
                            Touro utilizado na IATF:
                          </label>
                          <select
                            name="bullIatf"
                            id="bullIatf"
                            className={`min-w-24 max-w-40 flex-1 border border-b border-b-primary outline-none ${allDataForm.handlingType == "bullMating" ? "rounded-t-md bg-gray-400" : "bg-transparent"}`}
                            disabled={allDataForm.handlingType === "bullMating"}
                            value={allDataForm.bullIatf ?? ""}
                            onChange={handleInputValues}
                          >
                            <option disabled value=""></option>
                            <option value="comercial">Comercial</option>
                            {animals
                              .filter((animal) => animal.gender === "male")
                              .map((animal) => (
                                <option key={animal.id} value={animal.id ?? ""}>
                                  Touro {animal.manualId}
                                </option>
                              ))}{" "}
                          </select>
                        </div>
                      </article>
                    </>
                  )}

                  {allDataForm.reproductiveStatus === "waiting" && (
                    <>
                      <article className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-1">
                          <label
                            className="text-secondary"
                            htmlFor="handlingType"
                          >
                            Manejo utilizado:
                          </label>
                          <select
                            name="handlingType"
                            id="handlingType"
                            className="w-44 border border-b border-b-primary bg-transparent outline-none"
                            value={allDataForm.handlingType ?? ""}
                            onChange={handleInputValues}
                          >
                            <option disabled value=""></option>
                            <option value="bullMating">Touro</option>
                            <option value="artificialInsemination">
                              Inseminação Artifical
                            </option>
                            <option value="allMethods">Todos os metodos</option>
                          </select>
                        </div>
                      </article>

                      <article className="flex w-full justify-between gap-2">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-secondary" htmlFor="bullId">
                            Touro utilizado:
                          </label>
                          <select
                            name="bullId"
                            id="bullId"
                            className={`min-w-24 flex-1 border border-b border-b-primary bg-transparent outline-none ${allDataForm.handlingType == "bullMating" && "bg-gray-300"}`}
                            disabled={
                              allDataForm.handlingType ===
                              "artificialInsemination"
                            }
                            value={allDataForm.bullId ?? ""}
                            onChange={handleInputValues}
                          >
                            <option disabled value=""></option>
                            <option value="comercial">Comercial</option>

                            {animals.map((animal) => (
                              <option
                                key={animal.id}
                                value={animal.manualId ?? ""}
                              >
                                Touro {animal.manualId}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <label htmlFor="protocol" className="text-secondary">
                            Protocolo usado:
                          </label>
                          <select
                            name="protocol"
                            id="protocol"
                            className={`flex[1_1_100px] w-full min-w-20 rounded-t-md border border-b border-b-primary bg-transparent outline-none ${allDataForm.handlingType === "bullMating" && "bg-gray-300"}`}
                            value={allDataForm.protocol ?? ""}
                            onChange={handleInputValues}
                            disabled={allDataForm.handlingType === "bullMating"}
                          >
                            <option disabled value=""></option>
                            <option value="protocol1">
                              Inseminação artificial
                            </option>
                            <option value="protocol2">Inseminação </option>
                          </select>
                        </div>
                      </article>
                    </>
                  )}

                  {allDataForm.reproductiveStatus === "pev" && (
                    <>
                      <article className="flex flex-wrap gap-5">
                        <div className="flex flex-col gap-1">
                          <label
                            className="text-secondary"
                            htmlFor="expectedDueDate"
                          >
                            Manejo utilizado:
                          </label>
                          <input
                            type="date"
                            name="expectedDueDate"
                            id="expectedDueDate"
                            value={
                              allDataForm.expectedDueDate
                                ? new Date(allDataForm.expectedDueDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={handleInputValues}
                            className="w-full max-w-40 border border-b border-b-primary bg-transparent outline-none"
                          />
                        </div>
                      </article>
                    </>
                  )}
                </>
              )}
            </section>
        </CardContent>
      </Card>
          </form>
        </>)}



        <Card className="flex w-full max-w-lg items-center gap-3 p-2 px-5 py-2">
          <strong className="">Filhos: </strong>
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
        </Card>
      </section>
    </>
  );
};

export default EditableAnimalDetails;
