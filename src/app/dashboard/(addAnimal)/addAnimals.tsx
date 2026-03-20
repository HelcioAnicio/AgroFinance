'use client';

import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
      className="mt-5 max-h-[500px] overflow-y-auto sm:hidden"
    >
      <Tabs key={tabValue} value={tabValue} onValueChange={setTabValue}>
        <SheetHeader className="relative mt-5">
          <SheetTitle>
            <TabsList>
              <TabsTrigger value="principais">Principais</TabsTrigger>
              <TabsTrigger value="reproducao">Reprodução</TabsTrigger>
            </TabsList>
          </SheetTitle>
        </SheetHeader>
        <TabsContent value="principais">
          <CardFormMain
            animals={animals}
            handleInputValues={handleInputValues}
            allDataForm={allDataForm}
            setTabValue={setTabValue}
            breedArray={breedArray}
            setAllDataForm={setAllDataForm}
          />
        </TabsContent>

        <TabsContent value="reproducao">
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
      </Tabs>
    </SheetContent>
  );
};
