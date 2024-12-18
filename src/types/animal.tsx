import { User } from "./user";

export interface Animal {
  status: string;
  id: string;
  manualId: number;
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
  bullIatf: string | null;
  bodyConditionScore: number | null;
  observations: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  bull?: Animal;
  offspringFromBull?: Animal[];
  father?: Animal;
  offspringFromFather?: Animal[];
  mother?: Animal;
  offspringFromMother?: Animal[];
  owner?: User;
  // dewormings?: Deworming[];
  // diseases?: Disease[];
  // vaccines?: Vaccine[];
}
