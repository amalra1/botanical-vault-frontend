'use client';

import { useId, useState } from 'react';
import { DeleteTaxonomyDialog } from '@/components/organize/DeleteTaxonomyDialog/DeleteTaxonomyDialog';
import { TaxonomyItemForm } from '@/components/organize/TaxonomyItemForm/TaxonomyItemForm';
import { TaxonomyItemList } from '@/components/organize/TaxonomyItemList/TaxonomyItemList';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { TaxonomySectionProps } from '@/types/components/organize';
import type { OrganizeItem } from '@/types/taxonomy';
import styles from './TaxonomySection.module.css';

export function TaxonomySection({
  kind,
  items,
  onReorder,
}: TaxonomySectionProps) {
  const titleId = useId();
  const sectionCopy = copy.organize.sections[kind];
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleting, setDeleting] = useState<OrganizeItem | null>(null);

  const startEdit = (id: number) => {
    setIsAdding(false);
    setEditingId(id);
  };

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
  };

  return (
    <section aria-labelledby={titleId} className={styles.section}>
      <div className={styles.heading}>
        <h3 id={titleId} className={styles.title}>
          {sectionCopy.title}
        </h3>
        <p className={styles.description}>{sectionCopy.description}</p>
      </div>
      <div className={styles.card}>
        <TaxonomyItemList
          kind={kind}
          items={items}
          editingId={editingId}
          onEdit={startEdit}
          onCancelEdit={() => setEditingId(null)}
          onDelete={setDeleting}
          onReorder={(ids) => onReorder(kind, ids)}
        />
        {isAdding ? (
          <div className={styles.adding}>
            <TaxonomyItemForm kind={kind} onDone={() => setIsAdding(false)} />
          </div>
        ) : (
          <button type="button" className={styles.add} onClick={startAdd}>
            <span className={styles.addIcon}>
              <Icon name="plus" />
            </span>
            {sectionCopy.add}
          </button>
        )}
      </div>
      <p className={styles.hint}>
        <Icon name="grip" className={styles.hintIcon} />
        {copy.organize.hint}
      </p>
      {deleting && (
        <DeleteTaxonomyDialog
          kind={kind}
          item={deleting}
          items={items}
          onCancel={() => setDeleting(null)}
          onDeleted={() => setDeleting(null)}
        />
      )}
    </section>
  );
}
