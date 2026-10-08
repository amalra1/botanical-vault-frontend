import { useSyncExternalStore } from 'react';
import { subscribeToNothing } from '@/lib/staticStore';

function isClientSnapshot() {
  return true;
}

function isServerSnapshot() {
  return false;
}

export function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    isClientSnapshot,
    isServerSnapshot,
  );
}
