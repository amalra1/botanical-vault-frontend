'use client';

import { useController } from 'react-hook-form';
import { Icon } from '@/components/ui/Icon/Icon';
import { TextField } from '@/components/ui/TextField/TextField';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type { PlantNameFieldsProps } from '@/types/components/plants';
import styles from './PlantNameFields.module.css';

const FIELDS_COPY = copy.plantForm.fields;

export function PlantNameFields({ control, suggestion }: PlantNameFieldsProps) {
  const { field: commonName, fieldState: commonNameState } = useController({
    control,
    name: 'commonName',
  });
  const { field: scientificName, fieldState: scientificNameState } =
    useController({ control, name: 'scientificName' });

  return (
    <div className={styles.names}>
      <div className={styles.column}>
        <TextField
          label={FIELDS_COPY.commonName}
          placeholder={FIELDS_COPY.commonNamePlaceholder}
          autoComplete="off"
          error={commonNameState.error?.message}
          {...commonName}
        />
        {suggestion && (
          <button
            type="button"
            className={styles.suggestion}
            onClick={() => commonName.onChange(suggestion)}
          >
            <Icon name="leaf" className={styles.suggestionIcon} />
            {formatCopy(FIELDS_COPY.suggestion, { name: suggestion })}
          </button>
        )}
      </div>
      <TextField
        label={FIELDS_COPY.scientificName}
        placeholder={FIELDS_COPY.scientificNamePlaceholder}
        autoComplete="off"
        className={styles.scientific}
        error={scientificNameState.error?.message}
        {...scientificName}
      />
    </div>
  );
}
