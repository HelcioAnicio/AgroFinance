import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ListFilter, CirclePlus } from 'lucide-react';

export const Header = () => {
  return (
    <Sheet>
      <header className='flex justify-between items-end p-2 w-full'>
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
            <Button className='flex gap-2 rounded-2xl p-1 '>
              Filtros <ListFilter />
            </Button>
            <SheetTrigger asChild>
              <Button className='flex gap-2 rounded-2xl p-1 '>
                Adicionar <CirclePlus />
              </Button>
            </SheetTrigger>
          </div>
          <input
            className='w-full max-w-60 outline-none bg-transparent border rounded-xl shadow-md p-1'
            type='search'
            name='inputSearch'
            id='inputSearch'
            placeholder='Pesquisar ID'
          />
        </div>
      </header>

      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <p className='text-right'>Name</p>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <p className='text-right'>Username</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
