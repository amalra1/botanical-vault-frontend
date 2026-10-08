import type { Control } from 'react-hook-form';
import type { DraftImage, PlantFormValues } from '@/types/plant';
import type { Taxonomies, TaxonomyItem } from '@/types/taxonomy';

export interface PlantFormModalProps {
  onClose: () => void;
}

export interface PlantFormProps {
  taxonomies: Taxonomies;
  onClose: () => void;
  onOriginCreated: (origin: TaxonomyItem) => void;
}

export interface TaxonomiesStatusProps {
  isLoading: boolean;
  onRetry: () => void;
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
  onOriginCreated: (origin: TaxonomyItem) => void;
}

export interface PlantNameFieldsProps {
  control: Control<PlantFormValues>;
  suggestion: string | null;
}

export interface OriginPickerProps {
  control: Control<PlantFormValues>;
  origins: TaxonomyItem[];
  onOriginCreated: (origin: TaxonomyItem) => void;
}

export interface NewOriginInputProps {
  onCreated: (origin: TaxonomyItem) => void;
}

export interface TaxonomyPickerProps {
  control: Control<PlantFormValues>;
  items: TaxonomyItem[];
}

export interface PlantFormFooterProps {
  canSave: boolean;
  isSaving: boolean;
  error: string | null;
  onCancel: () => void;
}
