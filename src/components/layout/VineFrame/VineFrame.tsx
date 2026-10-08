import { VineArt } from '@/components/ui/VineArt/VineArt';
import { TITLE_VINES } from '@/constants/titleVines';
import { cx } from '@/lib/classNames';
import type { VineFrameProps } from '@/types/components/layout';
import styles from './VineFrame.module.css';

const [LEFT_VINE, RIGHT_VINE] = TITLE_VINES;

export function VineFrame({ children }: VineFrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.side} aria-hidden="true">
        <VineArt
          vine={LEFT_VINE}
          className={cx(styles.vine, styles[LEFT_VINE.position])}
        />
      </div>
      {children}
      <div className={styles.side} aria-hidden="true">
        <VineArt
          vine={RIGHT_VINE}
          className={cx(styles.vine, styles[RIGHT_VINE.position])}
        />
      </div>
    </div>
  );
}
