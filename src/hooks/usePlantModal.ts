import { useCallback, useState } from 'react';
import type {
  PlantModalController,
  PlantModalState,
} from '@/types/plantEditing';

export function usePlantModal(): PlantModalController {
  const [state, setState] = useState<PlantModalState | null>(null);

  const openDetail = useCallback(
    (plantId: number) => setState({ plantId, mode: 'detail' }),
    [],
  );
  const openEdit = useCallback(
    () => setState((current) => current && { ...current, mode: 'edit' }),
    [],
  );
  const backToDetail = useCallback(
    () => setState((current) => current && { ...current, mode: 'detail' }),
    [],
  );
  const close = useCallback(() => setState(null), []);

  return { state, openDetail, openEdit, backToDetail, close };
}
