import { UNCLASSIFIED_ORIGIN } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type { PlantFilters } from '@/types/plant';
import type { Taxonomies, TaxonomyItem } from '@/types/taxonomy';

const RESULTS_COPY = copy.plants.results;

function nameOf(items: TaxonomyItem[], id: number | null) {
  return items.find((item) => item.id === id)?.name ?? null;
}

function originLabel(filters: PlantFilters, taxonomies: Taxonomies) {
  return filters.origin === UNCLASSIFIED_ORIGIN
    ? copy.plants.filters.unclassified
    : nameOf(taxonomies.origins, filters.origin);
}

function sizeLabel(filters: PlantFilters, taxonomies: Taxonomies) {
  const size = taxonomies.sizes.find((item) => item.id === filters.sizeId);
  return size ? (size.description ?? size.name) : null;
}

export function plantResultTitle(
  filters: PlantFilters,
  taxonomies: Taxonomies | null,
) {
  if (filters.query) {
    return formatCopy(RESULTS_COPY.searchTitle, { query: filters.query });
  }
  if (!taxonomies) {
    return RESULTS_COPY.allTitle;
  }
  const labels = [
    nameOf(taxonomies.plantTypes, filters.typeId),
    originLabel(filters, taxonomies),
    sizeLabel(filters, taxonomies),
    nameOf(taxonomies.imageViews, filters.viewId),
  ].filter((label) => label !== null);
  return labels.length > 0
    ? labels.join(RESULTS_COPY.titleSeparator)
    : RESULTS_COPY.allTitle;
}
