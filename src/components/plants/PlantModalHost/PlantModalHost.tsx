'use client';

import { PlantDetailModal } from '@/components/plants/PlantDetailModal/PlantDetailModal';
import { PlantEditModal } from '@/components/plants/PlantEditModal/PlantEditModal';
import type { PlantModalHostProps } from '@/types/components/plantDetail';

export function PlantModalHost({ modal, origins }: PlantModalHostProps) {
  const { state } = modal;
  if (!state) {
    return null;
  }
  if (state.mode === 'edit') {
    return (
      <PlantEditModal
        plantId={state.plantId}
        onClose={modal.backToDetail}
        onDeleted={modal.close}
      />
    );
  }
  return (
    <PlantDetailModal
      plantId={state.plantId}
      origins={origins}
      onEdit={modal.openEdit}
      onClose={modal.close}
    />
  );
}
