'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExternalBulls from './external-bulls/page';
import ReproductionManagement from './management/page';

const ReproductionPage = () => {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-black">Informações de reprodução</h1>
        <p className="text-sm text-muted-foreground">Gerencie protocolos, touros externos e diagnósticos de gestação.</p>
      </div>

      <Tabs defaultValue="management" className="w-full">
        <TabsList className="mb-4 h-auto gap-1 rounded-xl bg-muted/50 p-1">
          <TabsTrigger value="external-bulls" className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Touros externos
          </TabsTrigger>
          <TabsTrigger value="management" className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Manejo
          </TabsTrigger>
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
