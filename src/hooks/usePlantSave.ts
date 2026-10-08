import { useState } from 'react';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import { notifyPlantsChanged } from '@/lib/plantChanges';
import { toImageInputs } from '@/lib/plantImages';
import { plantSaveErrorMessage } from '@/lib/plantSaveErrorMessage';
import { plantService } from '@/services/plantService';
import type { PlantFormValues } from '@/types/plant';
import type { PlantSave, PlantSaveOptions } from '@/types/plantEditing';
import { useSnackbar } from './useSnackbar';

const SNACKBAR_COPY = copy.snackbar;

export function usePlantSave({
  plant,
  images,
  onSaved,
}: PlantSaveOptions): PlantSave {
  const { notify } = useSnackbar();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (values: PlantFormValues) => {
    setSubmitError(null);
    const payload = { ...values, images: toImageInputs(images) };
    const notice = plant
      ? SNACKBAR_COPY.plantUpdated
      : SNACKBAR_COPY.plantCreated;
    try {
      await (plant
        ? plantService.update(plant.id, payload)
        : plantService.create(payload));
      notifyPlantsChanged();
      notify({
        title: notice.title,
        description: formatCopy(notice.description, {
          name: values.commonName,
        }),
      });
      onSaved();
    } catch (error) {
      setSubmitError(plantSaveErrorMessage(error));
    }
  };

  return { submit, submitError };
}
