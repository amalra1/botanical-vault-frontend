import { COLLECTION_MOSAIC_SIZE } from '@/constants/collections';
import type { MosaicCell } from '@/types/collection';

export function mosaicCells(urls: string[]): MosaicCell[] {
  return Array.from({ length: COLLECTION_MOSAIC_SIZE }, (_, index) => ({
    key: String(index),
    url: urls[index] ?? null,
  }));
}
