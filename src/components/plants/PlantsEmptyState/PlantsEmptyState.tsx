import { NewPlantButton } from '@/components/plants/NewPlantButton/NewPlantButton';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { PlantsEmptyStateProps } from '@/types/components/plants';
import styles from './PlantsEmptyState.module.css';

const EMPTY_COPY = copy.plants.empty;

export function PlantsEmptyState({ variant, onClear }: PlantsEmptyStateProps) {
  const isLibraryEmpty = variant === 'emptyLibrary';

  return (
    <div className={styles.empty}>
      <Icon name="leaf" className={styles.icon} />
      <h3 className={styles.title}>
        {isLibraryEmpty ? EMPTY_COPY.libraryTitle : EMPTY_COPY.noResultsTitle}
      </h3>
      <p className={styles.description}>
        {isLibraryEmpty
          ? EMPTY_COPY.libraryDescription
          : EMPTY_COPY.noResultsDescription}
      </p>
      {isLibraryEmpty ? (
        <NewPlantButton />
      ) : (
        <Button variant="secondary" onClick={onClear}>
          {copy.plants.results.clearFilters}
        </Button>
      )}
    </div>
  );
}
