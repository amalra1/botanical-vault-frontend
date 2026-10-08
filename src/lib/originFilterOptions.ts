import { UNCLASSIFIED_ORIGIN } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import type { SelectOption } from '@/types/components/ui';
import type { OriginFilter } from '@/types/plant';
import type { TaxonomyItem } from '@/types/taxonomy';

const FILTERS_COPY = copy.plants.filters;

export function buildOriginOptions(
  origins: TaxonomyItem[],
): SelectOption<OriginFilter>[] {
  return [
    { value: null, label: FILTERS_COPY.all },
    ...origins.map((origin) => ({ value: origin.id, label: origin.name })),
    { value: UNCLASSIFIED_ORIGIN, label: FILTERS_COPY.unclassified },
  ];
}

export function originOptionLabel(
  options: SelectOption<OriginFilter>[],
  value: OriginFilter,
) {
  return (
    options.find((option) => option.value === value)?.label ?? FILTERS_COPY.all
  );
}
