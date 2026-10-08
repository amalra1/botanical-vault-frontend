'use client';

import { useId } from 'react';
import { copy } from '@/data/copy';
import { useCollectionPlantRemoval } from '@/hooks/useCollectionPlantRemoval';
import { formatCopy } from '@/lib/formatCopy';
import type { CollectionPlantListProps } from '@/types/components/collections';
import { CollectionPlantRow } from './CollectionPlantRow';
import styles from './CollectionPlantList.module.css';

const MODAL_COPY = copy.collectionModal;

export function CollectionPlantList({
  collection,
  onOpenPlant,
}: CollectionPlantListProps) {
  const headingId = useId();
  const removePlant = useCollectionPlantRemoval(collection);
  const removeCopy = collection.favorites
    ? MODAL_COPY.unfavorite
    : MODAL_COPY.remove;

  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <h3 id={headingId} className={styles.title}>
        {MODAL_COPY.plantsTitle}
      </h3>
      <ul className={styles.list}>
        {collection.plants.map((plant) => (
          <li key={plant.id}>
            <CollectionPlantRow
              plant={plant}
              removeLabel={formatCopy(removeCopy, { name: plant.commonName })}
              onOpen={onOpenPlant}
              onRemove={removePlant}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
