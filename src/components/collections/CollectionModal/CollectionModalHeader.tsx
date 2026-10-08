import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import { useCollectionDownload } from '@/hooks/useCollectionDownload';
import { collectionMeta } from '@/lib/collectionMeta';
import type { CollectionModalHeaderProps } from '@/types/components/collections';
import { CollectionTitle } from './CollectionTitle';
import styles from './CollectionModalHeader.module.css';

const MODAL_COPY = copy.collectionModal;

export function CollectionModalHeader({
  titleId,
  collection,
  onAddPlants,
  onDelete,
  onClose,
}: CollectionModalHeaderProps) {
  const { isDownloading, download } = useCollectionDownload(collection);

  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <CollectionTitle titleId={titleId} collection={collection} />
        <p className={styles.meta}>
          {collectionMeta(collection.plants.length, collection.updatedAt)}
        </p>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onAddPlants}>
          <Icon name="plus" />
          {MODAL_COPY.addPlants}
        </Button>
        <Button
          variant="secondary"
          isLoading={isDownloading}
          disabled={collection.plants.length === 0}
          onClick={download}
        >
          <Icon name="download" />
          {isDownloading ? MODAL_COPY.downloading : MODAL_COPY.download}
        </Button>
        {!collection.favorites && (
          <IconButton
            icon="trash"
            label={MODAL_COPY.delete}
            onClick={onDelete}
          />
        )}
        <IconButton icon="close" label={copy.modal.close} onClick={onClose} />
      </div>
    </header>
  );
}
