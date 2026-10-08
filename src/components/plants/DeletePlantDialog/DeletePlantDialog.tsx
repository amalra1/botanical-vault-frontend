'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog';
import { copy } from '@/data/copy';
import { useSnackbar } from '@/hooks/useSnackbar';
import { formatCopy } from '@/lib/formatCopy';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { pluralCopy } from '@/lib/pluralCopy';
import { plantService } from '@/services/plantService';
import type { DeletePlantDialogProps } from '@/types/components/plantDetail';

const DIALOG_COPY = copy.deleteDialog;
const DELETED_COPY = copy.snackbar.plantDeleted;

export function DeletePlantDialog({
  plant,
  onCancel,
  onDeleted,
}: DeletePlantDialogProps) {
  const { notify } = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = plant.commonName;

  const confirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await plantService.delete(plant.id);
      notifyPlantsChanged();
      notify({
        title: DELETED_COPY.title,
        description: formatCopy(DELETED_COPY.description, { name }),
      });
      onDeleted();
    } catch {
      setError(DIALOG_COPY.error);
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmDialog
      title={formatCopy(DIALOG_COPY.title, { name })}
      description={pluralCopy(plant.images.length, DIALOG_COPY.description)}
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
