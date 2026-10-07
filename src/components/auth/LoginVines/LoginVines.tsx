import {
  LEAF_DELAY_START_MS,
  LEAF_DELAY_STEP_MS,
  LEAF_PATH,
  LEAF_TONES,
  LOGIN_VINES,
  STEM_DELAY_STEP_MS,
} from '@/constants/loginVines';
import { cx } from '@/lib/classNames';
import styles from './LoginVines.module.css';

export function LoginVines() {
  return (
    <div className={styles.vines} aria-hidden="true">
      {LOGIN_VINES.map((vine) => (
        <svg
          key={vine.position}
          className={cx(styles.vine, styles[vine.position])}
          viewBox={vine.viewBox}
        >
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
      ))}
    </div>
  );
}
