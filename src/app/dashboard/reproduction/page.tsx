'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExternalBulls from './external-bulls/page';
import ReproductionManagement from './management/page';

const ReproductionPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Informações de reprodução</h1>
      <Tabs defaultValue="external-bulls" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="external-bulls">Touros externos</TabsTrigger>
          <TabsTrigger value="management">Manejo</TabsTrigger>
        </TabsList>
        <TabsContent value="external-bulls">
          <ExternalBulls />
        </TabsContent>
        <TabsContent value="management">
          <ReproductionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReproductionPage;
