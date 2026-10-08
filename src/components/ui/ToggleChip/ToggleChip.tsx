import { Icon } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/classNames';
import type { ToggleChipProps } from '@/types/components/ui';
import styles from './ToggleChip.module.css';

export function ToggleChip({
  pressed,
  children,
  className,
  type = 'button',
  ...buttonProps
}: ToggleChipProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={cx(styles.chip, className)}
      {...buttonProps}
    >
      <span className={styles.dot}>
        {pressed && <Icon name="check" className={styles.check} />}
      </span>
      {children}
    </button>
  );
}
