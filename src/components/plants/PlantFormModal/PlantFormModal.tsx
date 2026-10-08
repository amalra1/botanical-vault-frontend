'use client';

import { useId } from 'react';
import { PlantForm } from '@/components/plants/PlantForm/PlantForm';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { copy } from '@/data/copy';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import type { PlantFormModalProps } from '@/types/components/plants';

const FORM_COPY = copy.plantForm;

export function PlantFormModal({ onClose }: PlantFormModalProps) {
  const titleId = useId();
  const { data, isLoading, reload } = useTaxonomies();

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <ModalHeader
        titleId={titleId}
        title={FORM_COPY.titleNew}
        onClose={onClose}
      />
      {data ? (
        <PlantForm taxonomies={data} onClose={onClose} onSaved={onClose} />
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
