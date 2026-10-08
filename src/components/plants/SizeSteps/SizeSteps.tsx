import type { CSSProperties } from 'react';
import { sizeShortLabel } from '@/lib/sizeLabels';
import type { SizeStepsProps } from '@/types/components/plants';
import styles from './SizeSteps.module.css';

const MIN_LEVEL_SPAN = 1;

export function SizeSteps({
  sizes,
  value,
  onChange,
  allLabel,
}: SizeStepsProps) {
  const levelSpan = Math.max(sizes.length - 1, MIN_LEVEL_SPAN);

  return (
    <div className={styles.steps}>
      {allLabel && (
        <button
          type="button"
          className={styles.all}
          aria-pressed={value === null}
          onClick={() => onChange(null)}
        >
          {allLabel}
        </button>
      )}
      {sizes.map((size, index) => (
        <button
          key={size.id}
          type="button"
          className={styles.step}
          style={
            {
              '--size-level': index,
              '--size-span': levelSpan,
            } as CSSProperties
          }
          aria-label={size.name}
          title={size.description ?? size.name}
          aria-pressed={value === size.id}
          onClick={() => onChange(size.id)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span aria-hidden="true">{sizeShortLabel(size)}</span>
        </button>
      ))}
    </div>
  );
}
