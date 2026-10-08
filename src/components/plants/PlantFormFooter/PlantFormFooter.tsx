import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { PlantFormFooterProps } from '@/types/components/plants';
import styles from './PlantFormFooter.module.css';

const FOOTER_COPY = copy.plantForm.footer;

export function PlantFormFooter({
  canSave,
  isSaving,
  isEditing,
  error,
  onCancel,
  onDelete,
}: PlantFormFooterProps) {
  const saveLabel = isEditing ? FOOTER_COPY.saveChanges : FOOTER_COPY.save;

  return (
    <div className={styles.footer}>
      {onDelete && (
        <Button
          variant="secondary"
          className={styles.delete}
          onClick={onDelete}
        >
          <Icon name="trash" />
          {FOOTER_COPY.delete}
        </Button>
      )}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>
          {FOOTER_COPY.cancel}
        </Button>
        <Button
          type="submit"
          disabled={!canSave}
          isLoading={isSaving}
          title={canSave ? undefined : FOOTER_COPY.saveDisabledHint}
        >
          <Icon name="check" />
          {isSaving ? FOOTER_COPY.saving : saveLabel}
        </Button>
      </div>
    </div>
  );
}
