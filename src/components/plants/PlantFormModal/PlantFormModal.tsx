'use client';

import { useId } from 'react';
import { PlantForm } from '@/components/plants/PlantForm/PlantForm';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { copy } from '@/data/copy';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import type { PlantFormModalProps } from '@/types/components/plants';
import styles from './PlantFormModal.module.css';

const FORM_COPY = copy.plantForm;

export function PlantFormModal({ onClose }: PlantFormModalProps) {
  const titleId = useId();
  const { data, isLoading, reload } = useTaxonomies();

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {copy.plantForm.titleNew}
        </h2>
        <IconButton icon="close" label={copy.modal.close} onClick={onClose} />
      </header>
      {data ? (
        <PlantForm taxonomies={data} onClose={onClose} />
      ) : (
        <LoadStatus
          isLoading={isLoading}
          loadingLabel={FORM_COPY.loading}
          errorLabel={FORM_COPY.errors.loadTaxonomies}
          retryLabel={FORM_COPY.retry}
          onRetry={reload}
        />
      )}
    </Modal>
  );
}
