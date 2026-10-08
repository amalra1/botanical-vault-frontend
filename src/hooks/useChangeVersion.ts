import { useSyncExternalStore } from 'react';
import type { ChangeSignal } from '@/types/changeSignal';

const SERVER_VERSION = 0;

function getServerVersion() {
  return SERVER_VERSION;
}

export function useChangeVersion<T>({
  subscribe,
  getVersion,
}: ChangeSignal<T>) {
  return useSyncExternalStore(subscribe, getVersion, getServerVersion);
}
