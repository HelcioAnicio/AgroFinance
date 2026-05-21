import { decrementExternalBullDosesForUsageDelta } from '@/lib/externalBullDoses';
import prisma from '@/lib/prisma';
import { createAuditLog, requireFarmContext } from '@/lib/tenant';
import { Prisma, WeightRecordType } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

type ImportRow = Record<string, unknown>;

type WeightEntry = {
  weight: number;
  measuredAt: Date;
  recordType: WeightRecordType;
};

type VaccineEntry = {
  name: string;
  date: Date;
  expiryDate: Date;
  description: string | null;
};

type DewormingEntry = {
  name: string;
  date: Date;
};

type ManagementEntry = {
  stage: string;
  date: Date;
  obs: string | null;
  ecc: number | null;
  protocolo: boolean | null;
};

type ParsedRow = {
  rowNumber: number;
  manualId: string;
  baseData: Partial<Prisma.AnimalUncheckedCreateInput>;
  statusChangeDate: Date | null;
  references: {
    fatherManualId: string | null;
    motherManualId: string | null;
    bullManualId: string | null;
    bullIatfManualId: string | null;
  };
  weights: WeightEntry[];
  vaccines: VaccineEntry[];
  dewormings: DewormingEntry[];
  managements: ManagementEntry[];
  issues: string[];
};

type ProcessedRow = {
  parsed: ParsedRow;
  animalId: string;
};

type AnimalLookup = {
  id: string;
  manualId: string;
  status: string;
  birthDate: Date;
  weight: number;
  ownerId: string;
  externalBullId: string | null;
  externalBullIatfId: string | null;
};

const EXCEL_UNIX_OFFSET = 25569;
const DAY_IN_MS = 86400 * 1000;

const REQUIRED_FIELDS_FOR_CREATE = [
  'gender',
  'birthDate',
  'weight',
  'breed',
] as const;

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizeKey(value: string): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function isBlank(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

function excelDateToJSDate(serial: number): Date {
  return new Date((serial - EXCEL_UNIX_OFFSET) * DAY_IN_MS);
}

function parseImportDate(value: unknown): Date | null {
  if (isBlank(value)) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'number') {
    const parsed = excelDateToJSDate(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) return null;

    const brMatch = raw.match(
      /^(\d{1,2})[/-]+(\d{1,2})[/-]+(\d{2,4})(?:\s+(\d{1,2}):(\d{2}))?$/
    );
    if (brMatch) {
      const day = Number(brMatch[1]);
      const month = Number(brMatch[2]) - 1;
      const yearRaw = Number(brMatch[3]);
      const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
      const hours = brMatch[4] ? Number(brMatch[4]) : 0;
      const minutes = brMatch[5] ? Number(brMatch[5]) : 0;
      const parsed = new Date(year, month, day, hours, minutes);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

function parseImportNumber(value: unknown): number | null {
  if (isBlank(value)) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  if (typeof value === 'string') {
    const raw = value.trim().replace(/\s/g, '');
    if (!raw) return null;

    const commaCount = (raw.match(/,/g) ?? []).length;
    const dotCount = (raw.match(/\./g) ?? []).length;
    let normalized = raw;

    if (commaCount > 0 && dotCount > 0) {
      if (raw.lastIndexOf(',') > raw.lastIndexOf('.')) {
        normalized = raw.replace(/\./g, '').replace(',', '.');
      } else {
        normalized = raw.replace(/,/g, '');
      }
    } else if (commaCount > 0) {
      normalized = raw.replace(',', '.');
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function parseImportBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value !== 'string') return null;

  const normalized = normalizeText(value);
  if (['true', '1', 'sim', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'nao', 'no'].includes(normalized)) return false;
  return null;
}

function parseListValue(value: unknown): string[] {
  if (isBlank(value)) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : String(item)))
      .filter((item) => item.length > 0);
  }

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) return [];

    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) =>
              typeof item === 'string' ? item.trim() : String(item)
            )
            .filter((item) => item.length > 0);
        }
      } catch {
        // Fallback to delimiter parsing.
      }
    }

    return raw
      .split(/[;\n]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [String(value)];
}

