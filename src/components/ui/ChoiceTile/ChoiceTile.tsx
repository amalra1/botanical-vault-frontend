import { cx } from '@/lib/classNames';
import type { ChoiceTileProps } from '@/types/components/ui';
import styles from './ChoiceTile.module.css';

export function ChoiceTile({
  pressed,
  label,
  caption,
  className,
  type = 'button',
  ...buttonProps
}: ChoiceTileProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={cx(styles.tile, className)}
      {...buttonProps}
    >
      <span className={styles.label}>{label}</span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </button>
  );
}
