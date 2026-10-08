export type ChangeListener<T> = (payload: T) => void;

export interface ChangeSignal<T> {
  subscribe: (listener: ChangeListener<T>) => () => void;
  notify: (payload: T) => void;
  getVersion: () => number;
}
