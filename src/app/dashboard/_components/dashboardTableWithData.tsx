'use client';

import { useEffect, useState } from 'react';
import { Table } from '@/components/ui/table';
import { Animal } from '@/types/animal';
import { User } from '@/types/user';

export function DashboardTableWithData() {
  const [dataLoading, setDataLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/dashboard-table-data')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar dados');
        return res.json();
      })
      .then((data: { animals: Animal[]; users: User[] }) => {
        if (!cancelled) {
          setAnimals(data.animals ?? []);
          setUsers(data.users ?? []);
          setDataLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAnimals([]);
          setUsers([]);
          setDataLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <Table animals={animals} users={users} dataLoading={dataLoading} />;
}
