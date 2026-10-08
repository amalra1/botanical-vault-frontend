import { useCallback, useEffect, useState } from 'react';
import type { TransientFlag } from '@/types/transientFlag';

export function useTransientFlag(durationMs: number): TransientFlag {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) {
      return;
    }
    const timer = window.setTimeout(() => setIsOn(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [isOn, durationMs]);

  const trigger = useCallback(() => setIsOn(true), []);

  return { isOn, trigger };
}
