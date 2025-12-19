import React from 'react';
import { Animal } from '@/types/animal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReproductionProps {
  allDataForm: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({
  allDataForm,
}) => {
  return (
    <>
      <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-7 sm:gap-4">
        <CardHeader className="py-2">
          <CardTitle className="text-base">Dados Reprodutivos</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full max-w-lg flex-col gap-2 px-1 py-2 sm:gap-7">
          {allDataForm?.gender === 'male' && (
            <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
              <strong>Andrologico: </strong>
              <span>
                {allDataForm?.andrological === 'positive'
                  ? 'Positivo'
                  : allDataForm?.andrological === 'negativo'
                    ? 'Negativo'
                    : 'Não realizado'}
              </span>
            </Card>
          )}

          {allDataForm?.gender === 'female' && (
            <>
              {allDataForm?.reproductiveStatus === 'empty' ? (
                <section className="flex flex-wrap gap-2">
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Status reprodutivo: </strong>
                    <span>Vazio</span>
                  </Card>
                  <p>O animal está vazio, pronto para reprodução.</p>
                </section>
              ) : allDataForm?.reproductiveStatus === 'pregnant' ? (
                <div className="flex flex-col gap-3">
                  <section className="flex w-full max-w-sm flex-wrap gap-2">
                    <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                      <strong>Status reprodutivo: </strong>
                      <span>Prenha</span>
                    </Card>
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>Tipo de manejo: </strong>
                      <span>
                        {allDataForm?.handlingType === 'bullMating'
                          ? 'Manejo de touro'
                          : allDataForm?.handlingType === 'IATF'
                            ? 'IATF'
                            : 'Todos os manejos'}
                      </span>
                    </Card>
                  </section>
                  {allDataForm?.handlingType === 'bullMating' ||
                    (allDataForm?.handlingType === 'allMethods' && (
                      <Card className="w-max rounded-sm px-3 py-1">
                        <strong>Id Touro: </strong>
                        <span>
                          {allDataForm.bullId !== null
                            ? allDataForm?.bull?.manualId
                            : 'Comercial'}
                        </span>
                      </Card>
                    ))}
                  <section className="flex w-full max-w-sm flex-wrap gap-2">
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>Sexo fetal: </strong>
                      <span>
                        {allDataForm?.fetalGender === null
                          ? 'N/A'
                          : allDataForm?.fetalGender === 'male'
                            ? 'Macho'
                            : 'Fêmea'}
                      </span>
                    </Card>
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>Expectativa parto: </strong>
                      <span>
                        {allDataForm?.expectedDueDate !== null
                          ? new Date(
                              allDataForm.expectedDueDate
                            ).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </Card>
                  </section>
                  <section className="flex w-full max-w-sm flex-wrap gap-2">
                    {allDataForm?.handlingType === 'artificialInsemination' ||
                      (allDataForm?.handlingType === 'allMethods' && (
                        <Card className="w-max rounded-sm px-3 py-1">
                          <strong>Touro da IATF: </strong>
                          <span>
                            {allDataForm?.bull?.manualId === null
                              ? 'N/A'
                              : allDataForm?.bull?.manualId}
                          </span>
                        </Card>
                      ))}
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>ECC: </strong>
                      <span>{allDataForm?.bodyConditionScore || 'N/A'}</span>
                    </Card>
                  </section>
                </div>
              ) : allDataForm?.reproductiveStatus === 'waiting' ? (
                <div className="flex w-full max-w-sm flex-wrap gap-2">
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Status reprodutivo: </strong>
                    <span>Em espera</span>
                  </Card>
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Manejo utilizado: </strong>
                    <span>
                      {allDataForm.handlingType === 'naturalMating'
                        ? 'Monta Natural'
                        : allDataForm.handlingType === 'artificialInsemination'
                          ? 'Inseminação artificial'
                          : 'Todos os metodos'}
                    </span>
                  </Card>
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Touro Utilizado: </strong>
                    <span>
                      {allDataForm.bullId === null &&
                      (allDataForm.handlingType === 'naturalMating' ||
                        allDataForm.handlingType === 'allMethods')
                        ? 'Comercial'
                        : allDataForm.bullId &&
                            (allDataForm.handlingType === 'naturalMating' ||
                              allDataForm.handlingType === 'allMethods')
                          ? allDataForm.bull?.manualId
                          : 'N/A'}
                    </span>
                  </Card>
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Protocolo: </strong>
                    <span>
                      {allDataForm.bullId === null &&
                      (allDataForm.handlingType === 'naturalMating' ||
                        allDataForm.handlingType === 'allMethods')
                        ? 'Comercial'
                        : allDataForm.bullId &&
                            (allDataForm.handlingType === 'naturalMating' ||
                              allDataForm.handlingType === 'allMethods')
                          ? allDataForm.bull?.manualId
                          : 'N/A'}
                    </span>
                  </Card>
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Touro IATF: </strong>
                    <span>
                      {allDataForm.bullIatf !== null &&
                      (allDataForm.handlingType === 'artificialInsemination' ||
                        allDataForm.handlingType === 'allMethods')
                        ? allDataForm.bullIatf
                        : allDataForm.bullId &&
                            (allDataForm.handlingType === 'naturalMating' ||
                              allDataForm.handlingType === 'allMethods')
                          ? allDataForm.bull?.manualId
                          : 'N/A'}
                    </span>
                  </Card>
                  {/* <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Status reprodutivo: </strong>
                    <span>Em espera</span>
                  </Card>
                  <p>O animal está vazio, pronto para reprodução.</p> */}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Status reprodutivo: </strong>
                    <span>Vazio</span>
                  </Card>
                  <p>O animal está vazio, pronto para reprodução.</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
