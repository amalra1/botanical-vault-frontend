'use client';

import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { DRAFT_IMAGE_SIZES } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import type { DraftImageCardProps } from '@/types/components/plants';
import styles from './DraftImageCard.module.css';

const IMAGES_COPY = copy.plantForm.images;

export function DraftImageCard({
  image,
  isCover,
  views,
  onRemove,
  onViewChange,
}: DraftImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });
  const file = image.file.name;
  const viewOptions = views.map((view) => ({
    value: view.id,
    label: view.name,
  }));

  return (
    <li
      ref={setNodeRef}
      className={cx(styles.card, isDragging && styles.dragging)}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className={cx(styles.thumb, 'checker')}>
        <div
          ref={setActivatorNodeRef}
          className={styles.handle}
          {...attributes}
          {...listeners}
          aria-label={formatCopy(IMAGES_COPY.reorder, { file })}
        >
          <Image
            src={image.previewUrl}
            alt=""
            fill
            sizes={DRAFT_IMAGE_SIZES}
            className={styles.image}
          />
        </div>
        {isCover && <span className={styles.cover}>{IMAGES_COPY.cover}</span>}
        <IconButton
          icon="close"
          variant="glass"
          label={formatCopy(IMAGES_COPY.remove, { file })}
          className={styles.remove}
          onClick={() => onRemove(image.id)}
        />
      </div>
      <span className={styles.filename} title={file}>
        {file}
      </span>
      <SegmentedControl
        label={formatCopy(IMAGES_COPY.viewGroup, { file })}
        options={viewOptions}
        value={image.viewId}
        onChange={(viewId) => onViewChange(image.id, viewId)}
        size="sm"
      />
    </li>
  );
}
