'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DraftImageGrid } from '@/components/plants/DraftImageGrid/DraftImageGrid';
import { ImageDropZone } from '@/components/plants/ImageDropZone/ImageDropZone';
import { PlantFormFields } from '@/components/plants/PlantFormFields/PlantFormFields';
import { PlantFormFooter } from '@/components/plants/PlantFormFooter/PlantFormFooter';
import { copy } from '@/data/copy';
import { useDraftImages } from '@/hooks/useDraftImages';
import { useSnackbar } from '@/hooks/useSnackbar';
import { formatCopy } from '@/lib/formatCopy';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { splitPngFiles } from '@/lib/pngFiles';
import { plantFormSchema } from '@/schemas/plantFormSchema';
import { plantService } from '@/services/plantService';
import type { PlantFormProps } from '@/types/components/plants';
import type { PlantFormValues } from '@/types/plant';
import { plantSaveErrorMessage } from './plantSaveErrorMessage';
import styles from './PlantForm.module.css';

const EMPTY_PLANT = {
  commonName: '',
  scientificName: '',
  originIds: [],
  notes: '',
};
const FILE_LIST_SEPARATOR = ', ';
const CREATED_COPY = copy.snackbar.plantCreated;

function rejectedFilesMessage(rejected: File[]) {
  if (rejected.length === 0) {
    return null;
  }
  const files = rejected.map((file) => file.name).join(FILE_LIST_SEPARATOR);
  return formatCopy(copy.plantForm.errors.onlyPng, { files });
}

export function PlantForm({ taxonomies, onClose }: PlantFormProps) {
  const draft = useDraftImages();
  const { notify } = useSnackbar();
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    mode: 'onChange',
    defaultValues: EMPTY_PLANT,
  });
  const [defaultView] = taxonomies.imageViews;

  const addFiles = (files: File[]) => {
    const { accepted, rejected } = splitPngFiles(files);
    setFileError(rejectedFilesMessage(rejected));
    if (defaultView && accepted.length > 0) {
      draft.add(accepted, defaultView.id);
    }
  };

  const submit = async (values: PlantFormValues) => {
    setSubmitError(null);
    try {
      const images = draft.images.map(({ file, viewId }) => ({ file, viewId }));
      await plantService.create({ ...values, images });
      notifyPlantsChanged();
      notify({
        title: CREATED_COPY.title,
        description: formatCopy(CREATED_COPY.description, {
          name: values.commonName,
        }),
      });
      onClose();
    } catch (error) {
      setSubmitError(plantSaveErrorMessage(error));
    }
  };

  if (draft.images.length === 0) {
    return <ImageDropZone onFiles={addFiles} error={fileError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <DraftImageGrid
        images={draft.images}
        views={taxonomies.imageViews}
        onMove={draft.move}
        onRemove={draft.remove}
        onViewChange={draft.setView}
        onAddFiles={addFiles}
      />
      {fileError && (
        <p role="alert" className={styles.error}>
          {fileError}
        </p>
      )}
      <PlantFormFields
        control={control}
        taxonomies={taxonomies}
        firstFilename={draft.images[0].file.name}
      />
      <PlantFormFooter
        canSave={isValid}
        isSaving={isSubmitting}
        error={submitError}
        onCancel={onClose}
      />
    </form>
  );
}
