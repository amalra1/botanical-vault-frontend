import { useId } from 'react';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { formatMissingSizes, staircaseStatus } from '@/lib/staircase';
import type { SizeStaircaseProps } from '@/types/components/collections';
import { StaircaseStep } from './StaircaseStep';
import styles from './SizeStaircase.module.css';

const MODAL_COPY = copy.collectionModal;

export function SizeStaircase({ collection }: SizeStaircaseProps) {
  const headingId = useId();
  const { isComplete, missing } = staircaseStatus(collection.sizeCoverage);
  const statusLabel = isComplete
    ? MODAL_COPY.complete
    : formatCopy(MODAL_COPY.missing, { sizes: formatMissingSizes(missing) });

  return (
    <section aria-labelledby={headingId} className={styles.staircase}>
      <div className={styles.header}>
        <h3 id={headingId} className={styles.title}>
          {MODAL_COPY.staircaseTitle}
        </h3>
        <span
          className={cx(
            styles.status,
            isComplete ? styles.complete : styles.incomplete,
          )}
        >
          {statusLabel}
        </span>
      </div>
      <div className={styles.scroller}>
        <ol className={styles.steps}>
          {collection.plants.map((plant, index) => (
            <StaircaseStep
              key={plant.id}
              plant={plant}
              coverage={collection.sizeCoverage}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
