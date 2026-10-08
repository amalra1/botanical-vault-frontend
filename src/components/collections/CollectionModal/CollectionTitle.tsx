'use client';

import { useState } from 'react';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import type { CollectionTitleProps } from '@/types/components/collections';
import { CollectionRenameForm } from './CollectionRenameForm';
import styles from './CollectionTitle.module.css';

export function CollectionTitle({ titleId, collection }: CollectionTitleProps) {
  const [isRenaming, setIsRenaming] = useState(false);

  return (
    <div className={styles.row}>
      <h2 id={titleId} className={cx(styles.title, isRenaming && 'sr-only')}>
        {collection.name}
      </h2>
      {isRenaming ? (
        <CollectionRenameForm
          collection={collection}
          onDone={() => setIsRenaming(false)}
        />
      ) : (
        !collection.favorites && (
          <IconButton
            icon="pencil"
            label={copy.collectionModal.rename}
            onClick={() => setIsRenaming(true)}
          />
        )
      )}
    </div>
  );
}
