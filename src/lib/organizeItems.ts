import { ORGANIZE_SECTION_CONFIG, UNASSIGN_TARGET } from '@/constants/organize';
import { pluralCopy } from '@/lib/pluralCopy';
import type {
  OrganizeItem,
  ReassignTarget,
  Taxonomies,
  TaxonomyFormValues,
  TaxonomyItemInput,
  TaxonomyKind,
  TaxonomyListItem,
  UsageCopy,
} from '@/types/taxonomy';

const UNUSED = 0;
const SINGLE_ITEM = 1;

export function organizeItems(
  taxonomies: Taxonomies,
  kind: TaxonomyKind,
): OrganizeItem[] {
  return taxonomies[kind].map((item) => ({
    id: item.id,
    name: item.name,
    description: 'description' in item ? item.description : null,
    usageCount: item.usageCount,
  }));
}

function sortByIds<T extends TaxonomyListItem>(items: T[], ids: number[]) {
  const positions = new Map(ids.map((id, index) => [id, index]));
  const positionOf = (item: T) => positions.get(item.id) ?? ids.length;
  return [...items].sort(
    (first, second) => positionOf(first) - positionOf(second),
  );
}

export function reorderTaxonomy(
  taxonomies: Taxonomies,
  kind: TaxonomyKind,
  ids: number[],
): Taxonomies {
  return { ...taxonomies, [kind]: sortByIds(taxonomies[kind], ids) };
}

export function usageLabel(count: number, usage: UsageCopy) {
  return count === UNUSED ? usage.none : pluralCopy(count, usage);
}

export function canDeleteItem(kind: TaxonomyKind, itemCount: number) {
  return (
    ORGANIZE_SECTION_CONFIG[kind].allowsUnassign || itemCount > SINGLE_ITEM
  );
}

export function isItemInUse(item: OrganizeItem) {
  return item.usageCount > UNUSED;
}

export function reassignTargetId(target: ReassignTarget | null) {
  return target === null || target === UNASSIGN_TARGET ? null : target;
}

export function isDeletionReady(
  item: OrganizeItem,
  target: ReassignTarget | null,
) {
  return !isItemInUse(item) || target !== null;
}

export function toTaxonomyInput(
  { name, description }: TaxonomyFormValues,
  hasDescription: boolean,
): TaxonomyItemInput {
  return hasDescription ? { name, description: description || null } : { name };
}
