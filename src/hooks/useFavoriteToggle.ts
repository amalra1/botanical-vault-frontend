import { useState } from 'react';
import { copy } from '@/data/copy';
import { notifyFavoriteChanged } from '@/lib/favoriteChanges';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { plantService } from '@/services/plantService';
import type { FavoriteTarget } from '@/types/collection';
import { useSnackbar } from './useSnackbar';

export function useFavoriteToggle({ id, favorite }: FavoriteTarget) {
  const { notify } = useSnackbar();
  const [isPending, setIsPending] = useState(false);

  const toggle = async () => {
    if (isPending) {
      return;
    }
    const next = !favorite;
    setIsPending(true);
    notifyFavoriteChanged({ plantId: id, favorite: next });
    try {
      await plantService.setFavorite(id, next);
      notifyPlantsChanged();
    } catch {
      notifyFavoriteChanged({ plantId: id, favorite });
      notify(copy.snackbar.favoriteError);
    } finally {
      setIsPending(false);
    }
  };

  return { toggle, isPending };
}