function parseStructuredItem(item: string): string[] {
  if (item.includes('|')) return item.split('|').map((part) => part.trim());
  if (item.includes('@')) return item.split('@').map((part) => part.trim());
  return [item.trim()];
}

function normalizeStatus(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['ativo', 'active'].includes(normalized)) return 'active';
  if (['inativo', 'inactive'].includes(normalized)) return 'inactive';
  if (['morto', 'dead'].includes(normalized)) return 'dead';
  if (['vendido', 'sold'].includes(normalized)) return 'sold';
  if (['perdida', 'perdido', 'lost'].includes(normalized)) return 'lost';
  if (['descarte', 'trash'].includes(normalized)) return 'trash';

  return null;
}

function normalizeGender(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['macho', 'male', 'm'].includes(normalized)) return 'male';
  if (['femea', 'female', 'f'].includes(normalized)) return 'female';

  return null;
}

function normalizeCategory(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['dependente', 'neonate'].includes(normalized)) return 'neonate';
  if (['bezerro', 'calf'].includes(normalized)) return 'calf';
  if (['novilho', 'garrote', 'steer'].includes(normalized)) return 'steer';
  if (['vaca', 'cow'].includes(normalized)) return 'cow';
  if (['vaca velha', 'old cow'].includes(normalized)) return 'old cow';
  if (['boi', 'ox'].includes(normalized)) return 'ox';
  if (['boi velho', 'old ox'].includes(normalized)) return 'old ox';
  if (['touro', 'bull'].includes(normalized)) return 'bull';

  return null;
}

function normalizeReproductiveStatus(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['vazio', 'empty'].includes(normalized)) return 'empty';
  if (['prenha', 'pregnant'].includes(normalized)) return 'pregnant';
  if (['espera', 'waiting'].includes(normalized)) return 'waiting';
  if (['pev'].includes(normalized)) return 'pev';

  return null;
}

function normalizeHandlingType(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (
    ['monta natural', 'naturalmating', 'natural mating'].includes(normalized)
  ) {
    return 'naturalMating';
  }

  if (
    [
      'inseminacao artificial',
      'artificialinsemination',
      'artificial insemination',
    ].includes(normalized)
  ) {
    return 'artificialInsemination';
  }

  if (['todos os metodos', 'allmethods', 'all methods'].includes(normalized)) {
    return 'allMethods';
  }

  return null;
}

function normalizeProtocol(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['3 manejos', '3 handlings'].includes(normalized)) return '3 handlings';
  if (['4 manejos', '4 handlings'].includes(normalized)) return '4 handlings';
  if (['misto', 'mixed'].includes(normalized)) return 'mixed';

  return null;
}

function normalizeAndrological(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['positivo', 'positive'].includes(normalized)) return 'positive';
  if (['negativo', 'negative'].includes(normalized)) return 'negative';
  if (['nao realizado', 'notdone', 'not done'].includes(normalized)) {
    return 'notDone';
  }

  return null;
}

function normalizeWeightRecordType(value: unknown): WeightRecordType {
  if (typeof value !== 'string') return 'OTHER';
  const normalized = normalizeText(value).toUpperCase();
  if (normalized === 'PN') return 'PN';
  if (normalized === 'PS') return 'PS';
  if (normalized === 'PD') return 'PD';
  if (normalized === 'PA') return 'PA';
  return 'OTHER';
}

function normalizeManagementStage(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = normalizeText(value);

  if (['d0'].includes(normalized)) return 'D0';
  if (['manejo', 'management'].includes(normalized)) return 'Manejo';
  if (['inseminacao', 'insemination'].includes(normalized)) {
    return 'Insemination';
  }
  if (['dg'].includes(normalized)) return 'DG';

  return null;
}

function cleanString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function makeRowAccessor(row: ImportRow) {
  const normalizedEntries = new Map<string, unknown>();

  for (const [key, value] of Object.entries(row)) {
    const normalized = normalizeKey(key);
    if (!normalizedEntries.has(normalized)) {
      normalizedEntries.set(normalized, value);
    }
  }

  const get = (...aliases: string[]) => {
    for (const alias of aliases) {
      const value = normalizedEntries.get(normalizeKey(alias));
      if (!isBlank(value)) return value;
    }

    return null;
  };

  return { get };
}

