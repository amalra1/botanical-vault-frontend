import Image from 'next/image';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { COLLECTION_THUMB_IMAGE_SIZES } from '@/constants/collections';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { sizeShortLabel } from '@/lib/sizeLabels';
import type { CollectionPlantRowProps } from '@/types/components/collections';
import styles from './CollectionPlantRow.module.css';

export function CollectionPlantRow({
  plant,
  removeLabel,
  onOpen,
  onRemove,
}: CollectionPlantRowProps) {
  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.open}
        aria-label={formatCopy(copy.collectionModal.openPlant, {
          name: plant.commonName,
        })}
        onClick={() => onOpen(plant.id)}
      >
        <span className={cx(styles.thumb, 'checker')}>
          {plant.coverUrl && (
            <Image
              src={plant.coverUrl}
              alt=""
              fill
              sizes={COLLECTION_THUMB_IMAGE_SIZES}
              className={styles.image}
            />
          )}
        </span>
        <span className={styles.names}>
          <span className={styles.name}>{plant.commonName}</span>
          {plant.scientificName && (
            <span className={styles.scientific}>{plant.scientificName}</span>
          )}
        </span>
        <span className={styles.size} aria-hidden="true">
          {sizeShortLabel(plant.size)}
        </span>
      </button>
      <IconButton
        icon="minus"
        label={removeLabel}
        onClick={() => onRemove(plant)}
      />
    </div>
  );
}
