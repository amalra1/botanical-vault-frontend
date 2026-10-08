'use client';

import { useController } from 'react-hook-form';
import { ChoiceTile } from '@/components/ui/ChoiceTile/ChoiceTile';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { PlantSizePickerProps } from '@/types/components/plants';
import styles from './PlantSizePicker.module.css';

export function PlantSizePicker({ control, sizes }: PlantSizePickerProps) {
  const { field } = useController({ control, name: 'sizeId' });

  return (
    <FieldGroup label={copy.plantForm.fields.size}>
      <div className={styles.tiles}>
        {sizes.map((size) => (
          <ChoiceTile
            key={size.id}
            label={size.name}
            caption={size.description ?? undefined}
            pressed={field.value === size.id}
            onClick={() => field.onChange(size.id)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}
