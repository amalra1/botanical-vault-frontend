import type { Control } from 'react-hook-form';
import type {
  Plant,
  PlantFormValues,
  PlantSearchResult,
  PlantSummary,
  PlantTagSource,
} from '@/types/plant';
import type { DraftImage } from '@/types/plantImage';
import type { SizeItem, Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantFormModalProps {
  onClose: () => void;
}

export interface PlantFormProps {
  taxonomies: Taxonomies;
  plant?: Plant;
  onClose: () => void;
  onSaved: () => void;
  onDeleted?: () => void;
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
  isEditing: boolean;
  error: string | null;
  onCancel: () => void;
  onDelete?: () => void;
}

export interface PlantResultsProps {
  result: PlantSearchResult | null;
  error: unknown;
  isUpdating: boolean;
  hasActiveFilters: boolean;
  origins: TaxonomyItem[];
  onRetry: () => void;
  onClear: () => void;
  onOpenPlant: (plantId: number) => void;
}

export interface PlantGridProps {
  plants: PlantSummary[];
  origins: TaxonomyItem[];
  isUpdating: boolean;
  onOpenPlant: (plantId: number) => void;
}

export interface PlantCardProps {
  plant: PlantSummary;
  origins: TaxonomyItem[];
  onOpen: (plantId: number) => void;
}

export interface PlantTagsProps {
  plant: PlantTagSource;
  origins: TaxonomyItem[];
  size?: SizeItem;
}

export type PlantsEmptyVariant = 'noResults' | 'emptyLibrary';

export interface PlantsEmptyStateProps {
  variant: PlantsEmptyVariant;
  onClear: () => void;
}
