'use client';

import { useId } from 'react';
import { PlantImageGallery } from '@/components/plants/PlantImageGallery/PlantImageGallery';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { copy } from '@/data/copy';
import { usePlant } from '@/hooks/usePlant';
import type { PlantDetailModalProps } from '@/types/components/plantDetail';
import { PlantDetailHeader } from './PlantDetailHeader';

const DETAIL_COPY = copy.plantDetail;

export function PlantDetailModal({
  plantId,
  origins,
  onEdit,
  onClose,
}: PlantDetailModalProps) {
  const titleId = useId();
  const { data: plant, isLoading, reload } = usePlant(plantId);

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      {plant ? (
        <>
          <PlantDetailHeader
            titleId={titleId}
            plant={plant}
            origins={origins}
            onEdit={onEdit}
            onClose={onClose}
          />
          <PlantImageGallery images={plant.images} />
        </>
      ) : (
        <>
          <ModalHeader
            titleId={titleId}
            title={DETAIL_COPY.title}
            onClose={onClose}
          />
          <LoadStatus
            isLoading={isLoading}
            loadingLabel={DETAIL_COPY.loading}
            errorLabel={DETAIL_COPY.errors.load}
            retryLabel={DETAIL_COPY.retry}
            onRetry={reload}
          />
        </>
      )}
    </Modal>
  );
}
