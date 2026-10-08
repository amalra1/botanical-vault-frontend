import { createChangeSignal } from './changeSignal';

export const taxonomyChanges = createChangeSignal();

export function notifyTaxonomiesChanged() {
  taxonomyChanges.notify();
}