function parseRow(row: ImportRow, rowNumber: number): ParsedRow {
  const { get } = makeRowAccessor(row);
  const issues: string[] = [];

  const manualIdRaw = get(
    'manualId',
    'idManual',
    'id',
    'brinco',
    'numero',
    'idBrinco',
    'idbrinco',
    'ID / Brinco *'
  );
  const manualId =
    typeof manualIdRaw === 'string'
      ? manualIdRaw.trim().toLowerCase()
      : manualIdRaw !== null
        ? String(manualIdRaw).trim().toLowerCase()
        : '';

  if (!manualId) {
    issues.push('manualId obrigatorio para identificar o animal.');
  }

  const baseData: Partial<Prisma.AnimalUncheckedCreateInput> = {
    manualId,
  };

  const status = normalizeStatus(get('status', 'situacao', 'Status'));
  if (status) baseData.status = status;

  const gender = normalizeGender(get('gender', 'sexo', 'Sexo *', 'Sexo'));
  if (gender) baseData.gender = gender;

  const birthDate = parseImportDate(
    get('birthDate', 'dataNascimento', 'Data Nascimento *', 'Data Nascimento')
  );
  if (birthDate) baseData.birthDate = birthDate;

  const weight = parseImportNumber(
    get(
      'weight',
      'peso',
      'pesoAtual',
      'pesoAtualKg',
      'Peso Atual (kg) *',
      'Peso Atual (kg)',
      'Peso Atual'
    )
  );
  if (weight !== null) baseData.weight = weight;

  const breedRaw = cleanString(get('breed', 'raca', 'Raça *', 'Raça'));
  if (breedRaw) baseData.breed = breedRaw.toLowerCase();

  const category = normalizeCategory(get('category', 'categoria', 'Categoria'));
  if (category) baseData.category = category;

  const reproductiveStatus = normalizeReproductiveStatus(
    get('reproductiveStatus', 'statusReprodutivo', 'Status Reprodutivo')
  );
  if (reproductiveStatus) baseData.reproductiveStatus = reproductiveStatus;

  const handlingType = normalizeHandlingType(
    get('handlingType', 'tipoManejo', 'tipoDeManejo', 'Tipo de Manejo')
  );
  if (handlingType) baseData.handlingType = handlingType;

  const protocol = normalizeProtocol(get('protocol', 'protocolo', 'Protocolo'));
  if (protocol) baseData.protocol = protocol;

  const andrological = normalizeAndrological(
    get('andrological', 'andrologico', 'Andrológico')
  );
  if (andrological) baseData.andrological = andrological;

  const expectedDueDate = parseImportDate(
    get(
      'expectedDueDate',
      'dataPrevistaParto',
      'dataPrevParto',
      'Data Prev. Parto'
    )
  );
  if (expectedDueDate) baseData.expectedDueDate = expectedDueDate;

  const fetalGender = normalizeGender(
    get('fetalGender', 'sexoFeto', 'sexoDoFeto', 'Sexo do Feto')
  );
  if (fetalGender) baseData.fetalGender = fetalGender;

  const bodyConditionScore = parseImportNumber(
    get('bodyConditionScore', 'ecc', 'ECC')
  );
  if (bodyConditionScore !== null)
    baseData.bodyConditionScore = bodyConditionScore;

  const observations = cleanString(
    get('observations', 'observacoes', 'obs', 'Observações')
  );
  if (observations) baseData.observations = observations;

  const externalBullId = cleanString(get('externalBullId'));
  if (externalBullId) baseData.externalBullId = externalBullId;

  const externalBullIatfId = cleanString(get('externalBullIatfId'));
  if (externalBullIatfId) baseData.externalBullIatfId = externalBullIatfId;

  const vaccineName = cleanString(
    get('vaccineName', 'nomeVacina', 'Nome Vacina')
  );
  const vaccineDate = parseImportDate(
    get('vaccineDate', 'dataVacina', 'Data Vacina', 'Data Vacinação')
  );
  const vaccineExpiry = parseImportDate(
    get(
      'vaccineExpiry',
      'vencimentoVacina',
      'Vencimento Vacina',
      'Vencim Vacina',
      'Vencim. Vacina',
      'Venc. Vacina'
    )
  );
  if (vaccineName) baseData.vaccineName = vaccineName;
  if (vaccineDate) baseData.vaccineDate = vaccineDate;
  if (vaccineExpiry) baseData.vaccineExpiry = vaccineExpiry;

  const dewormingName = cleanString(get('dewormingName', 'nomeVermifugo'));
  const dewormingDate = parseImportDate(get('dewormingDate', 'dataVermifugo'));
  const dewormingExpiry = parseImportDate(
    get(
      'dewormingExpiry',
      'vencimentoVermifugo',
      'Vencimento Vermifugo',
      'Vencim Vermifugo',
      'Vencim. Vermifugo',
      'Venc. Vermifugo'
    )
  );
  if (dewormingName) baseData.dewormingName = dewormingName;
  if (dewormingDate) baseData.dewormingDate = dewormingDate;
  if (dewormingExpiry) baseData.dewormingExpiry = dewormingExpiry;

  const statusChangeDate = parseImportDate(
    get('statusChangeDate', 'status_change_date', 'dataAlteracaoStatus')
  );

  const references = {
    fatherManualId:
      cleanString(
        get('fatherId', 'paiId', 'idPai', 'idDoPai')
      )?.toLowerCase() ?? null,
    motherManualId:
      cleanString(
        get('motherId', 'maeId', 'idMae', 'idDaMae')
      )?.toLowerCase() ?? null,
    bullManualId:
      cleanString(
        get('bullId', 'touroId', 'idTouro', 'idTouroCobertura')
      )?.toLowerCase() ?? null,
    bullIatfManualId:
      cleanString(
        get('bullIatfId', 'touroIatfId', 'idTouroIatf')
      )?.toLowerCase() ?? null,
  };

  const defaultWeightDate =
    parseImportDate(get('weightRecordDate', 'dataPeso', 'dataPesagem')) ??
    new Date();
  const defaultWeightType = normalizeWeightRecordType(
    get('weightRecordType', 'tipoPeso')
  );

  const weights: WeightEntry[] = [];
  if (weight !== null) {
    weights.push({
      weight,
      measuredAt: defaultWeightDate,
      recordType: defaultWeightType,
    });
  }

  const weightList = parseListValue(
    get(
      'weightHistories',
      'historicoPeso',
      'pesos',
      'weightHistory',
      'Histórico de Pesos'
    )
  );

  for (const item of weightList) {
    const parts = parseStructuredItem(item);
    const entryWeight = parseImportNumber(parts[0]);
    const entryDate = parts[1] ? parseImportDate(parts[1]) : defaultWeightDate;
    const entryType = parts[2]
      ? normalizeWeightRecordType(parts[2])
      : defaultWeightType;

    if (entryWeight === null || !entryDate) {
      issues.push(`historico de peso invalido: "${item}".`);
      continue;
    }

    weights.push({
      weight: entryWeight,
      measuredAt: entryDate,
      recordType: entryType,
    });
  }

  const vaccines: VaccineEntry[] = [];
  if (vaccineName && vaccineDate && vaccineExpiry) {
    vaccines.push({
      name: vaccineName,
      date: vaccineDate,
      expiryDate: vaccineExpiry,
      description: null,
    });
  }

  const vaccineList = parseListValue(
    get('vaccines', 'vacinas', 'vaccineHistory')
  );
  for (const item of vaccineList) {
    const parts = parseStructuredItem(item);
    const name = cleanString(parts[0]);
    const date = parts[1] ? parseImportDate(parts[1]) : null;
    const expiryDate = parts[2] ? parseImportDate(parts[2]) : null;
    const description = cleanString(parts[3]);

    if (!name || !date || !expiryDate) {
      issues.push(`registro de vacina invalido: "${item}".`);
      continue;
    }

    vaccines.push({
      name,
      date,
      expiryDate,
      description,
    });
  }

  const dewormings: DewormingEntry[] = [];
  if (dewormingName && dewormingDate) {
    dewormings.push({ name: dewormingName, date: dewormingDate });
  }

  const dewormingList = parseListValue(
    get('dewormings', 'vermifugos', 'historicoVermifugo')
  );
  for (const item of dewormingList) {
    const parts = parseStructuredItem(item);
    const name = cleanString(parts[0]);
    const date = parts[1] ? parseImportDate(parts[1]) : null;

    if (!name || !date) {
      issues.push(`registro de vermifugo invalido: "${item}".`);
      continue;
    }

    dewormings.push({ name, date });
  }

  const managements: ManagementEntry[] = [];
  const managementList = parseListValue(
    get('managements', 'manejos', 'historicoManejo')
  );

  for (const item of managementList) {
    const parts = parseStructuredItem(item);
    const stage = normalizeManagementStage(parts[0]);
    const date = parts[1] ? parseImportDate(parts[1]) : null;
    const obs = cleanString(parts[2]);
    const ecc = parseImportNumber(parts[3]);
    const protocolo = parseImportBoolean(parts[4]);

    if (!stage || !date) {
      issues.push(`registro de manejo invalido: "${item}".`);
      continue;
    }

    managements.push({
      stage,
      date,
      obs,
      ecc,
      protocolo,
    });
  }

  return {
    rowNumber,
    manualId,
    baseData,
    statusChangeDate,
    references,
    weights,
    vaccines,
    dewormings,
    managements,
    issues,
  };
}

