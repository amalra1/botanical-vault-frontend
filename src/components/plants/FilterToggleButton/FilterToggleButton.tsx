import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import { pluralCopy } from '@/lib/pluralCopy';
import type { FilterToggleButtonProps } from '@/types/components/plantFilters';
import styles from './FilterToggleButton.module.css';

const FILTERS_COPY = copy.plants.filters;

export function FilterToggleButton({
  isOpen,
  activeCount,
  controls,
  onToggle,
}: FilterToggleButtonProps) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={isOpen}
      aria-controls={isOpen ? controls : undefined}
      onClick={onToggle}
    >
      <Icon name="sliders" />
      <span className={styles.label}>{FILTERS_COPY.toggle}</span>
      {activeCount > 0 && (
        <span className={styles.badge}>
          <span aria-hidden="true">{activeCount}</span>
          <span className="sr-only">
            {pluralCopy(activeCount, FILTERS_COPY.activeCount)}
          </span>
        </span>
      )}
    </button>
  );
}
