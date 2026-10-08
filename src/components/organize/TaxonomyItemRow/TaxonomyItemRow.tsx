'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaxonomyItemForm } from '@/components/organize/TaxonomyItemForm/TaxonomyItemForm';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { usageLabel } from '@/lib/organizeItems';
import type { TaxonomyItemRowProps } from '@/types/components/organize';
import styles from './TaxonomyItemRow.module.css';

const ITEM_COPY = copy.organize.item;

export function TaxonomyItemRow({
  kind,
  item,
  isEditing,
  canDelete,
  onEdit,
  onCancelEdit,
  onDelete,
}: TaxonomyItemRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: isEditing });
  const name = item.name;

  return (
    <li
      ref={setNodeRef}
      className={cx(styles.row, isDragging && styles.dragging)}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {isEditing ? (
        <TaxonomyItemForm kind={kind} item={item} onDone={onCancelEdit} />
      ) : (
        <>
          <button
            type="button"
            ref={setActivatorNodeRef}
            className={styles.handle}
            {...attributes}
            {...listeners}
            aria-label={formatCopy(ITEM_COPY.reorder, { name })}
          >
            <Icon name="grip" />
          </button>
          <div className={styles.text}>
            <span className={styles.name}>{name}</span>
            {item.description && (
              <span className={styles.description}>{item.description}</span>
            )}
          </div>
          <span className={styles.usage}>
            {usageLabel(item.usageCount, copy.organize.sections[kind].usage)}
          </span>
          <IconButton
            icon="pencil"
            label={formatCopy(ITEM_COPY.rename, { name })}
            className={styles.action}
            onClick={() => onEdit(item.id)}
          />
          {canDelete && (
            <IconButton
              icon="trash"
              label={formatCopy(ITEM_COPY.delete, { name })}
              className={cx(styles.action, styles.delete)}
              onClick={() => onDelete(item)}
            />
          )}
        </>
      )}
    </li>
  );
}
