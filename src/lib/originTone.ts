import { ORIGIN_TONE_COUNT } from '@/constants/plantFilters';
import type { TaxonomyItem } from '@/types/taxonomy';

const FIRST_TONE = 0;

export function originTone(originId: number, origins: TaxonomyItem[]) {
  const index = origins.findIndex((origin) => origin.id === originId);
  return index < 0 ? FIRST_TONE : index % ORIGIN_TONE_COUNT;
}
