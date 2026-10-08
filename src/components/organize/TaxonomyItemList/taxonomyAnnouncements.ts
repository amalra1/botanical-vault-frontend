import type { Announcements } from '@dnd-kit/core';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type { OrganizeItem } from '@/types/taxonomy';

const ITEM_COPY = copy.organize.item;

export function taxonomyAnnouncements(items: OrganizeItem[]): Announcements {
  const total = items.length;
  const nameOf = (id: string | number) =>
    items.find((item) => item.id === id)?.name ?? '';
  const positionOf = (id: string | number | undefined) =>
    items.findIndex((item) => item.id === id) + 1;

  return {
    onDragStart: ({ active }) =>
      formatCopy(ITEM_COPY.dragStart, {
        name: nameOf(active.id),
        position: positionOf(active.id),
        total,
      }),
    onDragOver: ({ active, over }) =>
      over
        ? formatCopy(ITEM_COPY.dragOver, {
            name: nameOf(active.id),
            position: positionOf(over.id),
            total,
          })
        : undefined,
    onDragEnd: ({ active, over }) =>
      formatCopy(ITEM_COPY.dragEnd, {
        name: nameOf(active.id),
        position: positionOf(over?.id ?? active.id),
        total,
      }),
    onDragCancel: ({ active }) =>
      formatCopy(ITEM_COPY.dragCancel, { name: nameOf(active.id) }),
  };
}
