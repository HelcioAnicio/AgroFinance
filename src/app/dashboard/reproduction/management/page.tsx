'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table-components';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ReproductionManagement } from '@/types/reproduction';
import { Animal } from '@/types/animal';
import { ExternalBull } from '@/types/externalBull';

const ReproductionManagementPage = () => {
  const [currentStage, setCurrentStage] = useState<
    'D0' | 'Manejo' | 'Insemination' | 'DG'
  >('D0');
  const [managements, setManagements] = useState<ReproductionManagement[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);
  const [animalSearch, setAnimalSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stageDates, setStageDates] = useState<Record<string, string>>({
    D0: '',
    Manejo: '',
    Insemination: '',
    DG: '',
  });
  const [formData, setFormData] = useState({
    animalId: '',
    date: '',
    protocolo: false,
    implant: '',
    obs: '',
    ecc: '',
    touroId: '',
    touroType: 'internal' as 'internal' | 'external',
    partida: '',
    cio: '',
    ressinc: false,
    newReproductiveStatus: '',
  });

  const stageLabels: Record<string, string> = {
    D0: 'D0',
    Manejo: 'Manejo',
    Insemination: 'Inseminação',
    DG: 'DG',
  };

  const toLocalDateString = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const computeStageDates = useCallback(
    (managements: ReproductionManagement[]) => {
      const dates: Record<string, string> = {
        D0: '',
        Manejo: '',
        Insemination: '',
        DG: '',
      };

      managements.forEach((m) => {
        const dateStr = toLocalDateString(m.date);
        if (!dates[m.stage] || dateStr > dates[m.stage]) {
          dates[m.stage] = dateStr;
        }
      });

      return dates;
    },
    []
  );

  const fetchData = useCallback(async () => {
    try {
      const [managementsRes, animalsRes, bullsRes] = await Promise.all([
        fetch('/api/reproduction-management'),
        fetch('/api/dashboard-table-data'),
        fetch('/api/external-bulls'),
      ]);

      const managementsData = await managementsRes.json();
      const animalsData = await animalsRes.json();
      const bullsData = await bullsRes.json();

      setManagements(managementsData);
      const dates = computeStageDates(managementsData);
      setStageDates(dates);
      setAnimals(animalsData.animals || []);
      const externalBullsList = Array.isArray(bullsData)
        ? bullsData
        : bullsData?.externalBulls || [];
      setExternalBulls(externalBullsList);

      setFormData((prev) => ({
        ...prev,
        date: dates[currentStage] || prev.date,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [computeStageDates, currentStage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const translateCategory = (category = '') => {
    const c = category.toLowerCase();
    if (c === 'neonate') return 'Neonato';
    if (c === 'calf') return 'Bezerro';
    if (c === 'steer') return 'Garrote';
    if (c === 'cow') return 'Vaca';
    if (c === 'old cow') return 'Vaca velha';
    if (c === 'ox') return 'Boi';
    if (c === 'old ox') return 'Boi velho';
    if (c === 'bull') return 'Touro';
    if (c === 'old bull') return 'Touro velho';
    return category;
  };

  const isCowCandidate = (animal: Animal) => {
    const c = animal.category?.toLowerCase();
    return (
      animal.status?.toLowerCase() === 'active' &&
      (c === 'cow' || c === 'old cow')
    );
  };

  const isMaleBull = (animal: Animal) => {
    const c = animal.category?.toLowerCase();
    return (
      animal.status?.toLowerCase() === 'active' &&
      (c === 'bull' || c === 'old bull')
    );
  };

  const getFilteredAnimals = () => {
    const search = animalSearch.trim().toLowerCase();
    const numericSearch = search.replace(/\D/g, '');

    const filterByStage = () => {
      switch (currentStage) {
        case 'D0': {
          const emptyCows = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              animal.reproductiveStatus?.toLowerCase() === 'empty'
          );
          const ressincCows = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              managements.some(
                (m) => m.animalId === animal.id && m.stage === 'DG' && m.ressinc
              )
          );
          return [
            ...emptyCows,
            ...ressincCows.filter(
              (cow) => !emptyCows.some((ec) => ec.id === cow.id)
            ),
          ];
        }
        case 'Manejo': {
          return animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              managements.some(
                (m) =>
                  m.animalId === animal.id && m.stage === 'D0' && m.protocolo
              )
          );
        }
        case 'Insemination': {
          const protocoladas = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              managements.some(
                (m) => m.animalId === animal.id && m.stage === 'Manejo'
              )
          );
          const notParticipated = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              managements.some(
                (m) =>
                  m.animalId === animal.id && m.stage === 'D0' && m.protocolo
              ) &&
              !managements.some(
                (m) => m.animalId === animal.id && m.stage === 'Manejo'
              )
          );
          return [...protocoladas, ...notParticipated];
        }
        case 'DG': {
          const inseminated = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              managements.some(
                (m) => m.animalId === animal.id && m.stage === 'Insemination'
              )
          );
          const pregnant = animals.filter(
            (animal) =>
              isCowCandidate(animal) &&
              animal.reproductiveStatus?.toLowerCase() === 'pregnant'
          );
          return [...inseminated, ...pregnant];
        }
        default:
          return [];
      }
    };

    const stageFiltered = filterByStage();

    if (!search) return stageFiltered;

    return stageFiltered.filter((animal) => {
      const manualId = animal.manualId?.toLowerCase() ?? '';
      const manualIdNumbers = manualId.replace(/\D/g, '');
      return (
        manualId.includes(search) ||
        (numericSearch && manualIdNumbers.includes(numericSearch))
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        stage: currentStage,
        date: stageDates[currentStage] || formData.date,
        ecc: formData.ecc ? parseFloat(formData.ecc) : undefined,
        id: editingId,
      };

      const response = await fetch('/api/reproduction-management', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchData();
        setEditingId(null);
        setFormData({
          animalId: '',
          date: '',
          protocolo: false,
          implant: '',
          obs: '',
          ecc: '',
          touroId: '',
          touroType: 'internal',
          partida: '',
          cio: '',
          ressinc: false,
          newReproductiveStatus: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDateChange = (date: string) => {
    setStageDates((prev) => ({ ...prev, [currentStage]: date }));
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleStageChange = (stage: typeof currentStage) => {
    setCurrentStage(stage);
    setEditingId(null);
    setAnimalSearch('');
    setFormData((prev) => ({
      ...prev,
      date: stageDates[stage] || '',
    }));
  };

  useEffect(() => {
    if (editingId) return;

    setFormData((prev) => ({
      ...prev,
      date: stageDates[currentStage] || '',
    }));
    setAnimalSearch('');
  }, [currentStage, stageDates, editingId]);

  const handleEdit = (management: ReproductionManagement) => {
    const d = new Date(management.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setEditingId(management.id);
    setFormData({
      animalId: management.animalId,
      date: formattedDate,
      protocolo: management.protocolo ?? false,
      implant: management.implant ?? '',
      obs: management.obs ?? '',
      ecc: management.ecc?.toString() ?? '',
      touroId: management.touroId ?? '',
      touroType: management.touroType ?? 'internal',
      partida: management.partida ?? '',
      cio: management.cio ?? '',
      ressinc: management.ressinc ?? false,
      newReproductiveStatus: management.newReproductiveStatus ?? '',
    });

    if (currentStage !== management.stage) {
      setCurrentStage(management.stage);
    }
  };

  const renderForm = () => {
    const filteredAnimals = getFilteredAnimals();
    const selectedAnimal = animals.find((a) => a.id === formData.animalId);
    const internalSire = animals.find(
      (a) =>
        a.id === selectedAnimal?.bullId ||
        a.id === selectedAnimal?.bullIatfId ||
        a.id === selectedAnimal?.fatherId
    );
    const externalSire = externalBulls.find(
      (bull) =>
        bull.id === selectedAnimal?.externalBullId ||
        bull.id === selectedAnimal?.externalBullIatfId
    );
    const sireLabel = internalSire?.manualId ?? externalSire?.name ?? 'N/A';

    if (currentStage === 'DG') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>DG - Atualizar status</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Data do manejo</Label>
                <Input
                  id="date"
                  type="date"
                  value={stageDates[currentStage] || formData.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleDateChange(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="animalSearch">Buscar animal</Label>
                <Input
                  id="animalSearch"
                  value={animalSearch}
                  placeholder="Digite parte do número (ex: 10)"
                  onChange={(e) => setAnimalSearch(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="animal">Animal</Label>
                <Select
                  value={formData.animalId}
                  onValueChange={(value: string) => {
                    const selected = animals.find((a) => a.id === value);
                    setFormData({
                      ...formData,
                      animalId: value,
                      ecc: selected?.bodyConditionScore
                        ? String(selected.bodyConditionScore)
                        : '',
                      obs: selected?.observations ?? '',
                      newReproductiveStatus:
                        selected?.reproductiveStatus &&
                        ['pregnant', 'empty', 'open'].includes(
                          selected.reproductiveStatus
                        )
                          ? selected.reproductiveStatus
                          : '',
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredAnimals.map((animal) => {
                      const isPregnant =
                        animal.reproductiveStatus === 'pregnant';
                      return (
                        <SelectItem
                          key={animal.id}
                          value={animal.id}
                          disabled={isPregnant}
                        >
                          {animal.manualId} -{' '}
                          {translateCategory(animal.category)} -{' '}
                          {animal.reproductiveStatus}{' '}
                          {isPregnant ? '(prenho)' : ''}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {formData.animalId && (
                <div className="space-y-2">
                  <h4 className="font-medium">Informações atuais:</h4>
                  <div className="text-sm text-gray-600">
                    Status: {selectedAnimal?.reproductiveStatus || 'N/A'} | ECC:{' '}
                    {selectedAnimal?.bodyConditionScore ?? 'N/A'} | Obs:{' '}
                    {selectedAnimal?.observations || 'N/A'}
                  </div>
                  {selectedAnimal?.reproductiveStatus === 'pregnant' && (
                    <div className="text-sm text-gray-600">
                      Tipo:{' '}
                      {selectedAnimal?.handlingType === 'naturalMating'
                        ? 'Monta'
                        : selectedAnimal?.handlingType ===
                            'artificialInsemination'
                          ? 'Inseminação'
                          : 'N/A'}{' '}
                      | Pai: {sireLabel}
                    </div>
                  )}
                  {(() => {
                    const animalManagements = managements.filter(
                      (m) => m.animalId === formData.animalId
                    );
                    return animalManagements.map((m) => (
                      <div key={m.id} className="text-sm text-gray-600">
                        {stageLabels[m.stage] || m.stage}: ECC {m.ecc},
                        Protocolo {m.protocolo ? 'Sim' : 'Não'}, Obs: {m.obs}
                      </div>
                    ));
                  })()}
                </div>
              )}

              <div>
                <Label htmlFor="status">Novo status reprodutivo</Label>
                <Select
                  value={formData.newReproductiveStatus}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, newReproductiveStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pregnant">Prenha</SelectItem>
                    <SelectItem value="empty">Vazia</SelectItem>
                    <SelectItem value="open">Aberta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ressinc"
                  checked={formData.ressinc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, ressinc: e.target.checked })
                  }
                />
                <Label htmlFor="ressinc">Ressinc</Label>
              </div>

              <div>
                <Label htmlFor="obs">Observações</Label>
                <Textarea
                  id="obs"
                  value={formData.obs}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, obs: e.target.value })
                  }
                  placeholder="Observações"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Atualizar' : 'Salvar'}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        animalId: '',
                        date: '',
                        protocolo: false,
                        implant: '',
                        obs: '',
                        ecc: '',
                        touroId: '',
                        touroType: 'internal',
                        partida: '',
                        cio: '',
                        ressinc: false,
                        newReproductiveStatus: '',
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento - {stageLabels[currentStage]}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="date">Data do manejo</Label>
              <Input
                id="date"
                type="date"
                value={stageDates[currentStage] || formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleDateChange(e.target.value)
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="animalSearch">Buscar animal</Label>
              <Input
                id="animalSearch"
                value={animalSearch}
                placeholder="Digite parte do número (ex: 10)"
                onChange={(e) => setAnimalSearch(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="animal">Animal</Label>
              <Select
                value={formData.animalId}
                onValueChange={(value: string) => {
                  const selected = animals.find((a) => a.id === value);
                  setFormData({
                    ...formData,
                    animalId: value,
                    ecc: selected?.bodyConditionScore
                      ? String(selected.bodyConditionScore)
                      : '',
                    obs: selected?.observations ?? '',
                    newReproductiveStatus:
                      selected?.reproductiveStatus &&
                      ['pregnant', 'empty', 'open'].includes(
                        selected.reproductiveStatus
                      )
                        ? selected.reproductiveStatus
                        : '',
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione animal" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAnimals.map((animal) => {
                    const isPregnant = animal.reproductiveStatus === 'pregnant';
                    const notParticipated =
                      currentStage === 'Insemination' &&
                      managements.some(
                        (m) =>
                          m.animalId === animal.id &&
                          m.stage === 'D0' &&
                          m.protocolo
                      ) &&
                      !managements.some(
                        (m) => m.animalId === animal.id && m.stage === 'Manejo'
                      );
                    return (
                      <SelectItem
                        key={animal.id}
                        value={animal.id}
                        disabled={isPregnant}
                        className={notParticipated ? 'opacity-50' : ''}
                      >
                        {animal.manualId} - {animal.reproductiveStatus}{' '}
                        {notParticipated ? '(não participou)' : ''}{' '}
                        {isPregnant ? '(prenha)' : ''}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {(currentStage === 'D0' ||
              currentStage === 'Manejo' ||
              currentStage === 'Insemination') && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="protocolo"
                  checked={formData.protocolo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, protocolo: e.target.checked })
                  }
                />
                <Label htmlFor="protocolo">Protocolo</Label>
              </div>
            )}

            {currentStage === 'D0' && (
              <div>
                <Label htmlFor="implant">Implante</Label>
                <Input
                  id="implant"
                  value={formData.implant}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, implant: e.target.value })
                  }
                  placeholder="Marca do implante"
                />
              </div>
            )}

            <div>
              <Label htmlFor="ecc">ECC</Label>
              <Input
                id="ecc"
                type="number"
                step="0.1"
                value={formData.ecc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, ecc: e.target.value })
                }
                placeholder="Condição corporal"
              />
            </div>

            {currentStage === 'Insemination' && (
              <>
                <div>
                  <Label htmlFor="touroType">Tipo de Touro</Label>
                  <Select
                    value={formData.touroType}
                    onValueChange={(value: 'internal' | 'external') =>
                      setFormData({
                        ...formData,
                        touroType: value,
                        touroId: '',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Interno</SelectItem>
                      <SelectItem value="external">Externo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="touro">Touro</Label>
                  <Select
                    value={formData.touroId}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, touroId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione touro" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.touroType === 'internal' &&
                        animals
                          .filter((a) => isMaleBull(a))
                          .map((animal) => (
                            <SelectItem key={animal.id} value={animal.id}>
                              {animal.manualId} -{' '}
                              {translateCategory(animal.category)}
                            </SelectItem>
                          ))}
                      {formData.touroType === 'external' &&
                        externalBulls.map((bull) => (
                          <SelectItem key={bull.id} value={bull.id}>
                            {bull.name} - {bull.breed}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="partida">Partida</Label>
                  <Input
                    id="partida"
                    value={formData.partida}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, partida: e.target.value })
                    }
                    placeholder="Código da partida"
                  />
                </div>

                <div>
                  <Label htmlFor="cio">CIO</Label>
                  <Input
                    id="cio"
                    value={formData.cio}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, cio: e.target.value })
                    }
                    placeholder="Informações do CIO"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="obs">Observações</Label>
              <Textarea
                id="obs"
                value={formData.obs}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, obs: e.target.value })
                }
                placeholder="Observações"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Atualizar' : 'Salvar'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      animalId: '',
                      date: '',
                      protocolo: false,
                      implant: '',
                      obs: '',
                      ecc: '',
                      touroId: '',
                      touroType: 'internal',
                      partida: '',
                      cio: '',
                      ressinc: false,
                      newReproductiveStatus: '',
                    });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderTable = () => {
    const stageManagements = managements.filter(
      (m) => m.stage === currentStage
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Registros - {stageLabels[currentStage]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse border border-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-background">
                    Animal
                  </TableHead>
                  <TableHead className="sticky top-0 bg-background">
                    Data
                  </TableHead>
                  <TableHead className="sticky top-0 bg-background">
                    ECC
                  </TableHead>
                  <TableHead className="sticky top-0 bg-background">
                    Protocolo
                  </TableHead>
                  <TableHead className="sticky top-0 bg-background">
                    Observações
                  </TableHead>
                  {currentStage === 'DG' && (
                    <TableHead className="sticky top-0 bg-background">
                      Contagem
                    </TableHead>
                  )}
                  <TableHead className="sticky top-0 bg-background">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stageManagements.map((management) => {
                  const isPregnant =
                    management.animal?.reproductiveStatus === 'pregnant';
                  return (
                    <TableRow
                      key={management.id}
                      className={isPregnant ? 'opacity-50' : ''}
                    >
                      <TableCell>{management.animal?.manualId}</TableCell>
                      <TableCell>
                        {format(new Date(management.date), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>{management.ecc}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            management.protocolo ? 'default' : 'secondary'
                          }
                        >
                          {management.protocolo ? 'Sim' : 'Não'}
                        </Badge>
                      </TableCell>
                      <TableCell>{management.obs}</TableCell>
                      {currentStage === 'DG' && (
                        <TableCell>{management.ressincCount}</TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(management)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        {(['D0', 'Manejo', 'Insemination', 'DG'] as const).map((stage) => (
          <Button
            key={stage}
            variant={currentStage === stage ? 'default' : 'outline'}
            onClick={() => handleStageChange(stage)}
          >
            {stageLabels[stage]}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {renderForm()}
        {renderTable()}
      </div>
    </div>
  );
};

export default ReproductionManagementPage;
