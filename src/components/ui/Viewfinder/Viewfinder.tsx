import { Icon } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/classNames';
import { optionKey } from '@/lib/selectOptions';
import type { SelectValue, ViewfinderProps } from '@/types/components/ui';
import styles from './Viewfinder.module.css';

export function Viewfinder<T extends SelectValue>({
  label,
  options,
  value,
  onChange,
  layout = 'inline',
}: ViewfinderProps<T>) {
  return (
    <div
      role={label ? 'group' : undefined}
      aria-label={label}
      className={cx(styles.viewfinder, styles[layout])}
    >
      <Icon name="eye" className={styles.lens} />
      {options.map((option) => (
        <button
          key={optionKey(option)}
          type="button"
          className={styles.option}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
