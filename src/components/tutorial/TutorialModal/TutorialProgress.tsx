import type { CSSProperties } from 'react';
import { STEP_NUMBER_OFFSET } from '@/constants/stepper';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import type { TutorialProgressProps } from '@/types/components/tutorial';
import styles from './TutorialProgress.module.css';

const TUTORIAL_COPY = copy.tutorial;
const MIN_LEVEL_SPAN = 1;

export function TutorialProgress({ current, total }: TutorialProgressProps) {
  const levelSpan = Math.max(total - 1, MIN_LEVEL_SPAN);
  const currentLevel = current - STEP_NUMBER_OFFSET;
  const values = { current, total };

  return (
    <div className={styles.progress}>
      <span className={styles.bars} aria-hidden="true">
        {Array.from({ length: total }, (_, level) => (
          <span
            key={level}
            className={cx(
              styles.bar,
              level < currentLevel && styles.reached,
              level === currentLevel && styles.current,
            )}
            style={
              {
                '--step-level': level,
                '--step-span': levelSpan,
              } as CSSProperties
            }
          />
        ))}
      </span>
      <span className={styles.count} aria-hidden="true">
        {formatCopy(TUTORIAL_COPY.progress, values)}
      </span>
      <span className="sr-only" aria-live="polite">
        {formatCopy(TUTORIAL_COPY.progressLabel, values)}
      </span>
    </div>
  );
}
