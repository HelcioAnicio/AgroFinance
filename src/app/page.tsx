// import { Button } from '@/components/ui/button';

import { Header } from "@/components/ui/header";
import { MenuNavegation } from "@/components/ui/menu";
import { Table } from "@/components/ui/table";

export default function Home() {
  return (
    <div className="h-full overflow-hidden text-xs">
      <Header />
      <Table />
      <MenuNavegation />
    </div>
  );
}
