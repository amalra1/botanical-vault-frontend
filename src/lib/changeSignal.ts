import type { ChangeListener, ChangeSignal } from '@/types/changeSignal';

export function createChangeSignal<T = void>(): ChangeSignal<T> {
  const listeners = new Set<ChangeListener<T>>();
  let version = 0;
  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    notify: (payload) => {
      version += 1;
      listeners.forEach((listener) => listener(payload));
    },
    getVersion: () => version,
  };
}
