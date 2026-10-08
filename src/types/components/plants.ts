import type { Control } from 'react-hook-form';
import type {
  DraftImage,
  FacetCounts,
  OriginFacetCounts,
  OriginFilter,
  PlantFacets,
  PlantFilters,
  PlantFormValues,
  PlantSearchResult,
  PlantSortKey,
  PlantSummary,
} from '@/types/plant';
import type { SizeItem, Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantFormModalProps {
  onClose: () => void;
}

export interface PlantFormProps {
  taxonomies: Taxonomies;
  onClose: () => void;
}

export interface ImageDropZoneProps {
  onFiles: (files: File[]) => void;
  error: string | null;
}

export interface DraftImageGridProps {
  images: DraftImage[];
  views: TaxonomyItem[];
  onMove: (activeId: string, overId: string) => void;
  onRemove: (id: string) => void;
  onViewChange: (id: string, viewId: number) => void;
  onAddFiles: (files: File[]) => void;
}

export interface DraftImageCardProps {
  image: DraftImage;
  isCover: boolean;
  views: TaxonomyItem[];
  onRemove: (id: string) => void;
  onViewChange: (id: string, viewId: number) => void;
}

export interface AddImagesTileProps {
  onFiles: (files: File[]) => void;
}

export interface PlantFormFieldsProps {
  control: Control<PlantFormValues>;
  taxonomies: Taxonomies;
  firstFilename: string | null;
}

export interface PlantNameFieldsProps {
  control: Control<PlantFormValues>;
  suggestion: string | null;
}

export interface OriginPickerProps {
  control: Control<PlantFormValues>;
  origins: TaxonomyItem[];
}

export interface TaxonomyPickerProps {
  control: Control<PlantFormValues>;
  items: TaxonomyItem[];
}

export interface PlantSizePickerProps {
  control: Control<PlantFormValues>;
  sizes: SizeItem[];
}

export interface PlantFormFooterProps {
  canSave: boolean;
  isSaving: boolean;
  error: string | null;
  onCancel: () => void;
}

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

export interface PlantResultsProps {
  result: PlantSearchResult | null;
  error: unknown;
  isUpdating: boolean;
  hasActiveFilters: boolean;
  origins: TaxonomyItem[];
  onRetry: () => void;
  onClear: () => void;
}

export interface PlantGridProps {
  plants: PlantSummary[];
  origins: TaxonomyItem[];
  isUpdating: boolean;
}

export interface PlantCardProps {
  plant: PlantSummary;
  origins: TaxonomyItem[];
}

export type PlantsEmptyVariant = 'noResults' | 'emptyLibrary';

export interface PlantsEmptyStateProps {
  variant: PlantsEmptyVariant;
  onClear: () => void;
}
