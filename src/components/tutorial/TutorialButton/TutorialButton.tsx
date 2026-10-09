'use client';

import { useState } from 'react';
import { TutorialModal } from '@/components/tutorial/TutorialModal/TutorialModal';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';

export function TutorialButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        icon="help"
        label={copy.header.tutorial}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && <TutorialModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