function hasCreateRequiredData(
  baseData: Partial<Prisma.AnimalUncheckedCreateInput>
): boolean {
  return REQUIRED_FIELDS_FOR_CREATE.every((field) => !isBlank(baseData[field]));
}

function buildStatusChangeDate(
  nextStatus: string,
  birthDate: Date,
  providedDate: Date | null
): Date {
  if (nextStatus === 'active') return new Date(birthDate);
  return providedDate ?? new Date();
}

async function ensureWeightHistories(
  tx: Prisma.TransactionClient,
  animalId: string,
  entries: WeightEntry[]
) {
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = `${entry.weight}|${entry.recordType}|${entry.measuredAt.toISOString()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const existing = await tx.animalWeightHistory.findFirst({
      where: {
        animalId,
        weight: entry.weight,
        recordType: entry.recordType,
        measuredAt: entry.measuredAt,
      },
      select: { id: true },
    });

    if (!existing) {
      await tx.animalWeightHistory.create({
        data: {
          animalId,
          weight: entry.weight,
          recordType: entry.recordType,
          measuredAt: entry.measuredAt,
        },
      });
    }
  }
}

async function ensureVaccines(
  tx: Prisma.TransactionClient,
  animalId: string,
  entries: VaccineEntry[]
) {
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = `${entry.name.toLowerCase()}|${entry.date.toISOString()}|${entry.expiryDate.toISOString()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const existing = await tx.vaccine.findFirst({
      where: {
        animalId,
        name: entry.name,
        date: entry.date,
        expiryDate: entry.expiryDate,
      },
      select: { id: true },
    });

    if (!existing) {
      await tx.vaccine.create({
        data: {
          id: uuidv4(),
          animalId,
          name: entry.name,
          date: entry.date,
          expiryDate: entry.expiryDate,
          description: entry.description,
        },
      });
    }
  }
}

