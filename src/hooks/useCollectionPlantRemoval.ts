import { copy } from '@/data/copy';
import { notifyCollectionsChanged } from '@/lib/collectionChanges';
import { notifyFavoriteChanged } from '@/lib/favoriteChanges';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { collectionService } from '@/services/collectionService';
import { plantService } from '@/services/plantService';
import type { Collection } from '@/types/collection';
import type { PlantSummary } from '@/types/plant';
import { useSnackbar } from './useSnackbar';

export function useCollectionPlantRemoval({ id, favorites }: Collection) {
  const { notify } = useSnackbar();

  return async (plant: PlantSummary) => {
    try {
      if (favorites) {
        await plantService.setFavorite(plant.id, false);
        notifyFavoriteChanged({ plantId: plant.id, favorite: false });
        notifyPlantsChanged();
      } else {
        await collectionService.removePlant(id, plant.id);
        notifyCollectionsChanged();
      }
    } catch {
      notify(copy.snackbar.membershipError);
    }
  };
}
