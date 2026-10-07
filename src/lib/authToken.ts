import { STORAGE_KEYS } from '@/constants/storageKeys';

export function readAuthToken(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.authToken);
  } catch {
    return null;
  }
}

export function writeAuthToken(token: string) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.authToken, token);
  } catch {}
}

export function clearAuthToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEYS.authToken);
  } catch {}
}
