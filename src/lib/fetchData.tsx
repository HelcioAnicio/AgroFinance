// src/lib/fetchData.ts
import prisma from "@/lib/useDataBase";
import { Animal } from "@/types/animal";
import { User } from "@/types/user";

export const fetchAnimals = async (): Promise<Animal[]> => {
  return await prisma.animal.findMany();
};

export const fetchUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};
