import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import type { ModalHeaderProps } from '@/types/components/ui';
import styles from './ModalHeader.module.css';

export function ModalHeader({ titleId, title, onClose }: ModalHeaderProps) {
  return (
    <header className={styles.header}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <IconButton icon="close" label={copy.modal.close} onClick={onClose} />
    </header>
  );
}
