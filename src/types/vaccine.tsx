import { Animal } from './animal';

export interface Vaccine {
  id: string;
  name: string | null;
  description: string | null;
  animalId: string;
  animal?: Animal;
  date: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  expiryDate: Date | null;
}
