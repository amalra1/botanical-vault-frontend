'use client';

import { useController } from 'react-hook-form';
import { SizeSteps } from '@/components/plants/SizeSteps/SizeSteps';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { PlantSizePickerProps } from '@/types/components/plants';
import styles from './PlantSizePicker.module.css';

export function PlantSizePicker({ control, sizes }: PlantSizePickerProps) {
  const { field } = useController({ control, name: 'sizeId' });
  const selectedSize = sizes.find((size) => size.id === field.value);

  return (
    <FieldGroup label={copy.plantForm.fields.size}>
      <div className={styles.picker}>
        <SizeSteps
          sizes={sizes}
          value={field.value ?? null}
          onChange={field.onChange}
        />
        {selectedSize && (
          <span className={styles.selected} aria-hidden="true">
            <span className={styles.name}>{selectedSize.name}</span>
            {selectedSize.description && (
              <span className={styles.description}>
                {selectedSize.description}
              </span>
            )}
          </span>
        )}
      </div>
    </FieldGroup>
  );
}
