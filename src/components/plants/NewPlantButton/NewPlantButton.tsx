'use client';

import { useState } from 'react';
import { PlantFormModal } from '@/components/plants/PlantFormModal/PlantFormModal';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';

export function NewPlantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Icon name="plus" />
        {copy.header.newPlant}
      </Button>
      {isOpen && <PlantFormModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
