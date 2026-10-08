import { CollectionMosaic } from '@/components/collections/CollectionCard/CollectionMosaic';
import { SizeCoverageDots } from '@/components/collections/SizeCoverageDots/SizeCoverageDots';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import { collectionMeta } from '@/lib/collectionMeta';
import type { CollectionCardProps } from '@/types/components/collections';
import styles from './CollectionCard.module.css';

export function CollectionCard({ collection, onOpen }: CollectionCardProps) {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(collection.id)}
    >
      <span className={styles.cover}>
        <CollectionMosaic urls={collection.mosaicUrls} />
        {collection.favorites && (
          <span className={styles.fixed}>
            <Icon name="heart" className={styles.fixedIcon} />
            {copy.collections.fixed}
          </span>
        )}
      </span>
      <span className={styles.body}>
        <span className={styles.name}>{collection.name}</span>
        <span className={styles.meta}>
          {collectionMeta(collection.plantCount, collection.updatedAt)}
        </span>
        <SizeCoverageDots coverage={collection.sizeCoverage} />
      </span>
    </button>
  );
}
