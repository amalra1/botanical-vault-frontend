'use client';

import { useState } from 'react';
import { NewCollectionModal } from '@/components/collections/NewCollectionModal/NewCollectionModal';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { Collection } from '@/types/collection';
import type { NewCollectionButtonProps } from '@/types/components/collections';

export function NewCollectionButton({ onCreated }: NewCollectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreated = (collection: Collection) => {
    setIsOpen(false);
    onCreated(collection);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Icon name="plus" />
        {copy.collections.new}
      </Button>
      {isOpen && (
        <NewCollectionModal
          onClose={() => setIsOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
}
