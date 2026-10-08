import { useEffect, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export function useDebouncedCommit(
  committed: string,
  onCommit: (value: string) => void,
  delayMs: number,
) {
  const [draft, setDraft] = useState(committed);
  const [lastCommitted, setLastCommitted] = useState(committed);
  const settled = useDebouncedValue(draft, delayMs);

  if (committed !== lastCommitted) {
    setLastCommitted(committed);
    if (committed !== draft.trim()) {
      setDraft(committed);
    }
  }

  useEffect(() => {
    if (settled === draft && settled.trim() !== committed) {
      onCommit(settled);
    }
  }, [settled, draft, committed, onCommit]);

  return { draft, setDraft };
}
