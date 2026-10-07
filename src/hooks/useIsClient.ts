import { useSyncExternalStore } from 'react';

function subscribeToNothing() {
  return () => {};
}

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
