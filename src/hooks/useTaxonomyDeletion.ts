import { useState } from 'react';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import { isDeletionReady, reassignTargetId } from '@/lib/organizeItems';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { notifyTaxonomiesChanged } from '@/lib/taxonomyChanges';
import { taxonomyService } from '@/services/taxonomyService';
import type {
  OrganizeItem,
  ReassignTarget,
  TaxonomyKind,
} from '@/types/taxonomy';
import { useSnackbar } from './useSnackbar';

const DIALOG_COPY = copy.organize.deleteDialog;
const DELETED_COPY = copy.snackbar.taxonomyDeleted;

export function useTaxonomyDeletion(
  kind: TaxonomyKind,
  item: OrganizeItem,
  onDeleted: () => void,
) {
  const { notify } = useSnackbar();
  const [target, setTarget] = useState<ReassignTarget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await taxonomyService.delete(kind, item.id, reassignTargetId(target));
      onDeleted();
      notifyTaxonomiesChanged();
      notifyPlantsChanged();
      notify({
        title: DELETED_COPY.title,
        description: formatCopy(DELETED_COPY.description, { name: item.name }),
      });
    } catch {
      setError(DIALOG_COPY.error);
      setIsDeleting(false);
    }
  };

  return {
    target,
    setTarget,
    isDeleting,
    error,
    isReady: isDeletionReady(item, target),
    confirm,
  };
}
