import { User } from './user';
import { Animal } from './animal';

export interface Notification {
  id: string;
  message: string;
  notifyAt: Date;
  read: boolean;
  animalId: string;
  userId: string;
  createdAt: Date;
  user: User;
  animal: Animal;
}
