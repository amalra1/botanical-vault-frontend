import { FileDropButton } from '@/components/ui/FileDropButton/FileDropButton';
import { Icon } from '@/components/ui/Icon/Icon';
import { PNG_MIME_TYPE } from '@/constants/upload';
import { copy } from '@/data/copy';
import type { ImageDropZoneProps } from '@/types/components/plants';
import styles from './ImageDropZone.module.css';

const DROP_COPY = copy.plantForm.drop;

export function ImageDropZone({ onFiles, error }: ImageDropZoneProps) {
  return (
    <section aria-label={DROP_COPY.title} className={styles.zone}>
      <FileDropButton
        accept={PNG_MIME_TYPE}
        onFiles={onFiles}
        className={styles.target}
      >
        <span className={styles.plus}>
          <Icon name="plus" className={styles.plusIcon} />
        </span>
        <span className={styles.title}>{DROP_COPY.title}</span>
        <span className={styles.description}>{DROP_COPY.description}</span>
      </FileDropButton>
      <p className={styles.note}>{DROP_COPY.note}</p>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </section>
  );
}
