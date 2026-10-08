import { useCallback } from 'react';
import { collectionService } from '@/services/collectionService';
import { useAsyncData } from './useAsyncData';
import { useLibraryVersion } from './useLibraryVersion';

export function useCollection(collectionId: number) {
  const fetchCollection = useCallback(
    () => collectionService.getById(collectionId),
    [collectionId],
  );
  return useAsyncData(fetchCollection, useLibraryVersion());
}
