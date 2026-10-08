import { VineArt } from '@/components/ui/VineArt/VineArt';
import { HEADER_VINES } from '@/constants/headerVines';
import { cx } from '@/lib/classNames';
import styles from './HeaderVines.module.css';

export function HeaderVines() {
  return (
    <div className={styles.vines} aria-hidden="true">
      {HEADER_VINES.map((vine) => (
        <VineArt
          key={vine.position}
          vine={vine}
          className={cx(styles.vine, styles[vine.position])}
        />
      ))}
    </div>
  );
}
