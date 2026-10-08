import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { sizeShortLabel } from '@/lib/sizeLabels';
import type { SizeCoverageDotsProps } from '@/types/components/collections';
import styles from './SizeCoverageDots.module.css';

const COLLECTIONS_COPY = copy.collections;

export function SizeCoverageDots({ coverage }: SizeCoverageDotsProps) {
  return (
    <span className={styles.dots}>
      <span className={styles.label}>{COLLECTIONS_COPY.staircase}</span>
      {coverage.map((size) => (
        <span
          key={size.id}
          className={cx(styles.dot, size.covered && styles.covered)}
        >
          <span aria-hidden="true">{sizeShortLabel(size)}</span>
          <span className="sr-only">
            {formatCopy(
              size.covered
                ? COLLECTIONS_COPY.sizeCovered
                : COLLECTIONS_COPY.sizeMissing,
              { size: size.name },
            )}
          </span>
        </span>
      ))}
    </span>
  );
}
