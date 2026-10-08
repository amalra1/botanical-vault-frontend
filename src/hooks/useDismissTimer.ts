import { useEffect, useRef, useState } from 'react';
import type { DismissTimer } from '@/types/snackbar';

export function useDismissTimer(
  durationMs: number,
  onExpire: () => void,
): DismissTimer {
  const [isPaused, setIsPaused] = useState(false);
  const remainingMs = useRef(durationMs);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const startedAt = Date.now();
    const timer = window.setTimeout(onExpire, remainingMs.current);
    return () => {
      window.clearTimeout(timer);
      remainingMs.current -= Date.now() - startedAt;
    };
  }, [isPaused, onExpire]);

  return {
    isPaused,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
}
