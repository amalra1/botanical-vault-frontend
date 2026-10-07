import { useSyncExternalStore } from 'react';
import { hasAuthToken, subscribeToAuthToken } from '@/lib/authToken';

function hasNoTokenOnServer() {
  return false;
}

export function useHasAuthToken() {
  return useSyncExternalStore(
    subscribeToAuthToken,
    hasAuthToken,
    hasNoTokenOnServer,
  );
}
