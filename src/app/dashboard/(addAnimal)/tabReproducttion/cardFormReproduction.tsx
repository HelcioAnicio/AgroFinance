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
import { ArrowLeft, Check, RotateCcw, Sprout } from 'lucide-react';

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
      <Card className="h-full border-none bg-transparent shadow-none">
        <CardHeader className="rounded-md border border-border/70 bg-white px-4 py-4 shadow-sm">
          <CardTitle className="flex items-center gap-3 text-base font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sprout className="h-4 w-4" />
            </span>
            Etapa 2: Informações Reprodutivas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col px-0 pt-4">
          <form action="" method="post" className="flex h-full flex-col">
            <section className="flex flex-grow flex-col gap-4">
              <div className="rounded-md border border-border/70 bg-white p-4 shadow-sm">
                {allDataForm.gender === 'male' ? (
                  <FormMaleReproductive
                    allDataForm={allDataForm}
                    handleInputValues={handleInputValues}
                  />
                ) : (
                  <>
                    <article className="grid gap-4 sm:grid-cols-2">
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
                        <p className="flex w-full items-center gap-3 rounded-md border border-primary/20 bg-primary/5 p-3 text-sm text-primary">
                          <GoAlertFill className="h-5 w-5 shrink-0" />
                          Ao confirmar o animal com o status de PEV, após 40
                          dias da data de hoje, a vaca retornará ao status de
                          Vazia automaticamente.
                        </p>
                      </article>
                    )}
                  </>
                )}
              </div>

              <article className="flex w-full justify-end border-t border-border/70 pt-5">
                <SheetFooter className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 bg-white"
                    onClick={() => setTabValue('principais')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 bg-white"
                      onClick={() => cleanAllDataForm()}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Cancelar
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      className="gap-2"
                      onClick={() => submitForm(allDataForm)}
                      disabled={validDate === false}
                    >
                      <Check className="h-4 w-4" />
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
