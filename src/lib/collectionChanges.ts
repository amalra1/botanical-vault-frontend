import { createChangeSignal } from './changeSignal';

export const collectionChanges = createChangeSignal();

export function notifyCollectionsChanged() {
  collectionChanges.notify();
}
