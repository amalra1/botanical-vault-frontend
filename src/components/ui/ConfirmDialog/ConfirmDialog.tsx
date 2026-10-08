'use client';

import { useId } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import type { ConfirmDialogProps } from '@/types/components/ui';
import styles from './ConfirmDialog.module.css';

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  confirmingLabel,
  cancelLabel,
  isConfirming,
  isConfirmDisabled = false,
  error,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      role="alertdialog"
      labelledBy={titleId}
      describedBy={descriptionId}
      onClose={onCancel}
      className={styles.dialog}
    >
      <h3 id={titleId} className={styles.title}>
        {title}
      </h3>
      <p id={descriptionId} className={styles.description}>
        {description}
      </p>
      {children}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant="danger"
          isLoading={isConfirming}
          disabled={isConfirmDisabled}
          onClick={onConfirm}
        >
          {isConfirming ? confirmingLabel : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
