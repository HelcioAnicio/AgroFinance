import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Animal } from '@/types/animal';
import { MdHighlightOff } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { IoSkull } from 'react-icons/io5';
import { TbMoneybag } from 'react-icons/tb';

interface InformationProps {
  animal: Animal | null;
}

export const CardInformation: React.FC<InformationProps> = ({ animal }) => {
  return (
    <Card className="flex w-full max-w-lg flex-col gap-2 px-2 py-7 sm:flex-row sm:flex-wrap sm:gap-4">
      <CardHeader className="py-2">
        <CardTitle className="text-base">Dados básicos</CardTitle>
      </CardHeader>

      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id: </strong>
          <span>{animal?.manualId}</span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Status: </strong>
          <span>
            {animal?.status === 'active' ? (
              <>
                <FaCheckCircle className="inline-block size-3 text-green-400" />{' '}
                Ativo
              </>
            ) : animal?.status === 'inactive' ? (
              <>
                <MdHighlightOff className="inline-block size-3 text-gray-500" />{' '}
                Inativo
              </>
            ) : animal?.status === 'dead' ? (
              <>
                <IoSkull className="inline-block size-3 text-black" /> Morto
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
          <span>{animal?.gender === 'male' ? 'Macho' : 'Fêmea'}</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Nascimento: </strong>
          <span>
            {animal?.birthDate
              ? new Date(animal.birthDate).toLocaleDateString()
              : 'N/A'}
          </span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Peso: </strong>
          <span>{animal?.weight} kg</span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Raça: </strong>
          <span>{animal?.breed}</span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Categoria: </strong>
          <span>
            {' '}
            {animal?.category === 'calf'
              ? 'Bezerro'
              : animal?.category === 'steer'
                ? 'Novilho'
                : animal?.category === 'adult'
                  ? animal?.gender === 'female'
                    ? 'Vaca'
                    : 'Boi'
                  : animal?.category === 'senior'
                    ? animal?.gender === 'female'
                      ? 'Vaca velha'
                      : 'Boi velho'
                    : animal?.category
                      ? `${animal?.category[0].toUpperCase()}${animal?.category.substring(1)}`
                      : 'N/A'}
          </span>
        </Card>
      </section>
      <section className="flex w-full max-w-sm flex-wrap gap-2 p-2">
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id Mãe: </strong>
          <span>{animal?.mother?.manualId || 'Comercial'}</span>
        </Card>
        <Card className="w-max rounded-sm px-3 py-1">
          <strong>Id Pai: </strong>
          <span>{animal?.father?.manualId || 'Comercial'}</span>
        </Card>
      </section>
    </Card>
  );
};
