'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { SelectForm } from '@/components/ui/selectForm';
import { FormMaleReproductive } from './components/formMaleReproductive';
import { FormPregnantStatus } from './components/formPregnantStatus';
import { FormWaitingStatus } from './components/formWaitingStatus';
import { InputForm } from '@/components/ui/inputForm';
import { SheetFooter, SheetClose } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CardFormReproductionProps {
  animals: Animal[];
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  submitForm: (allDataForm: Animal) => Promise<void>;
  setTabValue: (value: string) => void;
  setAllDataForm: React.Dispatch<React.SetStateAction<Animal>>;
}

export const CardFormReproduction: React.FC<CardFormReproductionProps> = ({
  animals,
  allDataForm,
  handleInputValues,
  submitForm,
  setTabValue,
  setAllDataForm,
}) => {
  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];

  const cleanAllDataForm = () => {
    setTabValue('principais');
    setAllDataForm({} as Animal);
  };
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    console.log('today: ', today);
    if (allDataForm.expectedDueDate) {
      const inputExpectedDueDate = new Date(allDataForm.expectedDueDate)
        .toISOString()
        .split('T')[0];
      console.log('inputExpectedDueDate: ', inputExpectedDueDate);
      if (inputExpectedDueDate <= today) {
        toast.error('Data de expectativa de parto está errada.');
        setValidDate(false);
      } else {
        toast.success('Data de expectativa está correta.');
        return setValidDate(true);
      }
    }
  }, [setValidDate, allDataForm.expectedDueDate]);

  return (
    <>
      <Card className="h-full">
        <CardHeader className="py-2">
          <CardTitle>Informações reprodutivas</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col p-1">
          <form action="" method="post" className="flex h-full flex-col">
            <section className="flex flex-grow flex-col gap-4">
              {allDataForm.gender === 'male' ? (
                <FormMaleReproductive
                  allDataForm={allDataForm}
                  handleInputValues={handleInputValues}
                />
              ) : (
                <>
                  <article className="flex flex-col gap-1">
                    <SelectForm
                      htmlFor="reproductiveStatus"
                      label="Status Reprodutivo:"
                      name="reproductiveStatus"
                      id="reproductiveStatus"
                      value={allDataForm.reproductiveStatus ?? ''}
                      defaultOption="Status do animal"
                      options={[
                        { label: 'Vazia', value: 'empty' },
                        { label: 'Prenha', value: 'pregnant' },
                        { label: 'Em espera', value: 'waiting' },
                        { label: 'PEV', value: 'pev' },
                      ]}
                      onChange={handleInputValues}
                      classNameInput={'max-w-32'}
                    />
                  </article>

                  {allDataForm.reproductiveStatus === 'pregnant' && (
                    <FormPregnantStatus
                      animals={animals}
                      scores={scores}
                      allDataForm={allDataForm}
                      handleInputValues={handleInputValues}
                    />
                  )}

                  {allDataForm.reproductiveStatus === 'waiting' && (
                    <FormWaitingStatus
                      allDataForm={allDataForm}
                      handleInputValues={handleInputValues}
                      animals={animals}
                    />
                  )}

                  {allDataForm.reproductiveStatus === 'pev' && (
                    <article className="flex flex-wrap gap-5">
                      <InputForm
                        htmlFor="expectedDueDate"
                        label="Expectativa de parto:"
                        type="date"
                        name="expectedDueDate"
                        id="expectedDueDate"
                        value={
                          allDataForm.birthDate
                            ? new Date(allDataForm.expectedDueDate || '')
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                        onChange={handleInputValues}
                        classNameDiv="flex flex-col gap-1"
                        classNameInput="max-w-40"
                      />
                    </article>
                  )}
                </>
              )}

              <article className="flex w-full justify-end">
                <SheetFooter className="flex w-full flex-row justify-end gap-5">
                  <SheetClose asChild>
                    <Button
                      className="bg-card text-card-foreground hover:bg-primary-foreground"
                      onClick={() => cleanAllDataForm()}
                    >
                      Cancelar
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      onClick={() => submitForm(allDataForm)}
                      disabled={validDate === false}
                    >
                      Adicionar Animal
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </article>
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
