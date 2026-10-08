import type { z } from 'zod';
import type {
  PLANT_SORT_API_VALUES,
  PLANT_SORT_PARAMS,
  UNCLASSIFIED_ORIGIN,
} from '@/constants/plantFilters';
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

export type PlantSortKey = keyof typeof PLANT_SORT_PARAMS;

export type OriginFilter = number | typeof UNCLASSIFIED_ORIGIN | null;

export interface PlantFilters {
  query: string;
  typeId: number | null;
  origin: OriginFilter;
  sizeId: number | null;
  viewId: number | null;
  sort: PlantSortKey;
}

export interface PlantSearchApiParams {
  q?: string;
  typeId?: number;
  originId?: number;
  unclassified?: boolean;
  sizeId?: number;
  viewId?: number;
  sort: (typeof PLANT_SORT_API_VALUES)[PlantSortKey];
}

export interface PlantSummary {
  id: number;
  commonName: string;
  scientificName: string | null;
  type: TaxonomyItem;
  size: SizeItem;
  origins: TaxonomyItem[];
  imageCount: number;
  coverUrl: string | null;
}

export interface FacetCount {
  id: number;
  count: number;
}

export interface FacetCounts {
  all: number;
  options: FacetCount[];
}

export interface OriginFacetCounts extends FacetCounts {
  unclassified: number;
}

export interface PlantFacets {
  types: FacetCounts;
  origins: OriginFacetCounts;
  sizes: FacetCounts;
  views: FacetCounts;
}

export interface PlantSearchResult {
  plants: PlantSummary[];
  facets: PlantFacets;
}

export interface KeyedPlantSearchResult {
  key: string;
  result: PlantSearchResult;
}

export interface PluralCopy {
  one: string;
  many: string;
}

export interface ReadableSearchParams {
  get: (name: string) => string | null;
}
