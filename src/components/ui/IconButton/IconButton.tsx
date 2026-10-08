import { Icon } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/classNames';
import type { IconButtonProps } from '@/types/components/ui';
import styles from './IconButton.module.css';

export function IconButton({
  icon,
  label,
  variant = 'muted',
  className,
  type = 'button',
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(styles.button, styles[variant], className)}
      {...buttonProps}
    >
      <Icon name={icon} />
    </button>
  );
}
