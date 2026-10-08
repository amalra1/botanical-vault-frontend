'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog';
import { copy } from '@/data/copy';
import { useSnackbar } from '@/hooks/useSnackbar';
import { notifyCollectionsChanged } from '@/lib/collectionChanges';
import { formatCopy } from '@/lib/formatCopy';
import { collectionService } from '@/services/collectionService';
import type { DeleteCollectionDialogProps } from '@/types/components/collections';

const DIALOG_COPY = copy.deleteCollectionDialog;
const DELETED_COPY = copy.snackbar.collectionDeleted;

export function DeleteCollectionDialog({
  collection,
  onCancel,
  onDeleted,
}: DeleteCollectionDialogProps) {
  const { notify } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = collection.name;

  const confirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await collectionService.delete(collection.id);
      onDeleted();
      notifyCollectionsChanged();
      notify({
        title: DELETED_COPY.title,
        description: formatCopy(DELETED_COPY.description, { name }),
      });
    } catch {
      setError(DIALOG_COPY.error);
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmDialog
      title={formatCopy(DIALOG_COPY.title, { name })}
      description={DIALOG_COPY.description}
      confirmLabel={DIALOG_COPY.confirm}
      confirmingLabel={DIALOG_COPY.deleting}
      cancelLabel={DIALOG_COPY.cancel}
      isConfirming={isDeleting}
      error={error}
      onConfirm={confirm}
      onCancel={onCancel}
    />
  );
}
