'use client';

import { useId, useMemo } from 'react';
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { DraftImageCard } from '@/components/plants/DraftImageCard/DraftImageCard';
import { DRAG_ACTIVATION_DISTANCE } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import type { DraftImageGridProps } from '@/types/components/plants';
import { AddImagesTile } from './AddImagesTile';
import { draftImageAnnouncements } from './draftImageAnnouncements';
import styles from './DraftImageGrid.module.css';

const IMAGES_COPY = copy.plantForm.images;
const SCREEN_READER_INSTRUCTIONS = {
  draggable: IMAGES_COPY.dragInstructions,
};

export function DraftImageGrid({
  images,
  views,
  onMove,
  onRemove,
  onViewChange,
  onAddFiles,
}: DraftImageGridProps) {
  const titleId = useId();
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
      announcements: draftImageAnnouncements(images),
      screenReaderInstructions: SCREEN_READER_INSTRUCTIONS,
    }),
    [images],
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      onMove(String(active.id), String(over.id));
    }
  };

  return (
    <section aria-labelledby={titleId} className={styles.section}>
      <div className={styles.heading}>
        <h3 id={titleId} className={styles.title}>
          {IMAGES_COPY.title}
        </h3>
        <p className={styles.hint}>{IMAGES_COPY.hint}</p>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        accessibility={accessibility}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <ul className={styles.grid}>
            {images.map((image, index) => (
              <DraftImageCard
                key={image.id}
                image={image}
                isCover={index === 0}
                views={views}
                onRemove={onRemove}
                onViewChange={onViewChange}
              />
            ))}
            <li className={styles.addItem}>
              <AddImagesTile onFiles={onAddFiles} />
            </li>
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
}
