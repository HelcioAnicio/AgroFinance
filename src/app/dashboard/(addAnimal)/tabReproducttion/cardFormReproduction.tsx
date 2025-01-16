'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user';
import { SelectForm } from '@/components/ui/selectForm';
import { FormMaleReproductive } from './components/formMaleReproductive';
import { FormPregnantStatus } from './components/formPregnantStatus';
import { FormWaitingStatus } from './components/formWaitingStatus';
import { InputForm } from '@/components/ui/inputForm';

interface CardFormReproductionProps {
  animals: Animal[];
  users: User[];
  allDataForm: Animal;
  handleInputValues: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setTabValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CardFormReproduction: React.FC<CardFormReproductionProps> = ({
  animals,
  users,
  allDataForm,
  handleInputValues,
  setTabValue,
}) => {
  const { data: session } = useSession();

  const userEmail = users.find((user) => user.email === session?.user?.email);
  const userId = userEmail?.id;

  const scores = [
    1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 5,
  ];

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(allDataForm);
    setTabValue('sanitarias');
  };
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
                      userId={userId}
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
                      userId={userId}
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
                            ? new Date(allDataForm.birthDate)
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
                <Button type="submit" onClick={sendForm}>
                  Próximo
                </Button>
              </article>
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
