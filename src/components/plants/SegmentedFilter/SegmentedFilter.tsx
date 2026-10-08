import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { ALL_OPTION } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import type { SegmentedFilterProps } from '@/types/components/plantFilters';

export function SegmentedFilter({
  label,
  items,
  value,
  onChange,
}: SegmentedFilterProps) {
  const options = [
    { value: ALL_OPTION, label: copy.plants.filters.all },
    ...items.map((item) => ({ value: String(item.id), label: item.label })),
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
