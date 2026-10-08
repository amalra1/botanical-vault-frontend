import { useCallback, useEffect } from 'react';
import {
  applyFavoriteChange,
  subscribeToFavoriteChanges,
} from '@/lib/favoriteChanges';
import { plantService } from '@/services/plantService';
import { useAsyncData } from './useAsyncData';

export function usePlant(plantId: number) {
  const fetchPlant = useCallback(
    () => plantService.getById(plantId),
    [plantId],
  );
  const plant = useAsyncData(fetchPlant);
  const { mutate } = plant;

  useEffect(
    () =>
      subscribeToFavoriteChanges((change) =>
        mutate((current) => applyFavoriteChange(current, change)),
      ),
    [mutate],
  );

  return plant;
}
