import { useCallback, useEffect, useState } from 'react';
import type { AsyncData, AsyncState } from '@/types/async';

const INITIAL_STATE = { data: null, error: null, isLoading: true };

export function useAsyncData<T>(fetcher: () => Promise<T>): AsyncData<T> {
  const [state, setState] = useState<AsyncState<T>>(INITIAL_STATE);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    fetcher().then(
      (data) => {
        if (isCurrent) {
          setState({ data, error: null, isLoading: false });
        }
      },
      (error: unknown) => {
        if (isCurrent) {
          setState((current) => ({ ...current, error, isLoading: false }));
        }
      },
    );
    return () => {
      isCurrent = false;
    };
  }, [fetcher, requestCount]);

  const reload = useCallback(() => {
    setState((current) => ({ ...current, error: null, isLoading: true }));
    setRequestCount((count) => count + 1);
  }, []);

  const mutate = useCallback((updater: (current: T) => T) => {
    setState((current) =>
      current.data === null
        ? current
        : { ...current, data: updater(current.data) },
    );
  }, []);

  return { ...state, reload, mutate };
}
