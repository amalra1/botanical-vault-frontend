import { COLLECTION_LOCALE } from '@/constants/collections';
import type { SizeCoverage, StaircaseStatus } from '@/types/collection';

const listFormat = new Intl.ListFormat(COLLECTION_LOCALE, {
  type: 'conjunction',
});

export function staircaseLevel(sizeId: number, coverage: SizeCoverage[]) {
  return Math.max(
    coverage.findIndex((size) => size.id === sizeId),
    0,
  );
}

export function staircaseStatus(coverage: SizeCoverage[]): StaircaseStatus {
  const missing = coverage
    .filter((size) => !size.covered)
    .map((size) => size.name.toLocaleLowerCase(COLLECTION_LOCALE));
  return { isComplete: missing.length === 0, missing };
}

export function formatMissingSizes(missing: string[]) {
  return listFormat.format(missing);
}
