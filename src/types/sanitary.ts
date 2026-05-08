export interface Deworming {
  id: string;
  name: string;
  date: Date;
  animalId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Disease {
  id: string;
  name: string;
  description: string | null;
  date: Date;
  animalId: string;
  createdAt: Date;
  updatedAt: Date;
}
