import type { TaxonomyItem } from '@/types/taxonomy';

export function selectedOriginsLabel(
  origins: TaxonomyItem[],
  selectedIds: number[],
  noneLabel: string,
  separator: string,
) {
  const names = origins
    .filter((origin) => selectedIds.includes(origin.id))
    .map((origin) => origin.name);
  return names.length > 0 ? names.join(separator) : noneLabel;
}
