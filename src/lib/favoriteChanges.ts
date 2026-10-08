import type { FavoriteChange, FavoriteTarget } from '@/types/collection';
import { createChangeSignal } from './changeSignal';

const favoriteChanges = createChangeSignal<FavoriteChange>();

export const subscribeToFavoriteChanges = favoriteChanges.subscribe;
export const notifyFavoriteChanged = favoriteChanges.notify;

export function applyFavoriteChange<T extends FavoriteTarget>(
  plant: T,
  { plantId, favorite }: FavoriteChange,
): T {
  return plant.id === plantId ? { ...plant, favorite } : plant;
}
