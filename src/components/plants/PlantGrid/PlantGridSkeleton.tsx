import { SKELETON_CARD_COUNT } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import styles from './PlantGrid.module.css';

const SKELETON_KEYS = Array.from(
  { length: SKELETON_CARD_COUNT },
  (_, index) => index,
);

export function PlantGridSkeleton() {
  return (
    <ul
      className={styles.grid}
      aria-busy="true"
      aria-label={copy.plants.loading}
    >
      {SKELETON_KEYS.map((key) => (
        <li key={key} className={styles.skeleton} />
      ))}
    </ul>
  );
}
