import { PlantCard } from '@/components/plants/PlantCard/PlantCard';
import { cx } from '@/lib/classNames';
import type { PlantGridProps } from '@/types/components/plants';
import styles from './PlantGrid.module.css';

export function PlantGrid({ plants, origins, isUpdating }: PlantGridProps) {
  return (
    <ul
      className={cx(styles.grid, isUpdating && styles.updating)}
      aria-busy={isUpdating || undefined}
    >
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard plant={plant} origins={origins} />
        </li>
      ))}
    </ul>
  );
}
