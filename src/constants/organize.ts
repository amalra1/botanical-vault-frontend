import type { OrganizeSectionConfig } from '@/types/components/organize';
import type { TaxonomyKind } from '@/types/taxonomy';

export const ORGANIZE_SECTIONS: TaxonomyKind[] = [
  'origins',
  'plantTypes',
  'sizes',
  'imageViews',
];

export const DEFAULT_ORGANIZE_SECTION: TaxonomyKind = 'origins';

export const ORGANIZE_SECTION_CONFIG: Record<
  TaxonomyKind,
  OrganizeSectionConfig
> = {
  origins: { icon: 'pin', hasDescription: false, allowsUnassign: true },
  plantTypes: { icon: 'leaf', hasDescription: false, allowsUnassign: false },
  sizes: { icon: 'steps', hasDescription: true, allowsUnassign: false },
  imageViews: { icon: 'eye', hasDescription: false, allowsUnassign: false },
};

export const UNASSIGN_TARGET = 'unassign';
export const TAXONOMY_NAME_MAX_LENGTH = 80;
export const TAXONOMY_DESCRIPTION_MAX_LENGTH = 80;
