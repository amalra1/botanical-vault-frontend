import { useId } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { copy } from '@/data/copy';
import { pluralCopy } from '@/lib/pluralCopy';
import type { PlantResultsHeaderProps } from '@/types/components/plants';
import type { SegmentedOption } from '@/types/components/ui';
import type { PlantSortKey } from '@/types/plant';
import styles from './PlantResultsHeader.module.css';

const RESULTS_COPY = copy.plants.results;
const SORT_OPTIONS: SegmentedOption<PlantSortKey>[] = [
  { value: 'name', label: RESULTS_COPY.sortName },
  { value: 'recent', label: RESULTS_COPY.sortRecent },
];

export function PlantResultsHeader({
  title,
  count,
  canClear,
  sort,
  onSortChange,
  onClear,
}: PlantResultsHeaderProps) {
  const sortLabelId = useId();

  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {count !== null && (
          <p className={styles.count} aria-live="polite">
            {pluralCopy(count, RESULTS_COPY.count)}
          </p>
        )}
      </div>
      <div className={styles.actions}>
        {canClear && (
          <Button variant="secondary" onClick={onClear}>
            {RESULTS_COPY.clearFilters}
          </Button>
        )}
        <div className={styles.sort}>
          <span id={sortLabelId} className={styles.sortLabel}>
            {RESULTS_COPY.sortLabel}
          </span>
          <SegmentedControl
            labelledBy={sortLabelId}
            options={SORT_OPTIONS}
            value={sort}
            onChange={onSortChange}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
