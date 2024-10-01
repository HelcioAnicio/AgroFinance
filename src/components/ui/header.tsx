import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { ListFilter, CirclePlus } from 'lucide-react';

export const Header = () => {
  return (
    <header className='flex justify-between items-end p-2'>
      <div className='w-1/3 '>
        <Image
          src='/logo'
          alt='Logo - Imagem de um touro e uma ovelha'
          width={100}
          height={100}
          className='size-24'
        />
      </div>
      <div className='flex w-full flex-col gap-4 items-end '>
        <div className='flex gap-3'>
          <Button className='flex gap-2 rounded-2xl p-1 shadow-gray-600 shadow-md'>
            Filtros <ListFilter />
          </Button>
          <Button className='flex gap-2 rounded-2xl p-1 shadow-gray-600 shadow-md'>
            Adicionar <CirclePlus />
          </Button>
        </div>
        <input
          className='w-full max-w-60 bg-transparent border rounded-xl shadow-md p-1'
          type='search'
          name='inputSearch'
          id='inputSearch'
          placeholder='Pesquisar ID'
        />
      </div>
    </header>
  );
};
