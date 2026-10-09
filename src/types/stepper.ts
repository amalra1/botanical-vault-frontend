export interface Stepper {
  index: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  back: () => void;
}
