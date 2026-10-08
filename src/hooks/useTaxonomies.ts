import { taxonomyChanges } from '@/lib/taxonomyChanges';
import { taxonomyService } from '@/services/taxonomyService';
import { useAsyncData } from './useAsyncData';
import { useChangeVersion } from './useChangeVersion';

export function useTaxonomies() {
  return useAsyncData(
    taxonomyService.getAll,
    useChangeVersion(taxonomyChanges),
  );
}
