'use client';

import { useController } from 'react-hook-form';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { TaxonomyPickerProps } from '@/types/components/plants';
import styles from './PlantTypePicker.module.css';

export function PlantTypePicker({ control, items }: TaxonomyPickerProps) {
  const { field } = useController({ control, name: 'typeId' });

  return (
    <FieldGroup label={copy.plantForm.fields.type}>
      <div className={styles.tiles}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={field.value === item.id}
            className={styles.tile}
            onClick={() => field.onChange(item.id)}
          >
            <span className={styles.disc}>
              <Icon name="leaf" className={styles.icon} />
            </span>
            <span className={styles.label}>{item.name}</span>
          </button>
        ))}
      </div>
    </FieldGroup>
  );
}
