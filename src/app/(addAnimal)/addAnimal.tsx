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
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
  fetalGender: string | null;
}

interface AddAnimalProps {
  animals: Animal[];
}

export const AddAnimal: React.FC<AddAnimalProps> = ({ animals }) => {
  const [tabValue, setTabValue] = useState("principais");
  const [allDataForm, setAllDataForm] = useState<Animal>({} as Animal);

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const newValue = type === "number" ? parseInt(value) : value;

    setAllDataForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
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
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </TabsContent>
      </Tabs>
    </SheetContent>
  );
};