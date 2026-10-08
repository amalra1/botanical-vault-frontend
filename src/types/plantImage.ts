import type { ALL_OPTION } from '@/constants/plantFilters';
import type { PlantFormValues } from './plant';

export interface NewDraftImageSource {
  kind: 'new';
  file: File;
}

export interface ExistingDraftImageSource {
  kind: 'existing';
  imageId: number;
}

export type DraftImageSource = NewDraftImageSource | ExistingDraftImageSource;

export interface DraftImage {
  id: string;
  source: DraftImageSource;
  previewUrl: string;
  filename: string;
  viewId: number;
}

export interface PlantImageInput {
  source: DraftImageSource;
  viewId: number;
}

export interface PlantSavePayload extends PlantFormValues {
  images: PlantImageInput[];
}

export interface PlantImageRequest {
  id?: number;
  viewId: number;
}

export type ImageViewFilter = number | typeof ALL_OPTION;

export interface ImageDimensions {
  width: number;
  height: number;
}
