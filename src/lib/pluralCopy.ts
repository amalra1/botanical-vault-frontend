import { formatCopy } from '@/lib/formatCopy';
import type { PluralCopy } from '@/types/plant';

const SINGLE = 1;

export function pluralCopy(count: number, { one, many }: PluralCopy) {
  return formatCopy(count === SINGLE ? one : many, { count });
}
