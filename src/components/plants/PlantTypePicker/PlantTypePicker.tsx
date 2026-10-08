'use client';

import { useController } from 'react-hook-form';
import { ChoiceTile } from '@/components/ui/ChoiceTile/ChoiceTile';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { TaxonomyPickerProps } from '@/types/components/plants';
import styles from './PlantTypePicker.module.css';

export function PlantTypePicker({ control, items }: TaxonomyPickerProps) {
  const { field } = useController({ control, name: 'typeId' });

  return (
    <FieldGroup label={copy.plantForm.fields.type}>
      <div className={styles.tiles}>
        {items.map((item) => (
          <ChoiceTile
            key={item.id}
            label={item.name}
            pressed={field.value === item.id}
            onClick={() => field.onChange(item.id)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}
