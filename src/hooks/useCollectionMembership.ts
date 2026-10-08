import { useState } from 'react';
import { copy } from '@/data/copy';
import { notifyCollectionsChanged } from '@/lib/collectionChanges';
import { withMembership } from '@/lib/membership';
import { collectionService } from '@/services/collectionService';
import type { CollectionMembership } from '@/types/collection';
import type { Plant } from '@/types/plant';
import { useSnackbar } from './useSnackbar';

export function useCollectionMembership(plant: Plant): CollectionMembership {
  const { notify } = useSnackbar();
  const [selectedIds, setSelectedIds] = useState(
    () => new Set(plant.collectionIds),
  );

  const update = async (collectionId: number, isMember: boolean) => {
    setSelectedIds((current) =>
      withMembership(current, collectionId, isMember),
    );
    try {
      await (isMember
        ? collectionService.addPlant(collectionId, plant.id)
        : collectionService.removePlant(collectionId, plant.id));
      notifyCollectionsChanged();
    } catch {
      setSelectedIds((current) =>
        withMembership(current, collectionId, !isMember),
      );
      notify(copy.snackbar.membershipError);
    }
  };

  return { selectedIds, update };
}
