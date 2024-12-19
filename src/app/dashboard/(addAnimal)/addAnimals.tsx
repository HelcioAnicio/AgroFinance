"use client";

import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardFormMain } from "./tabMain/cardFormMain";
import { CardFormReproduction } from "./tabReproducttion/cardFormReproduction";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Animal } from "@/types/animal";
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface AddAnimalProps {
  animals: Animal[];
  users: User[];
  onAnimalAdded: (animal: Animal) => void;
}

export const AddAnimal: React.FC<AddAnimalProps> = ({
  animals,
  users,
  onAnimalAdded,
}) => {
  const [tabValue, setTabValue] = useState("principais");
  const [allDataForm, setAllDataForm] = useState<Animal>({} as Animal);
  const { data: session } = useSession();
  const userEmail = users.find((user) => user.email === session?.user?.email);

  React.useEffect(() => {
    const setOwnerId = () => {
      setAllDataForm((prevData) => ({
        ...prevData,
        ownerId: userEmail?.id || "",
      }));
    };

    if (userEmail?.id) {
      setOwnerId();
    }
  }, [userEmail]);

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
      id: uuidv4(),
      motherId:
        allDataForm.motherId === "Comercial" ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === "Comercial" ? null : allDataForm.fatherId,
    };

    console.log("Dados enviados para o Supabase:", dataToSubmit);

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
      console.log("Animal cadastrado com sucesso:", response.data.dataWithId);
      setAllDataForm({} as Animal);
      toast.success("Animal cadastrado com sucesso!");
      onAnimalAdded(dataToSubmit);
    } catch (error) {
      console.log("Erro ao cadastrar animal:", error);
      toast.error("Ocorreu um erro ao cadastrar o animal.");
    }
  };

  return (
    <SheetContent side="bottom" className="mt-5 max-h-[500px] overflow-y-auto">
      <Tabs key={tabValue} value={tabValue} onValueChange={setTabValue}>
        <SheetHeader className="relative mt-5">
          <SheetTitle>
            <TabsList>
              <TabsTrigger value="principais">Principais</TabsTrigger>
              <TabsTrigger value="reproducao">Reprodução</TabsTrigger>
              <TabsTrigger value="sanitarias">Sanitárias</TabsTrigger>
            </TabsList>
          </SheetTitle>
        </SheetHeader>
        <TabsContent value="principais">
          <CardFormMain
            animals={animals}
            users={users}
            handleInputValues={handleInputValues}
            allDataForm={allDataForm}
            setTabValue={setTabValue}
          />
        </TabsContent>

        <TabsContent value="reproducao">
          <CardFormReproduction
            animals={animals}
            handleInputValues={handleInputValues}
            allDataForm={allDataForm}
            setTabValue={setTabValue}
          />
        </TabsContent>

        <TabsContent value="sanitarias">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-right">Name</p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-right">Username</p>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => submitForm(allDataForm)}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </TabsContent>
      </Tabs>
    </SheetContent>
  );
};
