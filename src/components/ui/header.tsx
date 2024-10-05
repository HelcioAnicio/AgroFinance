import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <Tabs defaultValue='principais'>
          <SheetHeader>
            <SheetTitle>
              <TabsList>
                <TabsTrigger value='principais'>Principais</TabsTrigger>
                <TabsTrigger value='reproducao'>Reprodução</TabsTrigger>
                <TabsTrigger value='sanitarias'>Sanitárias</TabsTrigger>
              </TabsList>
            </SheetTitle>
          </SheetHeader>
          <TabsContent value='principais'>
            <Card>
              <CardHeader>
                <CardTitle>Informações principais</CardTitle>
              </CardHeader>
              <CardContent className='p-1'>
                <form
                  action=''
                  method='post'>
                  <section className='flex flex-col gap-4'>
                    <div className='flex gap-1 items-end'>
                      <label
                        className='text-secondary'
                        htmlFor='idAnimal'>
                        Id do animal:
                      </label>
                      <input
                        type='text'
                        name='idAnimal'
                        id='idAnimal'
                        className='border-b border border-b-primary w-20 bg-transparent outline-none'
                      />
                    </div>
                    <div className='flex gap-2'>
                      <span className='text-secondary'>Sexo:</span>
                      <div className='flex items-center gap-1'>
                        <input
                          type='radio'
                          name='gender'
                          id='female'
                          className='appearance-none h-3 w-3 border border-primary rounded-full checked:bg-primary checked:border-transparent focus:outline-none transition duration-200'
                        />
                        <label htmlFor='female'>Fêmea</label>
                      </div>
                      <div className='flex items-center gap-1'>
                        <input
                          type='radio'
                          name='gender'
                          id='male'
                          className='appearance-none h-3 w-3 border border-primary rounded-full checked:bg-primary checked:border-transparent focus:outline-none transition duration-200'
                        />
                        <label htmlFor='male'>Macho</label>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='birthday'>
                          Nascimento:
                        </label>
                        <input
                          type='date'
                          name='birthday'
                          id='birthday'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='weight'>
                          Peso:
                        </label>
                        <input
                          type='number'
                          name='weight'
                          id='weight'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='breed'>
                          Raça:
                        </label>
                        <input
                          type='text'
                          name='breed'
                          id='breed'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='category'>
                          Categoria:
                        </label>
                        <input
                          type='text'
                          name='category'
                          id='category'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='mother'>
                          Mãe:
                        </label>
                        <input
                          type='text'
                          name='mother'
                          id='mother'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                      <div>
                        <label
                          className='text-secondary'
                          htmlFor='father'>
                          Pai:
                        </label>
                        <input
                          type='text'
                          name='father'
                          id='father'
                          className='border-b border border-b-primary w-full bg-transparent outline-none'
                        />
                      </div>
                    </div>
                    <Button type='submit'>Próximo</Button>
                  </section>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='reproducao'>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <p className='text-right'>Name</p>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <p className='text-right'>Username</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='sanitarias'>
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
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
