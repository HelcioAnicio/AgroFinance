import React from 'react';
import { Animal } from '@/types/animal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReproductionProps {
  allDataForm: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({
  allDataForm,
}) => {
  const bullMatingLabel =
    allDataForm?.bull?.manualId ??
    allDataForm?.externalBull?.name ??
    'Comercial';

  const bullIatfLabel =
    allDataForm?.bullIatfRel?.manualId ??
    allDataForm?.externalBullIatfRel?.name ??
    'Comercial';

  return (
    <>
      <Card className="flex w-full flex-col gap-1 px-2 py-7">
        <CardHeader className="py-2">
          <CardTitle className="text-base">Dados Reprodutivos</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-2 px-1 py-2 sm:gap-7">
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
                <section className="flex flex-col gap-2">
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Status reprodutivo: </strong>
                    <span>Vazio</span>
                  </Card>
                  <p className="font-light">
                    O animal está vazio, pronto para reprodução.
                  </p>
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
                          : allDataForm?.handlingType ===
                              'artificialInsemination'
                            ? 'Inseminação Artificial'
                            : 'Todos os manejos'}
                      </span>
                    </Card>
                  </section>
                  {allDataForm?.handlingType === null ? (
                    'N/A'
                  ) : allDataForm?.handlingType === 'bullMating' ? (
                    <section className="flex flex-wrap gap-5">
                      <Card className="w-max rounded-sm px-3 py-1">
                        <strong>Touro Monta: </strong>
                        <span>{bullMatingLabel}</span>
                      </Card>
                    </section>
                  ) : allDataForm?.handlingType === 'artificialInsemination' ? (
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>Touro Iatf: </strong>
                      <span>{bullIatfLabel}</span>
                    </Card>
                  ) : (
                    <section className="flex flex-wrap gap-5">
                      <Card className="w-max rounded-sm px-3 py-1">
                        <strong>Touro Monta: </strong>
                        <span>{bullMatingLabel}</span>
                      </Card>
                      <Card className="w-max rounded-sm px-3 py-1">
                        <strong>Touro Iatf: </strong>
                        <span>{bullIatfLabel}</span>
                      </Card>
                    </section>
                  )}
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
                    <Card className="w-max rounded-sm px-3 py-1">
                      <strong>ECC: </strong>
                      <span>{allDataForm?.bodyConditionScore || 'N/A'}</span>
                    </Card>
                  </section>
                </div>
              ) : allDataForm?.reproductiveStatus === 'waiting' ? (
                // Aqui começa o estado em espera
                <div className="flex flex-col gap-3">
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
                          : 'Todos os métodos'}
                    </span>
                  </Card>
                  {allDataForm.handlingType === null ? (
                    'N/A'
                  ) : allDataForm.handlingType === 'naturalMating' ? (
                    <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                      <strong>Touro Monta: </strong>
                      <span>{bullMatingLabel}</span>
                    </Card>
                  ) : allDataForm.handlingType === 'artificialInsemination' ? (
                    <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                      <strong>Touro Iatf: </strong>
                      <span>{bullIatfLabel}</span>
                    </Card>
                  ) : (
                    <section className="flex flex-wrap gap-5">
                      <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                        <strong>Touro Monta: </strong>
                        <span>{bullMatingLabel}</span>
                      </Card>
                      <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                        <strong>Touro Iatf: </strong>
                        <span>{bullIatfLabel}</span>
                      </Card>
                    </section>
                  )}
                  <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                    <strong>Protocolo: </strong>
                    <span>
                      {allDataForm?.protocol === '3 handlings'
                        ? '3 manejos'
                        : allDataForm?.protocol === '4 handlings'
                          ? '4 manejos'
                          : allDataForm?.protocol === 'mixed'
                            ? 'Misto'
                            : 'N/A'}
                    </span>
                  </Card>
                </div>
              ) : (
                <section>
                  <p>
                    O animal não foi preenchido corretamente, falta informação.
                  </p>
                </section>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
