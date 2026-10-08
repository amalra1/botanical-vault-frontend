import { useCallback, useState } from 'react';
import type { CollectionModalController } from '@/types/collection';

export function useCollectionModal(): CollectionModalController {
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const open = useCallback((id: number) => setCollectionId(id), []);
  const close = useCallback(() => setCollectionId(null), []);

  return { collectionId, open, close };
}
