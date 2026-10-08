import { createChangeSignal } from './changeSignal';

export const plantChanges = createChangeSignal();

export function notifyPlantsChanged() {
  plantChanges.notify();
}
