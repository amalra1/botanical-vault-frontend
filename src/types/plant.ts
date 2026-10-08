import type { z } from 'zod';
import type { plantFormSchema } from '@/schemas/plantFormSchema';
import type { SizeItem, TaxonomyItem } from './taxonomy';

export type PlantFormValues = z.infer<typeof plantFormSchema>;

export interface PlantImage {
  id: number;
  view: TaxonomyItem;
  originalFilename: string;
  url: string;
}

export interface Plant {
  id: number;
  commonName: string;
  scientificName: string | null;
  type: TaxonomyItem;
  size: SizeItem;
  origins: TaxonomyItem[];
  notes: string | null;
  images: PlantImage[];
  createdAt: string;
  updatedAt: string;
}

export interface DraftImage {
  id: string;
  file: File;
  previewUrl: string;
  viewId: number;
}

export interface PlantImageUpload {
  file: File;
  viewId: number;
}

export interface PlantCreatePayload extends PlantFormValues {
  images: PlantImageUpload[];
}

export interface SplitPngFiles {
  accepted: File[];
  rejected: File[];
}
