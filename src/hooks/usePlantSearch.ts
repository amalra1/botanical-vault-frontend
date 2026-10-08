import { useCallback, useEffect } from 'react';
import { subscribeToPlantChanges } from '@/lib/plantChanges';
import { serializePlantFilters } from '@/lib/plantFilterParams';
import { plantService } from '@/services/plantService';
import type { PlantFilters } from '@/types/plant';
import { useAsyncData } from './useAsyncData';

export function usePlantSearch(filters: PlantFilters) {
  const key = serializePlantFilters(filters);
  const fetcher = useCallback(
    async () => ({ key, result: await plantService.search(filters) }),
    [key, filters],
  );
  const { data, error, isLoading, reload } = useAsyncData(fetcher);

  useEffect(() => subscribeToPlantChanges(reload), [reload]);

  return {
    result: data?.result ?? null,
    error,
    isUpdating: isLoading || (data !== null && data.key !== key),
    reload,
  };
}
