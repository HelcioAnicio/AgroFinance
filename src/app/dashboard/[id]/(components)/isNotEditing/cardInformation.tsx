import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { MdHighlightOff } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { IoSkull } from 'react-icons/io5';
import {
  TbMoneybag,
  TbZoomQuestionFilled,
  TbTrashXFilled,
} from 'react-icons/tb';

interface InformationProps {
  allDataForm: Animal | null;
}

export const CardInformation: React.FC<InformationProps> = ({
  allDataForm,
}) => {
  return (
    <Card className="flex w-full max-w-lg flex-col px-2 py-7 sm:flex-row sm:flex-wrap">
      <CardHeader className="py-2">
        <CardTitle className="text-base">Dados básicos</CardTitle>
      </CardHeader>

      <section className="flex w-full max-w-sm flex-wrap gap-x-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id: </strong>
          <span>
            {allDataForm?.manualId.charAt(0).toUpperCase()}
            {allDataForm?.manualId.substring(1)}
          </span>
        </Card>
        <Card className="flex w-max gap-1 rounded-sm px-3 py-1">
          <strong>Status: </strong>
          <span className="flex w-max items-center gap-1">
            {allDataForm?.status === 'active' ||
            allDataForm?.status === 'ativo' ? (
              <>
                <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                Ativo
              </>
            ) : allDataForm?.status === 'inactive' ||
              allDataForm?.status === 'inativo' ? (
              <>
                <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                Inativo
              </>
            ) : allDataForm?.status === 'dead' ||
              allDataForm?.status === 'morto' ? (
              <>
                <IoSkull className="inline-block size-3 text-black" /> Morto
              </>
            ) : allDataForm?.status === 'lost' ? (
              <>
                <TbZoomQuestionFilled className="inline-block size-3 text-amber-500" />{' '}
                Perdida
              </>
            ) : allDataForm?.status === 'trash' ? (
              <>
                <TbTrashXFilled className="inline-block size-3 text-red-500" />{' '}
                Descarte
              </>
            ) : (
              <>
                <TbMoneybag className="inline-block size-3 text-yellow-600" />{' '}
                Vendido
              </>
            )}
          </span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Sexo: </strong>
          <span>{allDataForm?.gender === 'male' ? 'Macho' : 'Fêmea'}</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Nascimento: </strong>
          <span>
            {allDataForm?.birthDate
              ? new Date(allDataForm.birthDate).toLocaleDateString()
              : 'N/A'}
          </span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Peso atual: </strong>
          <span>{allDataForm?.weight} kg</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Raça: </strong>
          <span>
            {allDataForm?.breed
              ? `${allDataForm?.breed[0].toUpperCase()}${allDataForm.breed.substring(1)}`
              : 'N/A'}
          </span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Categoria: </strong>
          <span>
            {allDataForm?.category
              ? allDataForm?.category === 'neonate'
                ? 'Neonato'
                : allDataForm?.category === 'calf'
                  ? 'Bezerro'
                  : allDataForm?.category === 'steer' &&
                      allDataForm?.gender === 'male'
                    ? 'Garrote'
                    : allDataForm?.category === 'steer' &&
                        allDataForm?.gender === 'female'
                      ? 'Novilho'
                      : allDataForm?.category === 'cow'
                        ? 'Vaca'
                        : allDataForm?.category === 'old cow'
                          ? 'Vaca velha'
                          : allDataForm?.category === 'ox'
                            ? 'Boi'
                            : allDataForm?.category === 'old ox'
                              ? 'Boi Velho'
                              : allDataForm?.category === 'bull'
                                ? 'Touro'
                                : 'Touro velho'
              : 'N/A'}
          </span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id Mãe: </strong>
          <span>
            {allDataForm?.mother?.manualId == null
              ? 'Comercial'
              : allDataForm?.mother?.manualId == typeof Number
                ? Number(allDataForm?.mother?.manualId)
                : `${allDataForm?.mother?.manualId.charAt(0).toUpperCase()}${allDataForm?.mother?.manualId.substring(1)}`}
          </span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id Pai: </strong>
          <span>
            {allDataForm?.father?.manualId == null
              ? 'Comercial'
              : allDataForm?.father?.manualId == typeof Number
                ? Number(allDataForm?.father?.manualId)
                : `${allDataForm?.father?.manualId.charAt(0).toUpperCase()}${allDataForm?.father?.manualId.substring(1)}`}
          </span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Observações: </strong>
          <span>{allDataForm?.observations}</span>
        </Card>
      </section>
    </Card>
  );
};
