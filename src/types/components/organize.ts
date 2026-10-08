import type {
  OrganizeItem,
  ReassignTarget,
  Taxonomies,
  TaxonomyKind,
} from '@/types/taxonomy';
import type { IconName } from './ui';

export interface OrganizeSectionConfig {
  icon: IconName;
  hasDescription: boolean;
  allowsUnassign: boolean;
}

export interface OrganizeModalProps {
  onClose: () => void;
}

export interface OrganizeSectionNavProps {
  taxonomies: Taxonomies;
  activeKind: TaxonomyKind;
  onSelect: (kind: TaxonomyKind) => void;
}

export interface TaxonomySectionProps {
  kind: TaxonomyKind;
  items: OrganizeItem[];
  onReorder: (kind: TaxonomyKind, ids: number[]) => void;
}

export interface TaxonomyItemListProps {
  kind: TaxonomyKind;
  items: OrganizeItem[];
  editingId: number | null;
  onEdit: (id: number) => void;
  onCancelEdit: () => void;
  onDelete: (item: OrganizeItem) => void;
  onReorder: (ids: number[]) => void;
}

export interface TaxonomyItemRowProps {
  kind: TaxonomyKind;
  item: OrganizeItem;
  isEditing: boolean;
  canDelete: boolean;
  onEdit: (id: number) => void;
  onCancelEdit: () => void;
  onDelete: (item: OrganizeItem) => void;
}

export interface TaxonomyItemFormProps {
  kind: TaxonomyKind;
  item?: OrganizeItem;
  onDone: () => void;
}

export interface DeleteTaxonomyDialogProps {
  kind: TaxonomyKind;
  item: OrganizeItem;
  items: OrganizeItem[];
  onCancel: () => void;
  onDeleted: () => void;
}

export interface ReassignOptionsProps {
  kind: TaxonomyKind;
  item: OrganizeItem;
  items: OrganizeItem[];
  target: ReassignTarget | null;
  onChange: (target: ReassignTarget) => void;
}
