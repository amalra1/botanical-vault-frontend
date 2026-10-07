import { cx } from '@/lib/classNames';
import type { ButtonProps } from '@/types/components/ui';
import styles from './Button.module.css';

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  className,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    />
  );
}
