import {
  COLLECTION_DATE_FORMAT,
  COLLECTION_LOCALE,
} from '@/constants/collections';
import { copy } from '@/data/copy';
import { formatCopy } from './formatCopy';
import { pluralCopy } from './pluralCopy';

const COLLECTIONS_COPY = copy.collections;
const dateFormat = new Intl.DateTimeFormat(
  COLLECTION_LOCALE,
  COLLECTION_DATE_FORMAT,
);

export function collectionMeta(plantCount: number, updatedAt: string) {
  const date = dateFormat.format(new Date(updatedAt));
  return [
    pluralCopy(plantCount, COLLECTIONS_COPY.plantCount),
    formatCopy(COLLECTIONS_COPY.updatedAt, { date }),
  ].join(COLLECTIONS_COPY.metaSeparator);
}
