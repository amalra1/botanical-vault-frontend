import { api } from '@/lib/api';
import { API_PATHS } from '@/constants/apiPaths';
import { JSON_MIME_TYPE, PLANT_UPLOAD_PARTS } from '@/constants/upload';
import { toApiParams } from '@/lib/plantFilterParams';
import type { Plant, PlantFilters, PlantSearchResult } from '@/types/plant';
import type {
  PlantImageInput,
  PlantImageRequest,
  PlantSavePayload,
} from '@/types/plantImage';

function toImageRequest({ source, viewId }: PlantImageInput) {
  const request: PlantImageRequest =
    source.kind === 'existing' ? { id: source.imageId, viewId } : { viewId };
  return request;
}

function toFormData({ images, ...plant }: PlantSavePayload) {
  const metadata = { ...plant, images: images.map(toImageRequest) };
  const body = new FormData();
  body.append(
    PLANT_UPLOAD_PARTS.plant,
    new Blob([JSON.stringify(metadata)], { type: JSON_MIME_TYPE }),
  );
  images.forEach(({ source }) => {
    if (source.kind === 'new') {
      body.append(PLANT_UPLOAD_PARTS.files, source.file, source.file.name);
    }
  });
  return body;
}

function plantPath(id: number) {
  return `${API_PATHS.plants}/${id}`;
}

export const plantService = {
  search: async (filters: PlantFilters): Promise<PlantSearchResult> => {
    const { data } = await api.get<PlantSearchResult>(API_PATHS.plants, {
      params: toApiParams(filters),
    });
    return data;
  },
  getById: async (id: number): Promise<Plant> => {
    const { data } = await api.get<Plant>(plantPath(id));
    return data;
  },
  create: async (payload: PlantSavePayload): Promise<Plant> => {
    const { data } = await api.post<Plant>(
      API_PATHS.plants,
      toFormData(payload),
    );
    return data;
  },
  update: async (id: number, payload: PlantSavePayload): Promise<Plant> => {
    const { data } = await api.put<Plant>(plantPath(id), toFormData(payload));
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(plantPath(id));
  },
};
