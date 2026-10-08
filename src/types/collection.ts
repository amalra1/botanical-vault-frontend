import type { z } from 'zod';
import type { collectionNameSchema } from '@/schemas/collectionNameSchema';
import type { PlantSummary } from './plant';
import type { SizeItem } from './taxonomy';

export type CollectionNameValues = z.infer<typeof collectionNameSchema>;

export interface SizeCoverage extends SizeItem {
  covered: boolean;
}

export interface CollectionSummary {
  id: number;
  name: string;
  favorites: boolean;
  plantCount: number;
  mosaicUrls: string[];
  sizeCoverage: SizeCoverage[];
  updatedAt: string;
}

export interface Collection {
  id: number;
  name: string;
  favorites: boolean;
  plants: PlantSummary[];
  sizeCoverage: SizeCoverage[];
  updatedAt: string;
}

export interface CollectionImage {
  plantId: number;
  commonName: string;
  imageId: number;
  originalFilename: string;
  url: string;
}

export interface ArchiveEntry {
  path: string;
  url: string;
}

export interface ArchiveFolder {
  name: string;
  usedFileNames: Set<string>;
}

export interface CollectionDownload {
  isDownloading: boolean;
  download: () => Promise<void>;
}

export interface FavoriteChange {
  plantId: number;
  favorite: boolean;
}

export interface FavoriteTarget {
  id: number;
  favorite: boolean;
}

export interface MosaicCell {
  key: string;
  url: string | null;
}

export interface StaircaseStatus {
  isComplete: boolean;
  missing: string[];
}

export interface CollectionModalController {
  collectionId: number | null;
  open: (collectionId: number) => void;
  close: () => void;
}

export interface CollectionMembership {
  selectedIds: Set<number>;
  update: (collectionId: number, isMember: boolean) => Promise<void>;
}
