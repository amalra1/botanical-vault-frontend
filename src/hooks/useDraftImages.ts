import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DraftImage } from '@/types/plant';

function toDraftImage(file: File, viewId: number, urls: Set<string>) {
  const previewUrl = URL.createObjectURL(file);
  urls.add(previewUrl);
  return { id: crypto.randomUUID(), file, previewUrl, viewId };
}

export function useDraftImages() {
  const [images, setImages] = useState<DraftImage[]>([]);
  const previewUrls = useRef(new Set<string>());

  useEffect(() => {
    const urls = previewUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const add = useCallback((files: File[], viewId: number) => {
    const created = files.map((file) =>
      toDraftImage(file, viewId, previewUrls.current),
    );
    setImages((current) => [...current, ...created]);
  }, []);

  const remove = useCallback(
    (id: string) => {
      const target = images.find((image) => image.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        previewUrls.current.delete(target.previewUrl);
      }
      setImages((current) => current.filter((image) => image.id !== id));
    },
    [images],
  );

  const setView = useCallback((id: string, viewId: number) => {
    setImages((current) =>
      current.map((image) => (image.id === id ? { ...image, viewId } : image)),
    );
  }, []);

  const move = useCallback((activeId: string, overId: string) => {
    setImages((current) => {
      const from = current.findIndex((image) => image.id === activeId);
      const to = current.findIndex((image) => image.id === overId);
      return from < 0 || to < 0 ? current : arrayMove(current, from, to);
    });
  }, []);

  return { images, add, remove, setView, move };
}
