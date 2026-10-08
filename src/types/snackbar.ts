export interface SnackbarInput {
  title: string;
  description: string;
}

export interface SnackbarMessage extends SnackbarInput {
  id: number;
}

export interface SnackbarContextValue {
  message: SnackbarMessage | null;
  activeHostId: string | null;
  notify: (input: SnackbarInput) => void;
  dismiss: (id: number) => void;
  registerHost: (hostId: string) => () => void;
}

export interface DismissTimer {
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
}
