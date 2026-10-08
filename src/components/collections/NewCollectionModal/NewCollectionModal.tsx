'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { ModalHeader } from '@/components/ui/ModalHeader/ModalHeader';
import { TextField } from '@/components/ui/TextField/TextField';
import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { useSnackbar } from '@/hooks/useSnackbar';
import { getApiErrorCode } from '@/lib/apiError';
import { notifyCollectionsChanged } from '@/lib/collectionChanges';
import { formatCopy } from '@/lib/formatCopy';
import { collectionNameSchema } from '@/schemas/collectionNameSchema';
import { collectionService } from '@/services/collectionService';
import type { CollectionNameValues } from '@/types/collection';
import type { NewCollectionModalProps } from '@/types/components/collections';
import styles from './NewCollectionModal.module.css';

const FORM_COPY = copy.collections.form;
const ERRORS = copy.collections.errors;
const CREATED_COPY = copy.snackbar.collectionCreated;
const EMPTY_COLLECTION: CollectionNameValues = { name: '' };

export function NewCollectionModal({
  onClose,
  onCreated,
}: NewCollectionModalProps) {
  const titleId = useId();
  const { notify } = useSnackbar();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CollectionNameValues>({
    resolver: zodResolver(collectionNameSchema),
    defaultValues: EMPTY_COLLECTION,
  });

  const submit = async ({ name }: CollectionNameValues) => {
    setSubmitError(null);
    try {
      const collection = await collectionService.create(name);
      notifyCollectionsChanged();
      notify({
        title: CREATED_COPY.title,
        description: formatCopy(CREATED_COPY.description, {
          name: collection.name,
        }),
      });
      onCreated(collection);
    } catch (error) {
      if (getApiErrorCode(error) === API_ERROR_CODES.duplicateName) {
        setError('name', { message: ERRORS.duplicateName });
        return;
      }
      setSubmitError(ERRORS.create);
    }
  };

  return (
    <Modal labelledBy={titleId} onClose={onClose} className={styles.dialog}>
      <ModalHeader
        titleId={titleId}
        title={FORM_COPY.title}
        onClose={onClose}
      />
      <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
        <TextField
          label={FORM_COPY.nameLabel}
          placeholder={FORM_COPY.namePlaceholder}
          autoComplete="off"
          error={errors.name?.message}
          {...register('name')}
        />
        {submitError && (
          <p role="alert" className={styles.error}>
            {submitError}
          </p>
        )}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            {FORM_COPY.cancel}
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isSubmitting ? FORM_COPY.creating : FORM_COPY.create}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
