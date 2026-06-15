import { User } from './user';
import { ExternalBull } from './externalBull';
import { Deworming, Disease } from './sanitary';

export type WeightRecordType = 'PN' | 'PS' | 'PD' | 'PA' | 'OTHER';

export interface AnimalWeightHistory {
  id: string;
  animalId: string;
  weight: number;
  recordType: WeightRecordType;
  measuredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnimalCalfLossHistory {
  id: string;
  animalId: string;
  ownerId: string;
  previousStatus: string | null;
  newStatus: string;
  expectedDueDate: Date | null;
  lossDate: Date;
  reason: string | null;
  fatherType: string;
  fatherAnimalId: string | null;
  externalBullId: string | null;
  fatherAnimal?: Animal;
  externalBull?: ExternalBull;
  createdAt: Date;
  updatedAt: Date;
}

export interface Animal {
  id: string;
  status: string;
  manualId: string;
  gender: string;
  birthDate: Date;
  weight: number;
  breed: string;
  category: string;
  motherId: string | null;
  fatherId: string | null;
  reproductiveStatus: string | null;
  handlingType: string | null;
  bullId: string | null;
  protocol: string | null;
  andrological: string | null;
  expectedDueDate: Date | null;
  fetalGender: string | null;
  bullIatfId: string | null;
  externalBullId: string | null;
  externalBullIatfId: string | null;
  bodyConditionScore: number | null;
  observations: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  vaccineName: string | null;
  vaccineDate: Date | null;
  vaccineExpiry: Date | null;
  dewormingName: string | null;
  dewormingDate: Date | null;
  dewormingExpiry: Date | null;
  bull?: Animal;
  offspringFromBull?: Animal[];
  bullIatfRel?: Animal;
  externalBull?: ExternalBull;
  externalBullIatfRel?: ExternalBull;
  offspringFromBullIatf?: Animal[];
  father?: Animal;
  offspringFromFather?: Animal[];
  mother?: Animal;
  offspringFromMother?: Animal[];
  owner?: User;
  weightHistories?: AnimalWeightHistory[];
  calfLossHistories?: AnimalCalfLossHistory[];
  isForFattening?: boolean;
  weightRecordType?: WeightRecordType;
  weightRecordDate?: string | Date | null;
  statusChangeDate?: string | Date | null;
  dewormings?: Deworming[];
  diseases?: Disease[];
  // vaccines?: Vaccine[];
}
