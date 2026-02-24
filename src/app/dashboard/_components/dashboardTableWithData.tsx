'use client';

import { useCallback, useEffect, useState } from 'react';
import { Table } from '@/components/ui/table';
import { Animal } from '@/types/animal';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';

export function DashboardTableWithData() {
  const [dataLoading, setDataLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [livestockStats, setLivestockStats] = useState<LivestockStatsYear[]>([]);

  const loadData = useCallback(async () => {
    setDataLoading(true);
    let cancelled = false;

    try {
      const res = await fetch('/api/dashboard-table-data');
      if (!res.ok) throw new Error('Falha ao carregar dados');
      const data: {
        animals: Animal[];
        users: User[];
        livestockStats: LivestockStatsYear[];
      } = await res.json();

      if (!cancelled) {
        setAnimals(data.animals ?? []);
        setUsers(data.users ?? []);
        setLivestockStats(data.livestockStats ?? []);
        setDataLoading(false);
      }
    } catch {
      if (!cancelled) {
        setAnimals([]);
        setUsers([]);
        setLivestockStats([]);
        setDataLoading(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleFocus = () => {
      loadData();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadData]);

  return (
    <Table
      animals={animals}
      users={users}
      livestockStats={livestockStats}
      dataLoading={dataLoading}
    />
  );
}
