import { useCallback, useEffect } from 'react';
import {
  applyFavoriteChange,
  subscribeToFavoriteChanges,
} from '@/lib/favoriteChanges';
import { plantChanges } from '@/lib/plantChanges';
import { serializePlantFilters } from '@/lib/plantFilterParams';
import { plantService } from '@/services/plantService';
import type { PlantFilters } from '@/types/plant';
import { useAsyncData } from './useAsyncData';
import { useChangeVersion } from './useChangeVersion';

export function usePlantSearch(filters: PlantFilters) {
  const key = serializePlantFilters(filters);
  const fetcher = useCallback(
    async () => ({ key, result: await plantService.search(filters) }),
    [key, filters],
  );
  const { data, error, isLoading, reload, mutate } = useAsyncData(
    fetcher,
    useChangeVersion(plantChanges),
  );

  useEffect(
    () =>
      subscribeToFavoriteChanges((change) =>
        mutate((current) => ({
          ...current,
          result: {
            ...current.result,
            plants: current.result.plants.map((plant) =>
              applyFavoriteChange(plant, change),
            ),
          },
        })),
      ),
    [mutate],
  );

  return {
    result: data?.result ?? null,
    error,
    isUpdating: isLoading || (data !== null && data.key !== key),
    reload,
  };
}
