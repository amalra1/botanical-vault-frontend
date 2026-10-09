'use client';

import { useController } from 'react-hook-form';
import { SunArc } from '@/components/plants/SunArc/SunArc';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import { lightExposureLabel, toggleExposure } from '@/lib/lightExposure';
import type { PlantLightPickerProps } from '@/types/components/plants';
import styles from './PlantLightPicker.module.css';

const LIGHT_COPY = copy.light;

export function PlantLightPicker({ control }: PlantLightPickerProps) {
  const { field } = useController({ control, name: 'lightExposures' });
  const label = lightExposureLabel(field.value);

  return (
    <FieldGroup
      label={LIGHT_COPY.label}
      optionalLabel={LIGHT_COPY.optional}
      hint={LIGHT_COPY.hint}
    >
      <div className={styles.picker}>
        <SunArc
          selected={field.value}
          onSelect={(exposure) =>
            field.onChange(toggleExposure(field.value, exposure))
          }
        />
        <span className={styles.caption} aria-live="polite">
          {label ?? <span className={styles.empty}>{LIGHT_COPY.empty}</span>}
        </span>
      </div>
    </FieldGroup>
  );
}
