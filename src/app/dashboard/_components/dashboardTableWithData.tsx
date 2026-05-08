'use client';

import { useCallback, useEffect, useState } from 'react';
import { Table } from '@/components/ui/table';
import { Animal } from '@/types/animal';
import { LivestockStatsYear } from '@/types/livestockStats';
import { User } from '@/types/user';
import { ExternalBull } from '@/types/externalBull';

export function DashboardTableWithData() {
  const [dataLoading, setDataLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);
  const [livestockStats, setLivestockStats] = useState<LivestockStatsYear[]>(
    []
  );

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
        externalBulls: ExternalBull[];
      } = await res.json();

      if (!cancelled) {
        setAnimals(data.animals ?? []);
        setUsers(data.users ?? []);
        setLivestockStats(data.livestockStats ?? []);
        setExternalBulls(data.externalBulls ?? []);
        setDataLoading(false);
      }
    } catch {
      if (!cancelled) {
        setAnimals([]);
        setUsers([]);
        setLivestockStats([]);
        setExternalBulls([]);
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

  return (
    <Table
      animals={animals}
      users={users}
      externalBulls={externalBulls}
      livestockStats={livestockStats}
      dataLoading={dataLoading}
    />
  );
}
