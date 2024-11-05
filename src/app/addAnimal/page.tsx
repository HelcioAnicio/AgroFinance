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

interface Animal {
  id: string;
  manualId: number | null;
  gender: string | null;
  birthDate: Date | null;
  weight: number | null;
  breed: string | null;
  category: string | null;
  motherId: string | null;
  fatherId: string | null;
  reproductiveStatus: string | null;
  handlingType: string | null;
  bullId: string | null;
  protocol: string | null;
  andrological: string | null;
  fetalGender: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
  ownerId: string;
}

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface AddAnimalProps {
  animals: Animal[];
  users: User[];
}

export const AddAnimal: React.FC<AddAnimalProps> = ({ animals, users }) => {
  const [tabValue, setTabValue] = useState("principais");
  const [allDataForm, setAllDataForm] = useState<Animal>({} as Animal);
  const { data: session } = useSession();
  const [owner, setOwner] = useState<User>({} as User);

  React.useEffect(() => {
    const getUser = async () => {
      const userEmail = users.find(
        (user) => user.email === session?.user?.email,
      );
      return userEmail;
    };

    getUser().then((userEmail) => {
      if (userEmail) {
        setOwner(userEmail);
        console.log("Funcionou o ownerID:", owner.id);
      } else console.log("Ocorreu um erro");
    });
  }, [session, owner.id, users]);

  const setOwnerId = React.useCallback(() => {
    setAllDataForm((prevData) => ({
      ...prevData,
      ownerId: owner.id || "",
    }));
  }, [owner.id]);

  React.useEffect(() => {
    setOwnerId();
  }, [owner.id, setOwnerId]);

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
    try {
      const response = await axios.post(
        "/api/addAnimals",
        { allDataForm },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Animal cadastrado com sucesso:", response.data);
    } catch (error) {
      console.log("Erro ao cadastrar animal:", error);
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
