import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { ALL_OPTION } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { facetCount } from '@/lib/facetCount';
import type { SegmentedFacetFilterProps } from '@/types/components/plantFilters';

export function SegmentedFacetFilter({
  label,
  items,
  facet,
  value,
  onChange,
}: SegmentedFacetFilterProps) {
  const options = [
    { value: ALL_OPTION, label: copy.plants.filters.all, count: facet?.all },
    ...items.map((item) => ({
      value: String(item.id),
      label: item.label,
      count: facet && facetCount(facet, item.id),
    })),
  ];

  return (
    <FieldGroup label={label}>
      <SegmentedControl
        options={options}
        value={value === null ? ALL_OPTION : String(value)}
        onChange={(selected) =>
          onChange(selected === ALL_OPTION ? null : Number(selected))
        }
      />
    </FieldGroup>
  );
}
