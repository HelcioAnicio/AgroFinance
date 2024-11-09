export interface Animal {
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
  fetalGender: string | null;
  expectedDueDate: Date | null;
  bullIatf: string | null;
  bodyConditionScore: number | null;
  ownerId: string;
}
