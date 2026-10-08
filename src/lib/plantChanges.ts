const listeners = new Set<() => void>();

export function subscribeToPlantChanges(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyPlantsChanged() {
  listeners.forEach((listener) => listener());
}
