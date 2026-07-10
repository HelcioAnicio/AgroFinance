import React from 'react';
import { Animal } from '@/types/animal';

interface ReproductionProps {
  animal: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({ animal }) => {
  const bullMatingLabel =
    animal?.bull?.manualId ?? animal?.externalBull?.name ?? 'Comercial';
  const bullIatfLabel =
    animal?.bullIatfRel?.manualId ??
    animal?.externalBullIatfRel?.name ??
    'Comercial';

  const fieldClass = 'rounded-xl bg-muted/20 px-3 py-2';
  const fieldLabel =
    'text-[10px] font-bold uppercase tracking-widest text-muted-foreground';
  const fieldValue = 'mt-0.5 text-sm font-semibold';

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-bold">Dados Reprodutivos</h2>

      {animal?.gender === 'male' && (
        <div className={fieldClass}>
          <p className={fieldLabel}>Exame andrológico</p>
          <p className={fieldValue}>
            {animal?.andrological === 'positive'
              ? 'Positivo'
              : animal?.andrological === 'negative'
                ? 'Negativo'
                : 'Não realizado'}
          </p>
        </div>
      )}

      {animal?.gender === 'female' && (
        <div className="space-y-3">
          {animal?.reproductiveStatus === 'empty' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Vazia</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Animal vazio, pronto para reprodução.
              </p>
            </>
          )}

          {animal?.reproductiveStatus === 'pregnant' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Prenha</p>
              </div>
              <div className={fieldClass}>
                <p className={fieldLabel}>Tipo de manejo</p>
                <p className={fieldValue}>
                  {animal?.handlingType === 'bullMating'
                    ? 'Monta natural'
                    : animal?.handlingType === 'artificialInsemination'
                      ? 'Inseminação artificial'
                      : 'Todos os manejos'}
                </p>
              </div>
              {animal?.handlingType === 'bullMating' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro (monta)</p>
                  <p className={fieldValue}>{bullMatingLabel}</p>
                </div>
              )}
              {animal?.handlingType === 'artificialInsemination' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro IATF</p>
                  <p className={fieldValue}>{bullIatfLabel}</p>
                </div>
              )}
              {animal?.handlingType === null && (
                <>
                  <div className={fieldClass}>
                    <p className={fieldLabel}>Touro (monta)</p>
                    <p className={fieldValue}>{bullMatingLabel}</p>
                  </div>
                  <div className={fieldClass}>
                    <p className={fieldLabel}>Touro IATF</p>
                    <p className={fieldValue}>{bullIatfLabel}</p>
                  </div>
                </>
              )}
              {animal?.fetalGender !== undefined && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Sexo fetal</p>
                  <p className={fieldValue}>
                    {animal?.fetalGender === null
                      ? 'N/A'
                      : animal?.fetalGender === 'male'
                        ? 'Macho'
                        : 'Fêmea'}
                  </p>
                </div>
              )}
              {animal?.expectedDueDate && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Previsão de parto</p>
                  <p className={fieldValue}>
                    {new Date(animal.expectedDueDate).toLocaleDateString(
                      'pt-BR'
                    )}
                  </p>
                </div>
              )}
              {animal?.bodyConditionScore && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>ECC</p>
                  <p className={fieldValue}>{animal.bodyConditionScore}</p>
                </div>
              )}
            </>
          )}

          {animal?.reproductiveStatus === 'waiting' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Em espera</p>
              </div>
              <div className={fieldClass}>
                <p className={fieldLabel}>Manejo utilizado</p>
                <p className={fieldValue}>
                  {animal.handlingType === 'naturalMating'
                    ? 'Monta natural'
                    : animal.handlingType === 'artificialInsemination'
                      ? 'Inseminação artificial'
                      : 'Todos os métodos'}
                </p>
              </div>
              {animal.handlingType === 'naturalMating' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro (monta)</p>
                  <p className={fieldValue}>{bullMatingLabel}</p>
                </div>
              )}
              {animal.handlingType === 'artificialInsemination' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro IATF</p>
                  <p className={fieldValue}>{bullIatfLabel}</p>
                </div>
              )}
              {animal?.protocol && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Protocolo</p>
                  <p className={fieldValue}>
                    {animal.protocol === '3 handlings'
                      ? '3 manejos'
                      : animal.protocol === '4 handlings'
                        ? '4 manejos'
                        : animal.protocol === 'mixed'
                          ? 'Misto'
                          : 'N/A'}
                  </p>
                </div>
              )}
            </>
          )}

          {animal?.reproductiveStatus === 'pev' && (
            <div className={fieldClass}>
              <p className={fieldLabel}>Status reprodutivo</p>
              <p className={fieldValue}>PEV</p>
            </div>
          )}

          {!animal?.reproductiveStatus && (
            <p className="text-sm text-muted-foreground">
              Status reprodutivo não informado.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