async function ensureDewormings(
  tx: Prisma.TransactionClient,
  animalId: string,
  entries: DewormingEntry[]
) {
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = `${entry.name.toLowerCase()}|${entry.date.toISOString()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const existing = await tx.deworming.findFirst({
      where: {
        animalId,
        name: entry.name,
        date: entry.date,
      },
      select: { id: true },
    });

    if (!existing) {
      await tx.deworming.create({
        data: {
          id: uuidv4(),
          animalId,
          name: entry.name,
          date: entry.date,
        },
      });
    }
  }
}

async function ensureManagements(
  tx: Prisma.TransactionClient,
  animalId: string,
  entries: ManagementEntry[]
) {
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = `${entry.stage}|${entry.date.toISOString()}|${entry.obs ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const existing = await tx.reproductionManagement.findFirst({
      where: {
        animalId,
        stage: entry.stage,
        date: entry.date,
      },
      select: { id: true },
    });

    if (!existing) {
      await tx.reproductionManagement.create({
        data: {
          animalId,
          stage: entry.stage,
          date: entry.date,
          obs: entry.obs,
          ecc: entry.ecc,
          protocolo: entry.protocolo,
        },
      });
    }
  }
}

function pickLookupByManual(
  map: Map<string, AnimalLookup>,
  manualId: string | null
): AnimalLookup | null {
  if (!manualId) return null;
  return map.get(manualId.toLowerCase()) ?? null;
}

