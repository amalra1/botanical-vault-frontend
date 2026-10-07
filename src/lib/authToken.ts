import { STORAGE_KEYS } from '@/constants/storageKeys';

const STORAGE_EVENT = 'storage';
const listeners = new Set<() => void>();

export function readAuthToken(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.authToken);
  } catch {
    return null;
  }
}

export function hasAuthToken() {
  return readAuthToken() !== null;
}

export function writeAuthToken(token: string) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.authToken, token);
  } catch {}
  notifyAuthTokenChange();
}

export function clearAuthToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEYS.authToken);
  } catch {}
  notifyAuthTokenChange();
}

export function subscribeToAuthToken(listener: () => void) {
  listeners.add(listener);
  window.addEventListener(STORAGE_EVENT, listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(STORAGE_EVENT, listener);
  };
}

function notifyAuthTokenChange() {
  listeners.forEach((listener) => listener());
}
