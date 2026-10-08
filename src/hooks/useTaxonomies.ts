import { taxonomyService } from '@/services/taxonomyService';
import { useAsyncData } from './useAsyncData';

export function useTaxonomies() {
  return useAsyncData(taxonomyService.getAll);
}
