export interface AsyncState<T> {
  data: T | null;
  error: unknown;
  isLoading: boolean;
}

export interface AsyncData<T> extends AsyncState<T> {
  reload: () => void;
  mutate: (updater: (current: T) => T) => void;
}
