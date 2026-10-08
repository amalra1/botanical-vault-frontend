import { CollectionCard } from '@/components/collections/CollectionCard/CollectionCard';
import type { CollectionGridProps } from '@/types/components/collections';
import styles from './CollectionGrid.module.css';

export function CollectionGrid({ collections, onOpen }: CollectionGridProps) {
  return (
    <ul className={styles.grid}>
      {collections.map((collection) => (
        <li key={collection.id}>
          <CollectionCard collection={collection} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
