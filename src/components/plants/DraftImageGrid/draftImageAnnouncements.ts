import type { Announcements } from '@dnd-kit/core';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type { DraftImage } from '@/types/plant';

const IMAGES_COPY = copy.plantForm.images;

export function draftImageAnnouncements(images: DraftImage[]): Announcements {
  const total = images.length;
  const filenameOf = (id: string | number) =>
    images.find((image) => image.id === id)?.file.name ?? '';
  const positionOf = (id: string | number | undefined) =>
    images.findIndex((image) => image.id === id) + 1;

  return {
    onDragStart: ({ active }) =>
      formatCopy(IMAGES_COPY.dragStart, {
        file: filenameOf(active.id),
        position: positionOf(active.id),
        total,
      }),
    onDragOver: ({ active, over }) =>
      over
        ? formatCopy(IMAGES_COPY.dragOver, {
            file: filenameOf(active.id),
            position: positionOf(over.id),
            total,
          })
        : undefined,
    onDragEnd: ({ active, over }) =>
      formatCopy(IMAGES_COPY.dragEnd, {
        file: filenameOf(active.id),
        position: positionOf(over?.id ?? active.id),
        total,
      }),
    onDragCancel: ({ active }) =>
      formatCopy(IMAGES_COPY.dragCancel, { file: filenameOf(active.id) }),
  };
}
