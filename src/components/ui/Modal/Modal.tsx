'use client';

import { useEffect, useRef } from 'react';
import type { DragEvent, MouseEvent, SyntheticEvent } from 'react';
import { cx } from '@/lib/classNames';
import type { ModalProps } from '@/types/components/ui';
import styles from './Modal.module.css';

function preventFileNavigation(event: DragEvent<HTMLDialogElement>) {
  event.preventDefault();
}

export function Modal({
  labelledBy,
  onClose,
  className,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previousFocus?.focus();
    };
  }, []);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={cx(styles.dialog, className)}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      onDragOver={preventFileNavigation}
      onDrop={preventFileNavigation}
    >
      <div className={styles.panel}>{children}</div>
    </dialog>
  );
}
