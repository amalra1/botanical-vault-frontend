'use client';

import { useController, useWatch } from 'react-hook-form';
import { OriginPicker } from '@/components/plants/OriginPicker/OriginPicker';
import { PlantNameFields } from '@/components/plants/PlantNameFields/PlantNameFields';
import { PlantTypePicker } from '@/components/plants/PlantTypePicker/PlantTypePicker';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
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
  onOriginCreated,
}: PlantFormFieldsProps) {
  const commonName = useWatch({ control, name: 'commonName' });
  const { field: sizeField } = useController({ control, name: 'sizeId' });
  const { field: notesField } = useController({ control, name: 'notes' });
  const viewNames = taxonomies.imageViews.map((view) => view.name);
  const suggestion = firstFilename
    ? suggestCommonName(firstFilename, viewNames)
    : '';
  const showSuggestion =
    suggestion !== '' &&
    normalizeForMatch(suggestion) !== normalizeForMatch(commonName);
  const sizeOptions = taxonomies.sizes.map((size) => ({
    value: size.id,
    label: size.description ?? size.name,
  }));

  return (
    <div className={styles.fields}>
      <div className={styles.section}>
        <PlantNameFields
          control={control}
          suggestion={showSuggestion ? suggestion : null}
        />
      </div>
      <div className={styles.section}>
        <OriginPicker
          control={control}
          origins={taxonomies.origins}
          onOriginCreated={onOriginCreated}
        />
      </div>
      <div className={styles.section}>
        <PlantTypePicker control={control} items={taxonomies.plantTypes} />
      </div>
      <FieldGroup label={FIELDS_COPY.size} className={styles.section}>
        <SegmentedControl
          options={sizeOptions}
          value={sizeField.value ?? null}
          onChange={sizeField.onChange}
        />
      </FieldGroup>
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
