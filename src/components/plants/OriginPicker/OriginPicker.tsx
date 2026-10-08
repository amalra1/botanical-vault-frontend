'use client';

import { useController } from 'react-hook-form';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { ToggleChip } from '@/components/ui/ToggleChip/ToggleChip';
import { copy } from '@/data/copy';
import type { OriginPickerProps } from '@/types/components/plants';
import styles from './OriginPicker.module.css';

const FIELDS_COPY = copy.plantForm.fields;

export function OriginPicker({ control, origins }: OriginPickerProps) {
  const { field } = useController({ control, name: 'originIds' });
  const selected = field.value;

  const toggle = (id: number) =>
    field.onChange(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );

  return (
    <FieldGroup label={FIELDS_COPY.origin} hint={FIELDS_COPY.originHint}>
      <div className={styles.chips}>
        {origins.map((origin) => (
          <ToggleChip
            key={origin.id}
            pressed={selected.includes(origin.id)}
            onClick={() => toggle(origin.id)}
          >
            {origin.name}
          </ToggleChip>
        ))}
      </div>
    </FieldGroup>
  );
}
