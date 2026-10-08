import type {
  FacetCounts,
  OriginFacetCounts,
  OriginFilter,
  PlantFacets,
  PlantFilters,
  PlantSortKey,
} from '@/types/plant';
import type { Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantSearchBarProps {
  query: string;
  onCommit: (query: string) => void;
}

export interface TypeFilterProps {
  types: TaxonomyItem[];
  facet: FacetCounts | undefined;
  value: number | null;
  onChange: (typeId: number | null) => void;
}

export interface OriginFilterOption {
  value: OriginFilter;
  label: string;
  count?: number;
}

export interface OriginFilterProps {
  origins: TaxonomyItem[];
  facet: OriginFacetCounts | undefined;
  value: OriginFilter;
  onChange: (origin: OriginFilter) => void;
}

export interface FacetFilterItem {
  id: number;
  label: string;
}

export interface SegmentedFacetFilterProps {
  label: string;
  items: FacetFilterItem[];
  facet: FacetCounts | undefined;
  value: number | null;
  onChange: (id: number | null) => void;
}

export interface PlantFiltersProps {
  taxonomies: Taxonomies;
  facets: PlantFacets | undefined;
  filters: PlantFilters;
  onChange: (patch: Partial<PlantFilters>) => void;
}

export interface PlantResultsHeaderProps {
  title: string;
  count: number | null;
  canClear: boolean;
  sort: PlantSortKey;
  onSortChange: (sort: PlantSortKey) => void;
  onClear: () => void;
}
