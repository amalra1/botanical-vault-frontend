'use client';

import { useId, useState } from 'react';
import { TaxonomySection } from '@/components/organize/TaxonomySection/TaxonomySection';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { DEFAULT_ORGANIZE_SECTION } from '@/constants/organize';
import { copy } from '@/data/copy';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { useTaxonomyReorder } from '@/hooks/useTaxonomyReorder';
import { organizeItems } from '@/lib/organizeItems';
import type { OrganizeModalProps } from '@/types/components/organize';
import type { TaxonomyKind } from '@/types/taxonomy';
import { OrganizeSectionNav } from './OrganizeSectionNav';
import styles from './OrganizeModal.module.css';

const ORGANIZE_COPY = copy.organize;

export function OrganizeModal({ onClose }: OrganizeModalProps) {
  const titleId = useId();
  const [activeKind, setActiveKind] = useState<TaxonomyKind>(
    DEFAULT_ORGANIZE_SECTION,
  );
  const { data, isLoading, reload, mutate } = useTaxonomies();
  const reorder = useTaxonomyReorder(mutate);

  return (
    <Modal labelledBy={titleId} onClose={onClose} className={styles.dialog}>
      <ModalHeader
        titleId={titleId}
        title={ORGANIZE_COPY.title}
        onClose={onClose}
      />
      {data ? (
        <div className={styles.layout}>
          <OrganizeSectionNav
            taxonomies={data}
            activeKind={activeKind}
            onSelect={setActiveKind}
          />
          <TaxonomySection
            key={activeKind}
            kind={activeKind}
            items={organizeItems(data, activeKind)}
            onReorder={reorder}
          />
        </div>
      ) : (
        <LoadStatus
          isLoading={isLoading}
          loadingLabel={ORGANIZE_COPY.loading}
          errorLabel={ORGANIZE_COPY.errors.load}
          retryLabel={ORGANIZE_COPY.retry}
          onRetry={reload}
        />
      )}
    </Modal>
  );
}
