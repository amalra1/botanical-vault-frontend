import type { FacetCounts } from '@/types/plant';

const NO_PLANTS = 0;

export function facetCount(facet: FacetCounts | undefined, id: number) {
  return facet?.options.find((option) => option.id === id)?.count ?? NO_PLANTS;
}
