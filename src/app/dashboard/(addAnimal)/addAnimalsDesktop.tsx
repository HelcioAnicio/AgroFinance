'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardFormMain } from './tabMain/cardFormMain';
import { CardFormReproduction } from './tabReproducttion/cardFormReproduction';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddAnimalProps {
  animals: Animal[];
  users: User[];
  onAnimalAdded: (animal: Animal) => void;
}

export const AddAnimalDesktop: React.FC<AddAnimalProps> = ({
  animals,
  users,
  onAnimalAdded,
}) => {
  const [tabValue, setTabValue] = useState('principais');
  const [allDataForm, setAllDataForm] = useState<Animal>({} as Animal);
  const { data: session } = useSession();
  const userEmail = users.find((user) => user.email === session?.user?.email);

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

  const submitForm = async (allDataForm: Animal) => {
    const dataToSubmit = {
      ...allDataForm,
      id: uuidv4(),
      ownerId: userEmail?.id || '',
      updatedAt: new Date(),
      motherId:
        allDataForm.motherId === 'Comercial' ? null : allDataForm.motherId,
      fatherId:
        allDataForm.fatherId === 'Comercial' ? null : allDataForm.fatherId,
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
      setAllDataForm({} as Animal);
      toast.success('Animal cadastrado com sucesso!');
      onAnimalAdded(dataToSubmit);
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o animal.');
    }
  };

  return (
    <DialogContent>
      <Tabs key={tabValue} value={tabValue} onValueChange={setTabValue}>
        <DialogHeader className="mt-5 border">
          <DialogTitle className="flex justify-center">
            <TabsList>
              <TabsTrigger value="principais">Principais</TabsTrigger>
              <TabsTrigger value="reproducao">Reprodução</TabsTrigger>
            </TabsList>
          </DialogTitle>
        </DialogHeader>
        <TabsContent value="principais">
          <CardFormMain
            animals={animals}
            handleInputValues={handleInputValues}
            allDataForm={allDataForm}
            setTabValue={setTabValue}
            setAllDataForm={setAllDataForm}
          />
        </TabsContent>

        <TabsContent value="reproducao">
          <CardFormReproduction
            animals={animals}
            handleInputValues={handleInputValues}
            allDataForm={allDataForm}
            submitForm={submitForm}
            setTabValue={setTabValue}
            setAllDataForm={setAllDataForm}
          />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
