import React from 'react';
import { Animal } from '@/types/animal';

interface ReproductionProps {
  allDataForm: Animal | null;
}

export const CardReproduction: React.FC<ReproductionProps> = ({ allDataForm }) => {
  const bullMatingLabel =
    allDataForm?.bull?.manualId ?? allDataForm?.externalBull?.name ?? 'Comercial';
  const bullIatfLabel =
    allDataForm?.bullIatfRel?.manualId ?? allDataForm?.externalBullIatfRel?.name ?? 'Comercial';

  const fieldClass = 'rounded-xl bg-muted/20 px-3 py-2';
  const fieldLabel = 'text-[10px] font-bold uppercase tracking-widest text-muted-foreground';
  const fieldValue = 'mt-0.5 text-sm font-semibold';

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-bold">Dados Reprodutivos</h2>

      {allDataForm?.gender === 'male' && (
        <div className={fieldClass}>
          <p className={fieldLabel}>Exame andrológico</p>
          <p className={fieldValue}>
            {allDataForm?.andrological === 'positive'
              ? 'Positivo'
              : allDataForm?.andrological === 'negative'
                ? 'Negativo'
                : 'Não realizado'}
          </p>
        </div>
      )}

      {allDataForm?.gender === 'female' && (
        <div className="space-y-3">
          {allDataForm?.reproductiveStatus === 'empty' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Vazia</p>
              </div>
              <p className="text-xs text-muted-foreground">Animal vazio, pronto para reprodução.</p>
            </>
          )}

          {allDataForm?.reproductiveStatus === 'pregnant' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Prenha</p>
              </div>
              <div className={fieldClass}>
                <p className={fieldLabel}>Tipo de manejo</p>
                <p className={fieldValue}>
                  {allDataForm?.handlingType === 'bullMating'
                    ? 'Monta natural'
                    : allDataForm?.handlingType === 'artificialInsemination'
                      ? 'Inseminação artificial'
                      : 'Todos os manejos'}
                </p>
              </div>
              {allDataForm?.handlingType === 'bullMating' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro (monta)</p>
                  <p className={fieldValue}>{bullMatingLabel}</p>
                </div>
              )}
              {allDataForm?.handlingType === 'artificialInsemination' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro IATF</p>
                  <p className={fieldValue}>{bullIatfLabel}</p>
                </div>
              )}
              {allDataForm?.handlingType === null && (
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
              {allDataForm?.fetalGender !== undefined && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Sexo fetal</p>
                  <p className={fieldValue}>
                    {allDataForm?.fetalGender === null
                      ? 'N/A'
                      : allDataForm?.fetalGender === 'male'
                        ? 'Macho'
                        : 'Fêmea'}
                  </p>
                </div>
              )}
              {allDataForm?.expectedDueDate && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Previsão de parto</p>
                  <p className={fieldValue}>
                    {new Date(allDataForm.expectedDueDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
              {allDataForm?.bodyConditionScore && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>ECC</p>
                  <p className={fieldValue}>{allDataForm.bodyConditionScore}</p>
                </div>
              )}
            </>
          )}

          {allDataForm?.reproductiveStatus === 'waiting' && (
            <>
              <div className={fieldClass}>
                <p className={fieldLabel}>Status reprodutivo</p>
                <p className={fieldValue}>Em espera</p>
              </div>
              <div className={fieldClass}>
                <p className={fieldLabel}>Manejo utilizado</p>
                <p className={fieldValue}>
                  {allDataForm.handlingType === 'naturalMating'
                    ? 'Monta natural'
                    : allDataForm.handlingType === 'artificialInsemination'
                      ? 'Inseminação artificial'
                      : 'Todos os métodos'}
                </p>
              </div>
              {allDataForm.handlingType === 'naturalMating' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro (monta)</p>
                  <p className={fieldValue}>{bullMatingLabel}</p>
                </div>
              )}
              {allDataForm.handlingType === 'artificialInsemination' && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Touro IATF</p>
                  <p className={fieldValue}>{bullIatfLabel}</p>
                </div>
              )}
              {allDataForm?.protocol && (
                <div className={fieldClass}>
                  <p className={fieldLabel}>Protocolo</p>
                  <p className={fieldValue}>
                    {allDataForm.protocol === '3 handlings'
                      ? '3 manejos'
                      : allDataForm.protocol === '4 handlings'
                        ? '4 manejos'
                        : allDataForm.protocol === 'mixed'
                          ? 'Misto'
                          : 'N/A'}
                  </p>
                </div>
              )}
            </>
          )}

          {allDataForm?.reproductiveStatus === 'pev' && (
            <div className={fieldClass}>
              <p className={fieldLabel}>Status reprodutivo</p>
              <p className={fieldValue}>PEV</p>
            </div>
          )}

          {!allDataForm?.reproductiveStatus && (
            <p className="text-sm text-muted-foreground">Status reprodutivo não informado.</p>
          )}
        </div>
      )}
    </div>
  );
};
