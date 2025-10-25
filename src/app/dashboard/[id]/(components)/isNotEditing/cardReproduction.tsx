import React from 'react';
import { Animal } from '@/types/animal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReproductionProps {
  animal: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({ animal }) => {
  return (
    <>
      <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-7 sm:gap-4">
        <CardHeader className="py-2">
          <CardTitle className="text-base">Dados Reprodutivos</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full max-w-lg flex-col gap-2 px-1 py-2 sm:gap-7">
          {animal?.gender === 'male' && (
            <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
              <strong>Andrologico: </strong>
              <span>
                {animal?.andrological === 'positive'
                  ? 'Positivo'
                  : animal?.andrological === 'negativo'
                    ? 'Negativo'
                    : 'Não realizado'}
              </span>
            </Card>
          )}

          {animal?.gender === 'female' && (
            <>
              <section className="flex flex-wrap gap-2">
                <Card className="flex w-max flex-wrap gap-2 rounded-sm px-3 py-1">
                  <strong>Status reprodutivo: </strong>
                  <span>
                    {animal?.reproductiveStatus === 'empty'
                      ? 'Vazio'
                      : animal?.reproductiveStatus === 'pregnant'
                        ? 'Prenha'
                        : animal?.reproductiveStatus === 'waiting'
                          ? 'Em espera'
                          : 'PEV'}
                  </span>
                </Card>
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Tipo de manejo: </strong>
                  <span>
                    {animal?.handlingType === 'bullMating'
                      ? 'Manejo de touro'
                      : animal?.handlingType === 'IATF'
                        ? 'IATF'
                        : 'Todos os manejos'}
                  </span>
                </Card>
              </section>
              <section className="flex w-full max-w-sm flex-wrap gap-2">
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Id Touro: </strong>
                  <span>{animal?.bull?.manualId}</span>
                </Card>
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Protocolo usado: </strong>
                  <span>{animal?.protocol || 'N/A'}</span>
                </Card>
              </section>
              <section className="flex w-full max-w-sm flex-wrap gap-2">
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Sexo fetal: </strong>
                  <span>
                    {animal?.fetalGender === 'male' ? 'Macho' : 'Fêmea'}
                  </span>
                </Card>
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Expectativa parto: </strong>
                  <span>
                    {animal?.expectedDueDate
                      ? new Date(animal.expectedDueDate).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </Card>
              </section>
              <section className="flex w-full max-w-sm flex-wrap gap-2">
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>Touro da IATF: </strong>
                  <span>{animal?.bull?.manualId || 'N/A'}</span>
                </Card>
                <Card className="w-max rounded-sm px-3 py-1">
                  <strong>ECC: </strong>
                  <span>{animal?.bodyConditionScore || 'N/A'}</span>
                </Card>
              </section>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
