export interface TransientFlag {
  isOn: boolean;
  trigger: () => void;
}
