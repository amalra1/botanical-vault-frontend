import { collectionService } from '@/services/collectionService';
import { useAsyncData } from './useAsyncData';
import { useLibraryVersion } from './useLibraryVersion';

export function useCollections() {
  return useAsyncData(collectionService.getAll, useLibraryVersion());
}
