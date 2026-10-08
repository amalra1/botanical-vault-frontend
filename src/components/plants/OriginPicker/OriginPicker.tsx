'use client';

import { useController } from 'react-hook-form';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { SelectPopover } from '@/components/ui/SelectPopover/SelectPopover';
import { copy } from '@/data/copy';
import { selectedOriginsLabel } from '@/lib/originPickerLabel';
import type { OriginPickerProps } from '@/types/components/plants';

const FIELDS_COPY = copy.plantForm.fields;

export function OriginPicker({ control, origins }: OriginPickerProps) {
  const { field } = useController({ control, name: 'originIds' });
  const selected = field.value;
  const options = origins.map((origin) => ({
    value: origin.id,
    label: origin.name,
  }));

  const toggle = (id: number) =>
    field.onChange(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );

  return (
    <FieldGroup label={FIELDS_COPY.origin} hint={FIELDS_COPY.originHint}>
      <SelectPopover
        triggerLabel={selectedOriginsLabel(
          origins,
          selected,
          FIELDS_COPY.originNone,
          FIELDS_COPY.originSeparator,
        )}
        options={options}
        isSelected={(id) => selected.includes(id)}
        onSelect={toggle}
        searchLabel={FIELDS_COPY.originSearch}
        emptyLabel={FIELDS_COPY.originEmpty}
      />
    </FieldGroup>
  );
}
