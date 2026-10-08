'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { TextField } from '@/components/ui/TextField/TextField';
import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { ORGANIZE_SECTION_CONFIG } from '@/constants/organize';
import { copy } from '@/data/copy';
import { getApiErrorCode } from '@/lib/apiError';
import { handleLocalEscape } from '@/lib/localEscape';
import { toTaxonomyInput } from '@/lib/organizeItems';
import { notifyTaxonomiesChanged } from '@/lib/taxonomyChanges';
import { taxonomyItemSchema } from '@/schemas/taxonomyItemSchema';
import { taxonomyService } from '@/services/taxonomyService';
import type { TaxonomyItemFormProps } from '@/types/components/organize';
import type { TaxonomyFormValues } from '@/types/taxonomy';
import styles from './TaxonomyItemForm.module.css';

const FORM_COPY = copy.organize.form;
const ERRORS = copy.organize.errors;

export function TaxonomyItemForm({
  kind,
  item,
  onDone,
}: TaxonomyItemFormProps) {
  const { hasDescription } = ORGANIZE_SECTION_CONFIG[kind];
  const isEditing = item !== undefined;
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<TaxonomyFormValues>({
    resolver: zodResolver(taxonomyItemSchema),
    defaultValues: {
      name: item?.name ?? '',
      description: item?.description ?? '',
    },
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const submit = async (values: TaxonomyFormValues) => {
    const input = toTaxonomyInput(values, hasDescription);
    try {
      if (isEditing) {
        await taxonomyService.update(kind, item.id, input);
      } else {
        await taxonomyService.create(kind, input);
      }
      notifyTaxonomiesChanged();
      onDone();
    } catch (error) {
      const isDuplicate =
        getApiErrorCode(error) === API_ERROR_CODES.duplicateName;
      setError('name', {
        message: isDuplicate ? ERRORS.duplicateName : ERRORS.save,
      });
    }
  };

  const submitLabel = isEditing ? FORM_COPY.save : FORM_COPY.add;
  const submittingLabel = isEditing ? FORM_COPY.saving : FORM_COPY.adding;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submit)}
      onKeyDown={(event) => handleLocalEscape(event, onDone)}
      noValidate
    >
      <TextField
        label={FORM_COPY.nameLabel}
        placeholder={copy.organize.sections[kind].placeholder}
        autoComplete="off"
        className={styles.name}
        error={errors.name?.message}
        {...register('name')}
      />
      {hasDescription && (
        <TextField
          label={FORM_COPY.descriptionLabel}
          placeholder={FORM_COPY.descriptionPlaceholder}
          autoComplete="off"
          className={styles.description}
          error={errors.description?.message}
          {...register('description')}
        />
      )}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onDone}>
          {FORM_COPY.cancel}
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
