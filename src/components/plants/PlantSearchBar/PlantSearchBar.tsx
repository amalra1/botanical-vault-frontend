'use client';

import { useCallback, useRef } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import {
  SEARCH_DEBOUNCE_MS,
  SEARCH_SHORTCUT_ARIA,
  SEARCH_SHORTCUT_KEY,
} from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { useDebouncedCommit } from '@/hooks/useDebouncedCommit';
import { useIsApplePlatform } from '@/hooks/useIsApplePlatform';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import type { PlantSearchBarProps } from '@/types/components/plantFilters';
import styles from './PlantSearchBar.module.css';

const SEARCH_COPY = copy.plants.search;

function shortcutLabel(isApple: boolean | null) {
  if (isApple === null) {
    return null;
  }
  return isApple ? SEARCH_COPY.shortcutApple : SEARCH_COPY.shortcutOther;
}

export function PlantSearchBar({ query, onCommit }: PlantSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { draft, setDraft } = useDebouncedCommit(
    query,
    onCommit,
    SEARCH_DEBOUNCE_MS,
  );
  const focusSearch = useCallback(() => inputRef.current?.focus(), []);
  useKeyboardShortcut(SEARCH_SHORTCUT_KEY, focusSearch);
  const shortcut = shortcutLabel(useIsApplePlatform());

  const clear = () => {
    setDraft('');
    onCommit('');
    focusSearch();
  };

  return (
    <div role="search" className={styles.bar}>
      <Icon name="search" className={styles.icon} />
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        aria-label={SEARCH_COPY.label}
        aria-keyshortcuts={SEARCH_SHORTCUT_ARIA}
        placeholder={SEARCH_COPY.placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <span className={styles.trailing}>
        {draft ? (
          <IconButton icon="close" label={SEARCH_COPY.clear} onClick={clear} />
        ) : (
          shortcut && <kbd className={styles.shortcut}>{shortcut}</kbd>
        )}
      </span>
    </div>
  );
}
