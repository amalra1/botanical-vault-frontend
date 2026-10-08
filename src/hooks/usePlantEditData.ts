import { useCallback } from 'react';
import { plantService } from '@/services/plantService';
import { taxonomyService } from '@/services/taxonomyService';
import type { PlantEditData } from '@/types/plantEditing';
import { useAsyncData } from './useAsyncData';

export function usePlantEditData(plantId: number) {
  const fetchEditData = useCallback(async (): Promise<PlantEditData> => {
    const [plant, taxonomies] = await Promise.all([
      plantService.getById(plantId),
      taxonomyService.getAll(),
    ]);
    return { plant, taxonomies };
  }, [plantId]);
  return useAsyncData(fetchEditData);
}
