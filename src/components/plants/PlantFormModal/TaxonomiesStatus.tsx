import { Button } from '@/components/ui/Button/Button';
import { copy } from '@/data/copy';
import type { TaxonomiesStatusProps } from '@/types/components/plants';
import styles from './PlantFormModal.module.css';

export function TaxonomiesStatus({
  isLoading,
  onRetry,
}: TaxonomiesStatusProps) {
  if (isLoading) {
    return <p className={styles.status}>{copy.plantForm.loading}</p>;
  }
  return (
    <div className={styles.status}>
      <p role="alert">{copy.plantForm.errors.loadTaxonomies}</p>
      <Button variant="secondary" onClick={onRetry}>
        {copy.plantForm.retry}
      </Button>
    </div>
  );
}
