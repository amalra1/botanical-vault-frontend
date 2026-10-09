import { useId } from 'react';
import { cx } from '@/lib/classNames';
import type { FieldGroupProps } from '@/types/components/ui';
import styles from './FieldGroup.module.css';

export function FieldGroup({
  label,
  optionalLabel,
  hint,
  children,
  className,
}: FieldGroupProps) {
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className={cx(styles.group, className)}
    >
      <span id={labelId} className={styles.label}>
        {label}
        {optionalLabel && (
          <span className={styles.optional}> {optionalLabel}</span>
        )}
      </span>
      {children}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
