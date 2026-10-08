import { useCallback } from 'react';
import { plantService } from '@/services/plantService';
import { useAsyncData } from './useAsyncData';

export function usePlant(plantId: number) {
  const fetchPlant = useCallback(
    () => plantService.getById(plantId),
    [plantId],
  );
  return useAsyncData(fetchPlant);
}
