import { collectionChanges } from '@/lib/collectionChanges';
import { plantChanges } from '@/lib/plantChanges';
import { useChangeVersion } from './useChangeVersion';

export function useLibraryVersion() {
  return useChangeVersion(plantChanges) + useChangeVersion(collectionChanges);
}
