import { SIZE_DESCRIPTION_SEPARATOR } from '@/constants/collections';
import type { SizeItem } from '@/types/taxonomy';

export function sizeShortLabel({ name, description }: SizeItem) {
  const [shortLabel] = (description ?? '').split(SIZE_DESCRIPTION_SEPARATOR);
  return shortLabel || name.charAt(0);
}
