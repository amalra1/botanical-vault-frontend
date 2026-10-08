'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { NewCollectionModal } from '@/components/collections/NewCollectionModal/NewCollectionModal';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import { useCollectionMembership } from '@/hooks/useCollectionMembership';
import { useOutsidePointerDown } from '@/hooks/useOutsidePointerDown';
import { handleLocalEscape } from '@/lib/localEscape';
import type { Collection } from '@/types/collection';
import type { CollectionPickerProps } from '@/types/components/collections';
import { CollectionPickerPanel } from './CollectionPickerPanel';
import styles from './CollectionPicker.module.css';

export function CollectionPicker({ plant }: CollectionPickerProps) {
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const membership = useCollectionMembership(plant);
  const close = useCallback(() => setIsOpen(false), []);

  useOutsidePointerDown(containerRef, isOpen && !isCreating, close);

  const closeAndFocusTrigger = () => {
    close();
    triggerRef.current?.focus();
  };

  const handleCreated = (collection: Collection) => {
    setIsCreating(false);
    void membership.update(collection.id, true);
  };

  return (
    <div
      ref={containerRef}
      className={styles.picker}
      onKeyDown={(event) => {
        if (isOpen && !isCreating) {
          handleLocalEscape(event, closeAndFocusTrigger);
        }
      }}
    >
      <Button
        ref={triggerRef}
        variant="secondary"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Icon name="collection" />
        {copy.collectionPicker.button}
      </Button>
      {isOpen && (
        <CollectionPickerPanel
          id={panelId}
          membership={membership}
          onCreateCollection={() => setIsCreating(true)}
        />
      )}
      {isCreating && (
        <NewCollectionModal
          onClose={() => setIsCreating(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
