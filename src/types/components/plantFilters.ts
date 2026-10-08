import type { OriginFilter, PlantFilters, PlantSortKey } from '@/types/plant';
import type { SizeItem, Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantSearchBarProps {
  query: string;
  onCommit: (query: string) => void;
}

export interface TypeFilterProps {
  types: TaxonomyItem[];
  value: number | null;
  onChange: (typeId: number | null) => void;
}

export interface OriginFilterProps {
  origins: TaxonomyItem[];
  value: OriginFilter;
  onChange: (origin: OriginFilter) => void;
}

export interface SizeFilterProps {
  sizes: SizeItem[];
  value: number | null;
  onChange: (sizeId: number | null) => void;
}

export interface ViewFilterProps {
  views: TaxonomyItem[];
  value: number | null;
  onChange: (viewId: number | null) => void;
}

export interface FilterToggleButtonProps {
  isOpen: boolean;
  activeCount: number;
  controls: string;
  onToggle: () => void;
}

export interface PlantFiltersProps {
  id: string;
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
