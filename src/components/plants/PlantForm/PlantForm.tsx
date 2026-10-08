'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeletePlantDialog } from '@/components/plants/DeletePlantDialog/DeletePlantDialog';
import { DraftImageGrid } from '@/components/plants/DraftImageGrid/DraftImageGrid';
import { ImageDropZone } from '@/components/plants/ImageDropZone/ImageDropZone';
import { PlantFormFields } from '@/components/plants/PlantFormFields/PlantFormFields';
import { PlantFormFooter } from '@/components/plants/PlantFormFooter/PlantFormFooter';
import { copy } from '@/data/copy';
import { useDraftImages } from '@/hooks/useDraftImages';
import { usePlantSave } from '@/hooks/usePlantSave';
import { formatCopy } from '@/lib/formatCopy';
import { toDraftImages, toPlantFormValues } from '@/lib/plantImages';
import { splitPngFiles } from '@/lib/pngFiles';
import { plantFormSchema } from '@/schemas/plantFormSchema';
import type { PlantFormProps } from '@/types/components/plants';
import type { PlantFormValues } from '@/types/plant';
import styles from './PlantForm.module.css';

const EMPTY_PLANT = {
  commonName: '',
  scientificName: '',
  originIds: [],
  notes: '',
};
const FILE_LIST_SEPARATOR = ', ';

function rejectedFilesMessage(rejected: File[]) {
  if (rejected.length === 0) {
    return null;
  }
  const files = rejected.map((file) => file.name).join(FILE_LIST_SEPARATOR);
  return formatCopy(copy.plantForm.errors.onlyPng, { files });
}

export function PlantForm({
  taxonomies,
  plant,
  onClose,
  onSaved,
  onDeleted,
}: PlantFormProps) {
  const draft = useDraftImages(plant && toDraftImages(plant));
  const [fileError, setFileError] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    mode: 'onChange',
    defaultValues: plant ? toPlantFormValues(plant) : EMPTY_PLANT,
  });
  const { submit, submitError } = usePlantSave({
    plant,
    images: draft.images,
    onSaved,
  });
  const [defaultView] = taxonomies.imageViews;
  const canDelete = plant !== undefined && onDeleted !== undefined;

  const addFiles = (files: File[]) => {
    const { accepted, rejected } = splitPngFiles(files);
    setFileError(rejectedFilesMessage(rejected));
    if (defaultView && accepted.length > 0) {
      draft.add(accepted, defaultView.id);
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
        firstFilename={plant ? null : draft.images[0].filename}
      />
      <PlantFormFooter
        canSave={isValid}
        isSaving={isSubmitting}
        isEditing={plant !== undefined}
        error={submitError}
        onCancel={onClose}
        onDelete={canDelete ? () => setIsConfirmingDelete(true) : undefined}
      />
      {isConfirmingDelete && plant && onDeleted && (
        <DeletePlantDialog
          plant={plant}
          onCancel={() => setIsConfirmingDelete(false)}
          onDeleted={onDeleted}
        />
      )}
    </form>
  );
}
