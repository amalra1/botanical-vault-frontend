'use client';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog/ConfirmDialog';
import { copy } from '@/data/copy';
import { useTaxonomyDeletion } from '@/hooks/useTaxonomyDeletion';
import { formatCopy } from '@/lib/formatCopy';
import { isItemInUse } from '@/lib/organizeItems';
import { pluralCopy } from '@/lib/pluralCopy';
import type { DeleteTaxonomyDialogProps } from '@/types/components/organize';
import { ReassignOptions } from './ReassignOptions';

const DIALOG_COPY = copy.organize.deleteDialog;

export function DeleteTaxonomyDialog({
  kind,
  item,
  items,
  onCancel,
  onDeleted,
}: DeleteTaxonomyDialogProps) {
  const sectionCopy = copy.organize.sections[kind];
  const deletion = useTaxonomyDeletion(kind, item, onDeleted);
  const inUse = isItemInUse(item);

  return (
    <ConfirmDialog
      title={formatCopy(DIALOG_COPY.title, { name: item.name })}
      description={
        inUse
          ? pluralCopy(item.usageCount, sectionCopy.inUse)
          : sectionCopy.unused
      }
      confirmLabel={DIALOG_COPY.confirm}
      confirmingLabel={DIALOG_COPY.deleting}
      cancelLabel={DIALOG_COPY.cancel}
      isConfirming={deletion.isDeleting}
      isConfirmDisabled={!deletion.isReady}
      error={deletion.error}
      onConfirm={deletion.confirm}
      onCancel={onCancel}
    >
      {inUse && (
        <ReassignOptions
          kind={kind}
          item={item}
          items={items}
          target={deletion.target}
          onChange={deletion.setTarget}
        />
      )}
    </ConfirmDialog>
  );
}
