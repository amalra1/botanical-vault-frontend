import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import { SELECT_SEARCH_MIN_OPTIONS } from '@/constants/selectPopover';
import { filterOptionsByLabel, optionKey } from '@/lib/selectOptions';
import type {
  SelectPopoverPanelProps,
  SelectValue,
} from '@/types/components/ui';
import styles from './SelectPopoverPanel.module.css';

export function SelectPopoverPanel<T extends SelectValue>({
  id,
  options,
  isSelected,
  onSelect,
  searchLabel,
  emptyLabel,
}: SelectPopoverPanelProps<T>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState('');
  const isSearchable = options.length >= SELECT_SEARCH_MIN_OPTIONS;
  const visibleOptions = filterOptionsByLabel(options, term);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div id={id} className={styles.panel}>
      {isSearchable && (
        <label className={styles.search}>
          <Icon name="search" className={styles.searchIcon} />
          <input
            ref={searchRef}
            type="search"
            className={styles.searchInput}
            aria-label={searchLabel}
            placeholder={searchLabel}
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          />
        </label>
      )}
      {visibleOptions.length > 0 ? (
        <ul className={styles.options}>
          {visibleOptions.map((option) => (
            <li key={optionKey(option)}>
              <button
                type="button"
                className={styles.option}
                aria-pressed={isSelected(option.value)}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
                {isSelected(option.value) && (
                  <Icon name="check" className={styles.check} />
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.note}>{emptyLabel}</p>
      )}
    </div>
  );
}
