'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';

interface AppContextType {
  animals: Animal[];
  animal: Animal | null;
  originalAnimals: Animal[];
  originalAnimal: Animal | null;
  externalBulls: ExternalBull[];
  setAnimals: (animals: Animal[]) => void;
  setAnimal: (animal: Animal | null) => void;
  setOriginalAnimals: (animals: Animal[]) => void;
  setOriginalAnimal: (animal: Animal | null) => void;
  setExternalBulls: (externalBulls: ExternalBull[]) => void;
}

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [originalAnimals, setOriginalAnimals] = useState<Animal[]>([]);
  const [originalAnimal, setOriginalAnimal] = useState<Animal | null>(null);
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);

  return (
    <appContext.Provider
      value={{
        animals,
        setAnimals,
        animal,
        setAnimal,
        originalAnimals,
        setOriginalAnimals,
        originalAnimal,
        setOriginalAnimal,
        externalBulls,
        setExternalBulls,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export function useAppGlobal() {
  const context = useContext(appContext);
  if (!context) {
    throw new Error('useAppGlobal deve ser usado dentro de um AppProvider');
  }
  return context;
}
