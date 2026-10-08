'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { TextField } from '@/components/ui/TextField/TextField';
import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { getApiErrorCode } from '@/lib/apiError';
import { notifyCollectionsChanged } from '@/lib/collectionChanges';
import { handleLocalEscape } from '@/lib/localEscape';
import { collectionNameSchema } from '@/schemas/collectionNameSchema';
import { collectionService } from '@/services/collectionService';
import type { CollectionNameValues } from '@/types/collection';
import type { CollectionRenameFormProps } from '@/types/components/collections';
import styles from './CollectionRenameForm.module.css';

const MODAL_COPY = copy.collectionModal;

export function CollectionRenameForm({
  collection,
  onDone,
}: CollectionRenameFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CollectionNameValues>({
    resolver: zodResolver(collectionNameSchema),
    defaultValues: { name: collection.name },
  });

  const submit = async ({ name }: CollectionNameValues) => {
    if (name === collection.name) {
      onDone();
      return;
    }
    try {
      await collectionService.rename(collection.id, name);
      notifyCollectionsChanged();
      onDone();
    } catch (error) {
      const isDuplicate =
        getApiErrorCode(error) === API_ERROR_CODES.duplicateName;
      setError('name', {
        message: isDuplicate
          ? copy.collections.errors.duplicateName
          : MODAL_COPY.errors.rename,
      });
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submit)}
      onKeyDown={(event) => handleLocalEscape(event, onDone)}
      noValidate
    >
      <TextField
        label={MODAL_COPY.nameLabel}
        autoComplete="off"
        className={styles.field}
        error={errors.name?.message}
        {...register('name')}
      />
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onDone}>
          {MODAL_COPY.cancelRename}
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? MODAL_COPY.saving : MODAL_COPY.save}
        </Button>
      </div>
    </form>
  );
}
