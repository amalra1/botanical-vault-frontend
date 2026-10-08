'use client';

import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useFileDrop } from '@/hooks/useFileDrop';
import type { FileDropButtonProps } from '@/types/components/ui';

export function FileDropButton({
  accept,
  onFiles,
  className,
  children,
}: FileDropButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDragging, dropHandlers } = useFileDrop(onFiles);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = '';
    if (files.length > 0) {
      onFiles(files);
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        data-dragging={isDragging || undefined}
        onClick={() => inputRef.current?.click()}
        {...dropHandlers}
      >
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        tabIndex={-1}
        onChange={handleChange}
      />
    </>
  );
}
