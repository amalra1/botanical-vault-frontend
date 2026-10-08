import type { PluralCopy } from '@/types/plant';

export interface TaxonomyItem {
  id: number;
  name: string;
}

export interface SizeItem extends TaxonomyItem {
  description: string | null;
}

export interface TaxonomyListItem extends TaxonomyItem {
  usageCount: number;
}

export interface SizeListItem extends SizeItem {
  usageCount: number;
}

export interface Taxonomies {
  origins: TaxonomyListItem[];
  plantTypes: TaxonomyListItem[];
  sizes: SizeListItem[];
  imageViews: TaxonomyListItem[];
}

export type TaxonomyKind = keyof Taxonomies;

export interface TaxonomyItemInput {
  name: string;
  description?: string | null;
}

export interface OrganizeItem {
  id: number;
  name: string;
  description: string | null;
  usageCount: number;
}

export type ReassignTarget = number | 'unassign';

export interface UsageCopy extends PluralCopy {
  none: string;
}

export interface TaxonomyFormValues {
  name: string;
  description: string;
}
