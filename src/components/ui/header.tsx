import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, CirclePlus } from "lucide-react";

export const Header = () => {
  return (
    <Sheet>
      <header className="flex w-full items-end justify-between p-2">
        <div className="w-1/3">
          <Image
            src="/logo"
            alt="Logo - Imagem de um touro e uma ovelha"
            width={100}
            height={100}
            className="size-24"
          />
        </div>
        <div className="flex w-full flex-col items-end gap-4">
          <div className="flex gap-3">
            <Button className="flex gap-2 p-1">
              Filtros <ListFilter />
            </Button>
            <SheetTrigger asChild>
              <Button className="flex gap-2 p-1">
                Adicionar <CirclePlus />
              </Button>
            </SheetTrigger>
          </div>
          <input
            className="w-full max-w-60 rounded-xl border bg-transparent p-1 shadow-md outline-none"
            type="search"
            name="inputSearch"
            id="inputSearch"
            placeholder="Pesquisar ID"
          />
        </div>
      </header>

      <SheetContent side="bottom" className="mt-5">
        <Tabs defaultValue="principais">
          <SheetHeader className="mt-5">
            <SheetTitle>
              <TabsList>
                <TabsTrigger value="principais">Principais</TabsTrigger>
                <TabsTrigger value="reproducao">Reprodução</TabsTrigger>
                <TabsTrigger value="sanitarias">Sanitárias</TabsTrigger>
              </TabsList>
            </SheetTitle>
          </SheetHeader>
          <TabsContent value="principais">
            <Card>
              <CardHeader className="py-2">
                <CardTitle>Informações principais</CardTitle>
              </CardHeader>
              <CardContent className="p-1">
                <form action="" method="post">
                  <section className="flex flex-col gap-4">
                    <div className="flex items-end gap-1">
                      <label className="text-secondary" htmlFor="idAnimal">
                        Id do animal:
                      </label>
                      <input
                        type="text"
                        name="idAnimal"
                        id="idAnimal"
                        className="w-20 border border-b border-b-primary bg-transparent outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary">Sexo:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="female">Fêmea</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="male">Macho</label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-secondary" htmlFor="birthday">
                          Nascimento:
                        </label>
                        <input
                          type="date"
                          name="birthday"
                          id="birthday"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="weight">
                          Peso:
                        </label>
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="breed">
                          Raça:
                        </label>
                        <input
                          type="text"
                          name="breed"
                          id="breed"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="category">
                          Categoria:
                        </label>
                        <input
                          type="text"
                          name="category"
                          id="category"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="mother">
                          Mãe:
                        </label>
                        <input
                          type="text"
                          name="mother"
                          id="mother"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="father">
                          Pai:
                        </label>
                        <input
                          type="text"
                          name="father"
                          id="father"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                    </div>
                    <Button type="submit">Próximo</Button>
                  </section>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reproducao">
            <Card>
              <CardHeader className="py-2">
                <CardTitle>Informações reprodutivas</CardTitle>
              </CardHeader>
              <CardContent className="p-1">
                <form action="" method="post">
                  <section className="flex flex-col gap-4">
                    <div className="flex items-end gap-1">
                      <label className="text-secondary" htmlFor="idAnimal">
                        Id do animal:
                      </label>
                      <input
                        type="text"
                        name="idAnimal"
                        id="idAnimal"
                        className="w-20 border border-b border-b-primary bg-transparent outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary">Sexo:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="female">Fêmea</label>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          className="h-3 w-3 appearance-none rounded-full border border-primary transition duration-200 checked:border-transparent checked:bg-primary focus:outline-none"
                        />
                        <label htmlFor="male">Macho</label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-secondary" htmlFor="birthday">
                          Nascimento:
                        </label>
                        <input
                          type="date"
                          name="birthday"
                          id="birthday"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="weight">
                          Peso:
                        </label>
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="breed">
                          Raça:
                        </label>
                        <input
                          type="text"
                          name="breed"
                          id="breed"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="category">
                          Categoria:
                        </label>
                        <input
                          type="text"
                          name="category"
                          id="category"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="mother">
                          Mãe:
                        </label>
                        <input
                          type="text"
                          name="mother"
                          id="mother"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-secondary" htmlFor="father">
                          Pai:
                        </label>
                        <input
                          type="text"
                          name="father"
                          id="father"
                          className="w-full border border-b border-b-primary bg-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button className="flex gap-1 border border-secondary bg-card text-card-foreground shadow-md">
                        Adicionar filhos <CirclePlus />{" "}
                      </Button>
                      <Button type="submit">Próximo</Button>
                    </div>
                  </section>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sanitarias">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right">Name</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right">Username</p>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
