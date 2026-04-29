'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';
import { SelectForm } from '@/components/ui/selectForm';
import { FormMaleReproductive } from './components/formMaleReproductive';
import { FormPregnantStatus } from './components/formPregnantStatus';
import { FormWaitingStatus } from './components/formWaitingStatus';
import { SheetFooter, SheetClose } from '@/components/ui/sheet';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GoAlertFill } from 'react-icons/go';

interface CardFormReproductionProps {
  animals: Animal[];
  externalBulls: ExternalBull[];
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
  externalBulls,
  allDataForm,
  handleInputValues,
  submitForm,
  setTabValue,
  setAllDataForm,
}) => {
  const cleanAllDataForm = () => {
    setTabValue('principais');
    setAllDataForm({} as Animal);
  };
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    if (allDataForm.gender === 'female') {
      setAllDataForm((prevData) => ({
        ...prevData,
        andrological: null,
      }));

      if (allDataForm.reproductiveStatus === 'empty') {
        setAllDataForm((prevData) => ({
          ...prevData,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        }));

        return;
      } else if (allDataForm.reproductiveStatus === 'waiting') {
        setAllDataForm((prevData) => ({
          ...prevData,
          expectedDueDate: null,
          fetalGender: null,
        }));
        return;
      } else if (allDataForm.reproductiveStatus === 'pev') {
        setAllDataForm((prevData) => ({
          ...prevData,
          handlingType: null,
          bullId: null,
          externalBullId: null,
          protocol: null,
          expectedDueDate: null,
          fetalGender: null,
          bullIatfId: null,
          externalBullIatfId: null,
        }));
        return;
      }
    } else if (allDataForm.gender === 'male') {
      setAllDataForm((prevData) => ({
        ...prevData,
        reproductiveStatus: null,
        handlingType: null,
        bullId: null,
        externalBullId: null,
        protocol: null,
        expectedDueDate: null,
        fetalGender: null,
        bullIatfId: null,
        externalBullIatfId: null,
      }));
    }
  }, [allDataForm.gender, allDataForm.reproductiveStatus, setAllDataForm]);

  useEffect(() => {
    if (allDataForm.handlingType === 'naturalMating') {
      setAllDataForm((prevData) => ({
        ...prevData,
        protocol: null,
        bullIatfId: null,
        externalBullIatfId: null,
      }));
      return;
    } else if (allDataForm.handlingType === 'artificialInsemination') {
      setAllDataForm((prevData) => ({
        ...prevData,
        bullId: null,
        externalBullId: null,
      }));
      return;
    }
  }, [allDataForm.handlingType, setAllDataForm]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    if (
      allDataForm.gender === 'male' ||
      allDataForm.reproductiveStatus !== 'pregnant'
    ) {
      setValidDate(true);
      return;
    } else {
      setValidDate(false);
    }

    if (allDataForm.expectedDueDate === null) {
      toast.error('Data de expectativa de parto precisa ser preenchida.');
      setValidDate(false);
      return;
    } else if (allDataForm.expectedDueDate && allDataForm.gender === 'female') {
      const inputExpectedDueDate = new Date(allDataForm.expectedDueDate)
        .toISOString()
        .split('T')[0];

      if (new Date(inputExpectedDueDate) <= new Date(today)) {
        toast.error('Data de expectativa de parto está errada.');
        setValidDate(false);
      } else {
        toast.success('Data de expectativa está correta.');
        return setValidDate(true);
      }
    }
  }, [
    setValidDate,
    allDataForm.reproductiveStatus,
    allDataForm.expectedDueDate,
    allDataForm.gender,
  ]);

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
                        { label: 'Em espera', value: 'waiting' },
                        { label: 'Prenha', value: 'pregnant' },
                        { label: 'PEV - Parida', value: 'pev' },
                      ]}
                      onChange={handleInputValues}
                      classNameInput={'max-w-32'}
                    />
                  </article>

                  {allDataForm.reproductiveStatus === 'pregnant' && (
                    <FormPregnantStatus
                      animals={animals}
                      externalBulls={externalBulls}
                      allDataForm={allDataForm}
                      handleInputValues={handleInputValues}
                    />
                  )}

                  {allDataForm.reproductiveStatus === 'waiting' && (
                    <FormWaitingStatus
                      allDataForm={allDataForm}
                      handleInputValues={handleInputValues}
                      animals={animals}
                      externalBulls={externalBulls}
                    />
                  )}

                  {allDataForm.reproductiveStatus === 'pev' && (
                    <article className="mt-4 flex flex-wrap gap-5">
                      <p className="flex w-4/5 items-center gap-1 text-primary">
                        <GoAlertFill className="w-20" />
                        Ao confirmar o animal com o status de PEV, após 40 dias
                        da data de hoje, a vaca retornará ao status de Vazia
                        automaticamente.
                      </p>
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
