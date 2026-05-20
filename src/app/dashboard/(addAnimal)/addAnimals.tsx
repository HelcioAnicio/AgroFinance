'use client';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardFormMain } from './tabMain/cardFormMain';
import { CardFormReproduction } from './tabReproducttion/cardFormReproduction';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { extractExternalBullId, isExternalBullValue } from '@/lib/externalBull';

interface AddAnimalProps {
  animals: Animal[];
  externalBulls: ExternalBull[];
  users: User[];
  onAnimalAdded: (animal: Animal) => void;
}

export const AddAnimal: React.FC<AddAnimalProps> = ({
  animals,
  externalBulls,
  users,
  onAnimalAdded,
}) => {
  const [tabValue, setTabValue] = useState('principais');
  const [allDataForm, setAllDataForm] = useState<Animal>({
    weightRecordType: 'OTHER',
    weightRecordDate: new Date().toISOString().split('T')[0],
  } as Animal);
  const { data: session } = useSession();
  const userEmail = users.find((user) => user.email === session?.user?.email);

  const breedArray = [
    'Cruzado',
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

  const handleInputValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const newValue =
      type === 'number' || type === 'range'
        ? parseInt(value)
        : name === 'bodyConditionScore'
          ? parseFloat(value)
          : value;

    setAllDataForm((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const submitForm = async (allDataForm: Animal, event?: FormDataEvent) => {
    event?.preventDefault();
    if (!allDataForm.status) {
      toast.error('Selecione o status do animal.');
      return;
    }
    if (allDataForm.status !== 'active' && !allDataForm.statusChangeDate) {
      toast.error('Informe a data da alteração de status.');
      return;
    }
    const dataToSubmit = {
      ...allDataForm,
      id: uuidv4(),
      manualId: allDataForm.manualId.toLowerCase(),
      ownerId: userEmail?.id || '',
      birthDate: new Date(allDataForm.birthDate),
      expectedDueDate:
        allDataForm.expectedDueDate == null
          ? null
          : new Date(allDataForm.expectedDueDate),
      motherId:
        allDataForm.motherId === 'comercial' ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === 'comercial' ? null : allDataForm.fatherId,
      bullId:
        allDataForm.bullId === 'comercial' ||
        isExternalBullValue(allDataForm.bullId) ||
        null ||
        undefined
          ? null
          : allDataForm.bullId,
      bullIatfId:
        allDataForm.bullIatfId === 'comercial' ||
        isExternalBullValue(allDataForm.bullIatfId) ||
        null ||
        undefined
          ? null
          : allDataForm.bullIatfId,
      externalBullId:
        allDataForm.bullId === 'comercial'
          ? null
          : extractExternalBullId(allDataForm.bullId),
      externalBullIatfId:
        allDataForm.bullIatfId === 'comercial'
          ? null
          : extractExternalBullId(allDataForm.bullIatfId),
      updatedAt: new Date(),
      statusChangeDate:
        allDataForm.status === 'active'
          ? null
          : (allDataForm.statusChangeDate ?? null),
      weightRecordType: allDataForm.weightRecordType ?? 'OTHER',
      weightRecordDate:
        allDataForm.weightRecordDate ?? new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post(
        '/api/addAnimals',
        { allDataForm: dataToSubmit },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAllDataForm({
        weightRecordType: 'OTHER',
        weightRecordDate: new Date().toISOString().split('T')[0],
      } as Animal);
      toast.success('Animal cadastrado com sucesso!');
      onAnimalAdded(dataToSubmit);
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o animal.');
    }
  };

  return (
    <SheetContent
      side="bottom"
      className="mt-5 max-h-[90vh] overflow-y-auto border-none bg-[#f8f7f4] p-0 sm:hidden"
    >
      <Tabs key={tabValue} value={tabValue} onValueChange={setTabValue}>
        <SheetHeader className="relative space-y-4 border-b border-border/70 px-5 pb-5 pt-6 text-left">
          <div className="space-y-2 pr-8">
            <SheetTitle className="text-2xl font-bold">
              Adicionar Novo Animal
            </SheetTitle>
            <SheetDescription>
              Insira os dados tecnicos para registrar o animal na propriedade.
            </SheetDescription>
          </div>
          <div>
            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0">
              <TabsTrigger
                value="principais"
                className="h-12 justify-start gap-2 rounded-md border border-transparent bg-white px-3 text-xs font-semibold text-muted-foreground shadow-sm data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[0.7rem] text-primary">
                  1
                </span>
                Principais
              </TabsTrigger>
              <TabsTrigger
                value="reproducao"
                className="h-12 justify-start gap-2 rounded-md border border-transparent bg-white px-3 text-xs font-semibold text-muted-foreground shadow-sm data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[0.7rem] text-primary">
                  2
                </span>
                Reprodução
              </TabsTrigger>
            </TabsList>
          </div>
        </SheetHeader>
        <div className="px-5 py-5">
          <TabsContent value="principais" className="mt-0">
            <CardFormMain
              animals={animals}
              handleInputValues={handleInputValues}
              allDataForm={allDataForm}
              setTabValue={setTabValue}
              breedArray={breedArray}
              setAllDataForm={setAllDataForm}
            />
          </TabsContent>

          <TabsContent value="reproducao" className="mt-0">
            <CardFormReproduction
              animals={animals}
              externalBulls={externalBulls}
              handleInputValues={handleInputValues}
              allDataForm={allDataForm}
              submitForm={submitForm}
              setTabValue={setTabValue}
              setAllDataForm={setAllDataForm}
            />
          </TabsContent>
        </div>
      </Tabs>
    </SheetContent>
  );
};
