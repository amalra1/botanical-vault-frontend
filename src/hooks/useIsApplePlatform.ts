import { useSyncExternalStore } from 'react';
import { isApplePlatform } from '@/lib/platform';
import { subscribeToNothing } from '@/lib/staticStore';

function platformSnapshot() {
  return isApplePlatform(navigator.userAgent);
}

function serverSnapshot() {
  return null;
}

export function useIsApplePlatform() {
  return useSyncExternalStore(
    subscribeToNothing,
    platformSnapshot,
    serverSnapshot,
  );
}
