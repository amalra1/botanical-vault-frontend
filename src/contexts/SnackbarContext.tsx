'use client';

import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import type { SnackbarProviderProps } from '@/types/components/ui';
import type {
  SnackbarContextValue,
  SnackbarInput,
  SnackbarMessage,
} from '@/types/snackbar';

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [message, setMessage] = useState<SnackbarMessage | null>(null);
  const [hostIds, setHostIds] = useState<string[]>([]);
  const lastId = useRef(0);

  const notify = useCallback((input: SnackbarInput) => {
    lastId.current += 1;
    setMessage({ ...input, id: lastId.current });
  }, []);

  const dismiss = useCallback((id: number) => {
    setMessage((current) => (current?.id === id ? null : current));
  }, []);

  const registerHost = useCallback((hostId: string) => {
    setHostIds((current) => [...current, hostId]);
    return () => setHostIds((current) => current.filter((id) => id !== hostId));
  }, []);

  const value = useMemo(
    () => ({
      message,
      activeHostId: hostIds.at(-1) ?? null,
      notify,
      dismiss,
      registerHost,
    }),
    [message, hostIds, notify, dismiss, registerHost],
  );

  return <SnackbarContext value={value}>{children}</SnackbarContext>;
}
