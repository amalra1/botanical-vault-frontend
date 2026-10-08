import { VineArt } from '@/components/ui/VineArt/VineArt';
import { LOGIN_VINES } from '@/constants/loginVines';
import { cx } from '@/lib/classNames';
import styles from './LoginVines.module.css';

export function LoginVines() {
  return (
    <div className={styles.vines} aria-hidden="true">
      {LOGIN_VINES.map((vine) => (
        <VineArt
          key={vine.position}
          vine={vine}
          className={cx(styles.vine, styles[vine.position])}
        />
      ))}
    </div>
  );
}
