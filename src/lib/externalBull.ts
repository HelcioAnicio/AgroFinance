export const EXTERNAL_BULL_PREFIX = 'external:';

export function isExternalBullValue(value?: string | null): boolean {
  if (!value) return false;
  return value.startsWith(EXTERNAL_BULL_PREFIX);
}

export function extractExternalBullId(value?: string | null): string | null {
  if (!isExternalBullValue(value)) return null;
  return value!.slice(EXTERNAL_BULL_PREFIX.length) || null;
}

export function buildExternalBullValue(id: string): string {
  return `${EXTERNAL_BULL_PREFIX}${id}`;
}
