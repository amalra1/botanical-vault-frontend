'use client';

import { useId } from 'react';
import { PlantForm } from '@/components/plants/PlantForm/PlantForm';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Modal } from '@/components/ui/Modal/Modal';
import { copy } from '@/data/copy';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import type { PlantFormModalProps } from '@/types/components/plants';
import { TaxonomiesStatus } from './TaxonomiesStatus';
import styles from './PlantFormModal.module.css';

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
        <TaxonomiesStatus isLoading={isLoading} onRetry={reload} />
      )}
    </Modal>
  );
}
