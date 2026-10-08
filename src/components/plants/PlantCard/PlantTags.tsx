import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { originTone } from '@/lib/originTone';
import type { PlantCardProps } from '@/types/components/plants';
import styles from './PlantTags.module.css';

const TONE_CLASSES = [styles.tone0, styles.tone1, styles.tone2];

export function PlantTags({ plant, origins }: PlantCardProps) {
  return (
    <ul className={styles.tags}>
      {plant.origins.map((origin) => (
        <li
          key={origin.id}
          className={cx(
            styles.tag,
            TONE_CLASSES[originTone(origin.id, origins)],
          )}
        >
          {origin.name}
        </li>
      ))}
      {plant.origins.length === 0 && (
        <li className={cx(styles.tag, styles.unclassified)}>
          {copy.plants.filters.unclassified}
        </li>
      )}
      <li className={cx(styles.tag, styles.type)}>{plant.type.name}</li>
    </ul>
  );
}
