'use client';

import { CollectionGrid } from '@/components/collections/CollectionGrid/CollectionGrid';
import { CollectionModal } from '@/components/collections/CollectionModal/CollectionModal';
import { NewCollectionButton } from '@/components/collections/NewCollectionButton/NewCollectionButton';
import { PlantModalHost } from '@/components/plants/PlantModalHost/PlantModalHost';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { copy } from '@/data/copy';
import { useCollectionModal } from '@/hooks/useCollectionModal';
import { useCollections } from '@/hooks/useCollections';
import { usePlantModal } from '@/hooks/usePlantModal';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import styles from './CollectionsPage.module.css';

const COLLECTIONS_COPY = copy.collections;

export function CollectionsPage() {
  const { data: collections, isLoading, reload } = useCollections();
  const { data: taxonomies } = useTaxonomies();
  const collectionModal = useCollectionModal();
  const plantModal = usePlantModal();

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{copy.pages.collections.title}</h1>
        <NewCollectionButton
          onCreated={(collection) => collectionModal.open(collection.id)}
        />
      </div>
      {collections ? (
        <CollectionGrid
          collections={collections}
          onOpen={collectionModal.open}
        />
      ) : (
        <LoadStatus
          isLoading={isLoading}
          loadingLabel={COLLECTIONS_COPY.loading}
          errorLabel={COLLECTIONS_COPY.errors.load}
          retryLabel={COLLECTIONS_COPY.retry}
          onRetry={reload}
        />
      )}
      {collectionModal.collectionId !== null && (
        <CollectionModal
          key={collectionModal.collectionId}
          collectionId={collectionModal.collectionId}
          onClose={collectionModal.close}
          onOpenPlant={plantModal.openDetail}
        />
      )}
      <PlantModalHost modal={plantModal} origins={taxonomies?.origins ?? []} />
    </main>
  );
}
