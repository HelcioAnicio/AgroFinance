import { WeightRecordType } from '@/types/animal';

export const DEFAULT_WEIGHT_RECORD_TYPE: WeightRecordType = 'OTHER';

export const weightRecordOptions: Array<{
  value: WeightRecordType;
  label: string;
}> = [
  { value: 'PN', label: 'PN - Peso ao nascimento' },
  { value: 'PS', label: 'PS - Peso sobre ano' },
  { value: 'PD', label: 'PD - Peso desmama' },
  { value: 'PA', label: 'PA - Peso ao abate' },
  { value: 'OTHER', label: 'Outro registro' },
];

export const parseWeightRecordType = (value: unknown): WeightRecordType => {
  if (
    value === 'PN' ||
    value === 'PS' ||
    value === 'PD' ||
    value === 'PA' ||
    value === 'OTHER'
  ) {
    return value;
  }

  return DEFAULT_WEIGHT_RECORD_TYPE;
};

export const parseWeightRecordDate = (value: unknown): Date => {
  if (typeof value === 'string' || value instanceof Date) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return new Date();
};

export const weightRecordTypeLabel = (type?: WeightRecordType): string => {
  const option = weightRecordOptions.find((item) => item.value === type);
  return option?.label ?? 'Outro registro';
};
