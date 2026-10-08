import type { OriginFilter, PlantFilters, PlantSortKey } from '@/types/plant';
import type { Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantSearchBarProps {
  query: string;
  onCommit: (query: string) => void;
}

export interface TypeFilterProps {
  types: TaxonomyItem[];
  value: number | null;
  onChange: (typeId: number | null) => void;
}

export interface OriginFilterOption {
  value: OriginFilter;
  label: string;
}

export interface OriginFilterProps {
  origins: TaxonomyItem[];
  value: OriginFilter;
  onChange: (origin: OriginFilter) => void;
}

export interface SegmentedFilterItem {
  id: number;
  label: string;
}

export interface SegmentedFilterProps {
  label: string;
  items: SegmentedFilterItem[];
  value: number | null;
  onChange: (id: number | null) => void;
}

export interface PlantFiltersProps {
  taxonomies: Taxonomies;
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
