import { cx } from '@/lib/classNames';
import type { SegmentedControlProps } from '@/types/components/ui';
import styles from './SegmentedControl.module.css';

export function SegmentedControl({
  label,
  labelledBy,
  options,
  value,
  onChange,
  size = 'md',
  orientation = 'horizontal',
  className,
}: SegmentedControlProps) {
  return (
    <div
      role={label || labelledBy ? 'group' : undefined}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={cx(styles.group, styles[size], styles[orientation], className)}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          className={styles.option}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
