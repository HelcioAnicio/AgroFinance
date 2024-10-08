"use client";

import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CardFormMain from "./cardFormMain";
import CardFormReproduction from "./cardFormReproduction";

export default function AddAnimals() {
  return (
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
          <CardFormMain />
        </TabsContent>

        <TabsContent value="reproducao">
          <CardFormReproduction />
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
  );
}
