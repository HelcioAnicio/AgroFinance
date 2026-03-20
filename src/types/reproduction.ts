export interface ReproductionManagement {
  id: string;
  animalId: string;
  stage: 'D0' | 'Manejo' | 'Insemination' | 'DG';
  date: Date;
  protocolo?: boolean;
  implant?: string;
  obs?: string;
  ecc?: number;
  touroId?: string;
  touroType?: 'internal' | 'external';
  partida?: string;
  cio?: string;
  ressinc?: boolean;
  ressincCount: number;
  ressincHistory?: { date: string; obs: string }[];
  newReproductiveStatus?: string;
  createdAt: Date;
  updatedAt: Date;
  animal?: {
    id: string;
    manualId: string;
    reproductiveStatus?: string;
    bodyConditionScore?: number;
  };
}
