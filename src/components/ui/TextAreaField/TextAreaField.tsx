import { useId } from 'react';
import { cx } from '@/lib/classNames';
import type { TextAreaFieldProps } from '@/types/components/ui';
import styles from './TextAreaField.module.css';

export function TextAreaField({
  label,
  optionalLabel,
  id,
  className,
  ...textAreaProps
}: TextAreaFieldProps) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={textAreaId} className={styles.label}>
        {label}
        {optionalLabel && (
          <span className={styles.optional}> {optionalLabel}</span>
        )}
      </label>
      <textarea id={textAreaId} className={styles.input} {...textAreaProps} />
    </div>
  );
}
