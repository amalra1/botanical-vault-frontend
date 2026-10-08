import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { FileDrop } from '@/types/fileDrop';

const FILES_DATA_TYPE = 'Files';

function hasFiles(event: DragEvent<HTMLElement>) {
  return Array.from(event.dataTransfer.types).includes(FILES_DATA_TYPE);
}

export function useFileDrop(onFiles: (files: File[]) => void): FileDrop {
  const [isDragging, setIsDragging] = useState(false);
  const depth = useRef(0);

  return {
    isDragging,
    dropHandlers: {
      onDragEnter: (event) => {
        if (!hasFiles(event)) {
          return;
        }
        event.preventDefault();
        depth.current += 1;
        setIsDragging(true);
      },
      onDragOver: (event) => {
        if (hasFiles(event)) {
          event.preventDefault();
        }
      },
      onDragLeave: () => {
        depth.current = Math.max(0, depth.current - 1);
        setIsDragging(depth.current > 0);
      },
      onDrop: (event) => {
        event.preventDefault();
        depth.current = 0;
        setIsDragging(false);
        onFiles(Array.from(event.dataTransfer.files));
      },
    },
  };
}
