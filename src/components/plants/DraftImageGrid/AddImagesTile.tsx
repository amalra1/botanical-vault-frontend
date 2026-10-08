import { FileDropButton } from '@/components/ui/FileDropButton/FileDropButton';
import { Icon } from '@/components/ui/Icon/Icon';
import { PNG_MIME_TYPE } from '@/constants/upload';
import { copy } from '@/data/copy';
import type { AddImagesTileProps } from '@/types/components/plants';
import styles from './DraftImageGrid.module.css';

export function AddImagesTile({ onFiles }: AddImagesTileProps) {
  return (
    <FileDropButton
      accept={PNG_MIME_TYPE}
      onFiles={onFiles}
      className={styles.addTile}
    >
      <span className={styles.addIcon}>
        <Icon name="plus" />
      </span>
      {copy.plantForm.images.more}
    </FileDropButton>
  );
}
