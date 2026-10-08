'use client';

import { useMemo } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaxonomyItemRow } from '@/components/organize/TaxonomyItemRow/TaxonomyItemRow';
import { DRAG_ACTIVATION_DISTANCE } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import { canDeleteItem } from '@/lib/organizeItems';
import type { TaxonomyItemListProps } from '@/types/components/organize';
import { taxonomyAnnouncements } from './taxonomyAnnouncements';
import styles from './TaxonomyItemList.module.css';

const SCREEN_READER_INSTRUCTIONS = {
  draggable: copy.organize.item.dragInstructions,
};

export function TaxonomyItemList({
  kind,
  items,
  editingId,
  onEdit,
  onCancelEdit,
  onDelete,
  onReorder,
}: TaxonomyItemListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const accessibility = useMemo(
    () => ({
      announcements: taxonomyAnnouncements(items),
      screenReaderInstructions: SCREEN_READER_INSTRUCTIONS,
    }),
    [items],
  );
  const ids = items.map((item) => item.id);
  const canDelete = canDeleteItem(kind, items.length);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    const from = ids.indexOf(Number(active.id));
    const to = ids.indexOf(Number(over.id));
    onReorder(arrayMove(ids, from, to));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      accessibility={accessibility}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className={styles.list}>
          {items.map((item) => (
            <TaxonomyItemRow
              key={item.id}
              kind={kind}
              item={item}
              isEditing={item.id === editingId}
              canDelete={canDelete}
              onEdit={onEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
