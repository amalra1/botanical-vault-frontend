import { useCallback } from 'react';
import { copy } from '@/data/copy';
import { reorderTaxonomy } from '@/lib/organizeItems';
import { notifyTaxonomiesChanged } from '@/lib/taxonomyChanges';
import { taxonomyService } from '@/services/taxonomyService';
import type { AsyncData } from '@/types/async';
import type { Taxonomies, TaxonomyKind } from '@/types/taxonomy';
import { useSnackbar } from './useSnackbar';

const ERROR_COPY = copy.snackbar.reorderError;

export function useTaxonomyReorder(mutate: AsyncData<Taxonomies>['mutate']) {
  const { notify } = useSnackbar();

  return useCallback(
    async (kind: TaxonomyKind, ids: number[]) => {
      mutate((current) => reorderTaxonomy(current, kind, ids));
      try {
        await taxonomyService.reorder(kind, ids);
      } catch {
        notify({
          title: ERROR_COPY.title,
          description: ERROR_COPY.description,
        });
      }
      notifyTaxonomiesChanged();
    },
    [mutate, notify],
  );
}
