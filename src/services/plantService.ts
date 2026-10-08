import { api } from '@/lib/api';
import { API_PATHS } from '@/constants/apiPaths';
import { JSON_MIME_TYPE, PLANT_UPLOAD_PARTS } from '@/constants/upload';
import type { Plant, PlantCreatePayload } from '@/types/plant';

function toFormData({ images, ...plant }: PlantCreatePayload) {
  const metadata = {
    ...plant,
    images: images.map(({ viewId }) => ({ viewId })),
  };
  const body = new FormData();
  body.append(
    PLANT_UPLOAD_PARTS.plant,
    new Blob([JSON.stringify(metadata)], { type: JSON_MIME_TYPE }),
  );
  images.forEach(({ file }) =>
    body.append(PLANT_UPLOAD_PARTS.files, file, file.name),
  );
  return body;
}

export const plantService = {
  create: async (payload: PlantCreatePayload): Promise<Plant> => {
    const { data } = await api.post<Plant>(
      API_PATHS.plants,
      toFormData(payload),
    );
    return data;
  },
};
