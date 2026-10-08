import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { SelectPopover } from '@/components/ui/SelectPopover/SelectPopover';
import { copy } from '@/data/copy';
import {
  buildOriginOptions,
  originOptionLabel,
} from '@/lib/originFilterOptions';
import type { OriginFilterProps } from '@/types/components/plantFilters';

const FILTERS_COPY = copy.plants.filters;

export function OriginFilter({ origins, value, onChange }: OriginFilterProps) {
  const options = buildOriginOptions(origins);

  return (
    <FieldGroup label={FILTERS_COPY.origin}>
      <SelectPopover
        triggerLabel={originOptionLabel(options, value)}
        options={options}
        isSelected={(origin) => origin === value}
        onSelect={onChange}
        closeOnSelect
        searchLabel={FILTERS_COPY.originSearch}
        emptyLabel={FILTERS_COPY.originEmpty}
      />
    </FieldGroup>
  );
}
