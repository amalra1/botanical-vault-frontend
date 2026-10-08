'use client';

import { useState } from 'react';
import { OrganizeModal } from '@/components/organize/OrganizeModal/OrganizeModal';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';

export function OrganizeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        icon="user"
        label={copy.header.organize}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && <OrganizeModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
