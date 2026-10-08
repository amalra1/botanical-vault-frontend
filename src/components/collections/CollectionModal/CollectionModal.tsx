'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CollectionPlantList } from '@/components/collections/CollectionPlantList/CollectionPlantList';
import { DeleteCollectionDialog } from '@/components/collections/DeleteCollectionDialog/DeleteCollectionDialog';
import { SizeStaircase } from '@/components/collections/SizeStaircase/SizeStaircase';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { ROUTES } from '@/constants/routes';
import { copy } from '@/data/copy';
import { useCollection } from '@/hooks/useCollection';
import type { CollectionModalProps } from '@/types/components/collections';
import { CollectionModalHeader } from './CollectionModalHeader';
import styles from './CollectionModal.module.css';

const MODAL_COPY = copy.collectionModal;

export function CollectionModal({
  collectionId,
  onClose,
  onOpenPlant,
}: CollectionModalProps) {
  const titleId = useId();
  const router = useRouter();
  const { data: collection, isLoading, reload } = useCollection(collectionId);
  const [isDeleting, setIsDeleting] = useState(false);

  const addPlants = () => {
    onClose();
    router.push(ROUTES.plants);
  };

  if (!collection) {
    return (
      <Modal labelledBy={titleId} onClose={onClose}>
        <ModalHeader
          titleId={titleId}
          title={MODAL_COPY.title}
          onClose={onClose}
        />
        <LoadStatus
          isLoading={isLoading}
          loadingLabel={MODAL_COPY.loading}
          errorLabel={MODAL_COPY.errors.load}
          retryLabel={MODAL_COPY.retry}
          onRetry={reload}
        />
      </Modal>
    );
  }

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <CollectionModalHeader
        titleId={titleId}
        collection={collection}
        onAddPlants={addPlants}
        onDelete={() => setIsDeleting(true)}
        onClose={onClose}
      />
      {collection.plants.length > 0 ? (
        <>
          <SizeStaircase collection={collection} />
          <CollectionPlantList
            collection={collection}
            onOpenPlant={onOpenPlant}
          />
        </>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>{MODAL_COPY.emptyTitle}</p>
          <p className={styles.emptyDescription}>
            {MODAL_COPY.emptyDescription}
          </p>
        </div>
      )}
      {isDeleting && (
        <DeleteCollectionDialog
          collection={collection}
          onCancel={() => setIsDeleting(false)}
          onDeleted={onClose}
        />
      )}
    </Modal>
  );
}
