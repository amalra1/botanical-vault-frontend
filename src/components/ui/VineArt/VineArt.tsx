import {
  LEAF_DELAY_START_MS,
  LEAF_DELAY_STEP_MS,
  LEAF_PATH,
  LEAF_TONES,
  STEM_DELAY_STEP_MS,
} from '@/constants/vines';
import { cx } from '@/lib/classNames';
import type { VineArtProps } from '@/types/components/ui';
import styles from './VineArt.module.css';

export function VineArt({ vine, className }: VineArtProps) {
  return (
    <svg className={cx(styles.art, className)} viewBox={vine.viewBox}>
      {vine.stems.map((stem, index) => (
        <path
          key={stem}
          d={stem}
          pathLength={1}
          className={styles.stem}
          style={{ animationDelay: `${index * STEM_DELAY_STEP_MS}ms` }}
        />
      ))}
      {vine.leaves.map((leaf, index) => (
        <g
          key={`${leaf.x}-${leaf.y}`}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale})`}
        >
          <path
            d={LEAF_PATH}
            className={cx(
              styles.leaf,
              styles[LEAF_TONES[index % LEAF_TONES.length]],
            )}
            style={{
              animationDelay: `${LEAF_DELAY_START_MS + index * LEAF_DELAY_STEP_MS}ms`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
