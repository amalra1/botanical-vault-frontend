'use client';

import { useId } from 'react';
import { PlantForm } from '@/components/plants/PlantForm/PlantForm';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { copy } from '@/data/copy';
import { usePlantEditData } from '@/hooks/usePlantEditData';
import type { PlantEditModalProps } from '@/types/components/plantDetail';

const FORM_COPY = copy.plantForm;

export function PlantEditModal({
  plantId,
  onClose,
  onDeleted,
}: PlantEditModalProps) {
  const titleId = useId();
  const { data, isLoading, reload } = usePlantEditData(plantId);

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <ModalHeader
        titleId={titleId}
        title={FORM_COPY.titleEdit}
        onClose={onClose}
      />
      {data ? (
        <PlantForm
          taxonomies={data.taxonomies}
          plant={data.plant}
          onClose={onClose}
          onSaved={onClose}
          onDeleted={onDeleted}
        />
      ) : (
        <LoadStatus
          isLoading={isLoading}
          loadingLabel={FORM_COPY.loading}
          errorLabel={FORM_COPY.errors.loadPlant}
          retryLabel={FORM_COPY.retry}
          onRetry={reload}
        />
      )}
    </Modal>
  );
}