export async function POST(req: Request) {
  const { context, error, status } = await requireFarmContext('manage_animals');

  if (!context) {
    return NextResponse.json({ success: false, error }, { status });
  }
  const ownerId = context.farm.ownerUserId;

  try {
    const body = await req.json();
    const rows = Array.isArray(body) ? body : [body];

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nenhuma linha para importar.' },
        { status: 400 }
      );
    }

    const parsedRows = rows.map((row, index) =>
      parseRow((row ?? {}) as ImportRow, index + 2)
    );

    console.log('[Import API] Total rows received:', rows.length);
    if (rows.length > 0) {
      console.log('[Import API] First row keys:', Object.keys(rows[0] ?? {}));
      console.log(
        '[Import API] First row sample:',
        JSON.stringify(rows[0]).slice(0, 500)
      );
    }

    const issues: Array<{ row: number; message: string }> = [];

    const summary = await prisma.$transaction(async (tx) => {
      const existingAnimals = await tx.animal.findMany({
        where: { farmId: context.farm.id },
        select: {
          id: true,
          manualId: true,
          status: true,
          birthDate: true,
          weight: true,
          ownerId: true,
          externalBullId: true,
          externalBullIatfId: true,
        },
      });

      const animalsByManual = new Map<string, AnimalLookup>();
      for (const animal of existingAnimals) {
        animalsByManual.set(animal.manualId.toLowerCase(), animal);
      }

      const processedRows: ProcessedRow[] = [];
      let created = 0;
      let updated = 0;
      let skipped = 0;

      for (const parsed of parsedRows) {
        if (!parsed.manualId) {
          skipped += 1;
          for (const message of parsed.issues) {
            issues.push({ row: parsed.rowNumber, message });
          }
          continue;
        }

        const existing = animalsByManual.get(parsed.manualId);
        const dataForMutation = { ...parsed.baseData };

        delete dataForMutation.id;
        delete dataForMutation.ownerId;
        delete dataForMutation.fatherId;
        delete dataForMutation.motherId;
        delete dataForMutation.bullId;
        delete dataForMutation.bullIatfId;

        if (existing) {
          const nextExternalBullId =
            typeof dataForMutation.externalBullId === 'string'
              ? dataForMutation.externalBullId
              : dataForMutation.externalBullId === null
                ? null
                : existing.externalBullId;

          const nextExternalBullIatfId =
            typeof dataForMutation.externalBullIatfId === 'string'
              ? dataForMutation.externalBullIatfId
              : dataForMutation.externalBullIatfId === null
                ? null
                : existing.externalBullIatfId;

          const hasDoseImpact =
            existing.externalBullId !== nextExternalBullId ||
            existing.externalBullIatfId !== nextExternalBullIatfId;

          if (hasDoseImpact) {
            await decrementExternalBullDosesForUsageDelta(
              tx,
              ownerId,
              [existing.externalBullId, existing.externalBullIatfId],
              [nextExternalBullId, nextExternalBullIatfId]
            );
          }

          const updatedAnimal =
            Object.keys(dataForMutation).length > 0
              ? await tx.animal.update({
                  where: { id: existing.id },
                  data: { ...dataForMutation, farmId: context.farm.id },
                  select: {
                    id: true,
                    manualId: true,
                    status: true,
                    birthDate: true,
                    weight: true,
                    ownerId: true,
                    externalBullId: true,
                    externalBullIatfId: true,
                  },
                })
              : existing;

          const nextStatus =
            typeof dataForMutation.status === 'string'
              ? dataForMutation.status
              : existing.status;

          if (nextStatus !== existing.status) {
            const changedAt = buildStatusChangeDate(
              nextStatus,
              updatedAnimal.birthDate,
              parsed.statusChangeDate
            );

            await tx.animalStatusHistory.create({
              data: {
                animalId: updatedAnimal.id,
                ownerId: updatedAnimal.ownerId,
                previousStatus: existing.status,
                newStatus: nextStatus,
                changedAt,
                year: changedAt.getFullYear(),
                month: changedAt.getMonth() + 1,
                reason: 'animal_import_update',
              },
            });
          }

          animalsByManual.set(parsed.manualId, updatedAnimal);
          processedRows.push({ parsed, animalId: updatedAnimal.id });
          updated += 1;
          await createAuditLog(tx, {
            farmId: context.farm.id,
            actorUserId: context.user.id,
            action: 'animal.import_update',
            entityType: 'Animal',
            entityId: updatedAnimal.id,
            after: JSON.parse(JSON.stringify(updatedAnimal)),
          });
        } else {
          if (!hasCreateRequiredData(dataForMutation)) {
            skipped += 1;
            for (const field of REQUIRED_FIELDS_FOR_CREATE) {
              if (isBlank(dataForMutation[field])) {
                issues.push({
                  row: parsed.rowNumber,
                  message: `${field} obrigatorio para criar novo animal.`,
                });
              }
            }
            for (const message of parsed.issues) {
              issues.push({ row: parsed.rowNumber, message });
            }
            continue;
          }

          const status =
            typeof dataForMutation.status === 'string'
              ? dataForMutation.status
              : 'active';

          const createData: Prisma.AnimalUncheckedCreateInput = {
            id: uuidv4(),
            ownerId,
            farmId: context.farm.id,
            manualId: parsed.manualId,
            status,
            gender: String(dataForMutation.gender),
            birthDate: new Date(dataForMutation.birthDate as Date),
            weight: Number(dataForMutation.weight),
            breed: String(dataForMutation.breed),
            category: String(dataForMutation.category ?? 'bull'),
            reproductiveStatus:
              (dataForMutation.reproductiveStatus as
                | string
                | null
                | undefined) ?? null,
            handlingType:
              (dataForMutation.handlingType as string | null | undefined) ??
              null,
            protocol:
              (dataForMutation.protocol as string | null | undefined) ?? null,
            andrological:
              (dataForMutation.andrological as string | null | undefined) ??
              null,
            expectedDueDate:
              (dataForMutation.expectedDueDate as Date | null | undefined) ??
              null,
            fetalGender:
              (dataForMutation.fetalGender as string | null | undefined) ??
              null,
            bodyConditionScore:
              (dataForMutation.bodyConditionScore as
                | number
                | null
                | undefined) ?? null,
            observations:
              (dataForMutation.observations as string | null | undefined) ??
              null,
            vaccineName:
              (dataForMutation.vaccineName as string | null | undefined) ??
              null,
            vaccineDate:
              (dataForMutation.vaccineDate as Date | null | undefined) ?? null,
            vaccineExpiry:
              (dataForMutation.vaccineExpiry as Date | null | undefined) ??
              null,
            dewormingName:
              (dataForMutation.dewormingName as string | null | undefined) ??
              null,
            dewormingDate:
              (dataForMutation.dewormingDate as Date | null | undefined) ??
              null,
            dewormingExpiry:
              (dataForMutation.dewormingExpiry as Date | null | undefined) ??
              null,
            externalBullId:
              (dataForMutation.externalBullId as string | null | undefined) ??
              null,
            externalBullIatfId:
              (dataForMutation.externalBullIatfId as
                | string
                | null
                | undefined) ?? null,
          };

          await decrementExternalBullDosesForUsageDelta(
            tx,
            ownerId,
            [],
            [createData.externalBullId, createData.externalBullIatfId]
          );

          const createdAnimal = await tx.animal.create({
            data: createData,
            select: {
              id: true,
              manualId: true,
              status: true,
              birthDate: true,
              weight: true,
              ownerId: true,
              externalBullId: true,
              externalBullIatfId: true,
            },
          });

          const changedAt = buildStatusChangeDate(
            createdAnimal.status,
            createdAnimal.birthDate,
            parsed.statusChangeDate
          );

          await tx.animalStatusHistory.create({
            data: {
              animalId: createdAnimal.id,
              ownerId: createdAnimal.ownerId,
              previousStatus: null,
              newStatus: createdAnimal.status,
              changedAt,
              year: changedAt.getFullYear(),
              month: changedAt.getMonth() + 1,
              reason: 'animal_import_create',
            },
          });

          animalsByManual.set(parsed.manualId, createdAnimal);
          processedRows.push({ parsed, animalId: createdAnimal.id });
          created += 1;
          await createAuditLog(tx, {
            farmId: context.farm.id,
            actorUserId: context.user.id,
            action: 'animal.import_create',
            entityType: 'Animal',
            entityId: createdAnimal.id,
            after: JSON.parse(JSON.stringify(createdAnimal)),
          });
        }

        for (const message of parsed.issues) {
          issues.push({ row: parsed.rowNumber, message });
        }
      }

      for (const processed of processedRows) {
        const { parsed, animalId } = processed;

        const father = pickLookupByManual(
          animalsByManual,
          parsed.references.fatherManualId
        );
        const mother = pickLookupByManual(
          animalsByManual,
          parsed.references.motherManualId
        );
        const bull = pickLookupByManual(
          animalsByManual,
          parsed.references.bullManualId
        );
        const bullIatf = pickLookupByManual(
          animalsByManual,
          parsed.references.bullIatfManualId
        );

        const relationData: Prisma.AnimalUncheckedUpdateInput = {};

        if (parsed.references.fatherManualId) {
          if (father) relationData.fatherId = father.id;
          else {
            issues.push({
              row: parsed.rowNumber,
              message: `pai nao encontrado: ${parsed.references.fatherManualId}.`,
            });
          }
        }

        if (parsed.references.motherManualId) {
          if (mother) relationData.motherId = mother.id;
          else {
            issues.push({
              row: parsed.rowNumber,
              message: `mae nao encontrada: ${parsed.references.motherManualId}.`,
            });
          }
        }

        if (parsed.references.bullManualId) {
          if (bull) relationData.bullId = bull.id;
          else {
            issues.push({
              row: parsed.rowNumber,
              message: `touro nao encontrado: ${parsed.references.bullManualId}.`,
            });
          }
        }

        if (parsed.references.bullIatfManualId) {
          if (bullIatf) relationData.bullIatfId = bullIatf.id;
          else {
            issues.push({
              row: parsed.rowNumber,
              message: `touro IATF nao encontrado: ${parsed.references.bullIatfManualId}.`,
            });
          }
        }

        if (Object.keys(relationData).length > 0) {
          await tx.animal.update({
            where: { id: animalId },
            data: relationData,
          });
        }

        await ensureWeightHistories(tx, animalId, parsed.weights);
        await ensureVaccines(tx, animalId, parsed.vaccines);
        await ensureDewormings(tx, animalId, parsed.dewormings);
        await ensureManagements(tx, animalId, parsed.managements);
      }

      return {
        total: parsedRows.length,
        created,
        updated,
        skipped,
      };
    });

    const importedCount = summary.created + summary.updated;

    return NextResponse.json(
      {
        success: importedCount > 0,
        summary,
        issues,
        ...(importedCount === 0 && rows.length > 0
          ? { receivedKeys: Object.keys(rows[0] ?? {}) }
          : {}),
      },
      { status: importedCount > 0 ? 200 : 400 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('EXTERNAL_BULL_DOSES_UNAVAILABLE')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nao ha doses suficientes para o touro externo selecionado.',
        },
        { status: 400 }
      );
    }

    console.error('Erro ao importar animais:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno na importacao.' },
      { status: 500 }
    );
  }
}
