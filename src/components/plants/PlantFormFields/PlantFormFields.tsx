'use client';

import { useController, useWatch } from 'react-hook-form';
import { OriginPicker } from '@/components/plants/OriginPicker/OriginPicker';
import { PlantLightPicker } from '@/components/plants/PlantLightPicker/PlantLightPicker';
import { PlantNameFields } from '@/components/plants/PlantNameFields/PlantNameFields';
import { PlantSizePicker } from '@/components/plants/PlantSizePicker/PlantSizePicker';
import { PlantTypePicker } from '@/components/plants/PlantTypePicker/PlantTypePicker';
import { TextAreaField } from '@/components/ui/TextAreaField/TextAreaField';
import { NOTES_ROWS } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import { suggestCommonName } from '@/lib/fileNames';
import { normalizeForMatch } from '@/lib/text';
import type { PlantFormFieldsProps } from '@/types/components/plants';
import styles from './PlantFormFields.module.css';

const FIELDS_COPY = copy.plantForm.fields;

export function PlantFormFields({
  control,
  taxonomies,
  firstFilename,
}: PlantFormFieldsProps) {
  const commonName = useWatch({ control, name: 'commonName' });
  const { field: notesField } = useController({ control, name: 'notes' });
  const viewNames = taxonomies.imageViews.map((view) => view.name);
  const suggestion = firstFilename
    ? suggestCommonName(firstFilename, viewNames)
    : '';
  const showSuggestion =
    suggestion !== '' &&
    normalizeForMatch(suggestion) !== normalizeForMatch(commonName);

  return (
    <div className={styles.fields}>
      <div className={styles.section}>
        <PlantNameFields
          control={control}
          suggestion={showSuggestion ? suggestion : null}
        />
      </div>
      <div className={styles.section}>
        <OriginPicker control={control} origins={taxonomies.origins} />
      </div>
      <div className={styles.section}>
        <PlantTypePicker control={control} items={taxonomies.plantTypes} />
      </div>
      <div className={styles.section}>
        <PlantSizePicker control={control} sizes={taxonomies.sizes} />
      </div>
      <div className={styles.section}>
        <PlantLightPicker control={control} />
      </div>
      <div className={styles.section}>
        <TextAreaField
          label={FIELDS_COPY.notes}
          optionalLabel={FIELDS_COPY.notesOptional}
          placeholder={FIELDS_COPY.notesPlaceholder}
          rows={NOTES_ROWS}
          {...notesField}
        />
      </div>
    </div>
  );
}
