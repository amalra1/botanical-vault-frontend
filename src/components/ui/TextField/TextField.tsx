import { useId } from 'react';
import { cx } from '@/lib/classNames';
import type { TextFieldProps } from '@/types/components/ui';
import styles from './TextField.module.css';

export function TextField({
  label,
  error,
  id,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={cx(styles.input, error && styles.invalid)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
