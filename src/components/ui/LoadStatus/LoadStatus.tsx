import { Button } from '@/components/ui/Button/Button';
import type { LoadStatusProps } from '@/types/components/ui';
import styles from './LoadStatus.module.css';

export function LoadStatus({
  isLoading,
  loadingLabel,
  errorLabel,
  retryLabel,
  onRetry,
}: LoadStatusProps) {
  if (isLoading) {
    return <p className={styles.status}>{loadingLabel}</p>;
  }
  return (
    <div className={styles.status}>
      <p role="alert">{errorLabel}</p>
      <Button variant="secondary" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  );
}
