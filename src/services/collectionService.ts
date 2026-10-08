import { api } from '@/lib/api';
import { API_PATHS } from '@/constants/apiPaths';
import type {
  Collection,
  CollectionImage,
  CollectionSummary,
} from '@/types/collection';

function collectionPath(id: number) {
  return `${API_PATHS.collections}/${id}`;
}

function memberPath(collectionId: number, plantId: number) {
  return `${collectionPath(collectionId)}${API_PATHS.plants}/${plantId}`;
}

export const collectionService = {
  getAll: async (): Promise<CollectionSummary[]> => {
    const { data } = await api.get<CollectionSummary[]>(API_PATHS.collections);
    return data;
  },
  getById: async (id: number): Promise<Collection> => {
    const { data } = await api.get<Collection>(collectionPath(id));
    return data;
  },
  getImages: async (id: number): Promise<CollectionImage[]> => {
    const { data } = await api.get<CollectionImage[]>(
      `${collectionPath(id)}${API_PATHS.images}`,
    );
    return data;
  },
  create: async (name: string): Promise<Collection> => {
    const { data } = await api.post<Collection>(API_PATHS.collections, {
      name,
    });
    return data;
  },
  rename: async (id: number, name: string): Promise<Collection> => {
    const { data } = await api.patch<Collection>(collectionPath(id), { name });
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(collectionPath(id));
  },
  addPlant: async (collectionId: number, plantId: number): Promise<void> => {
    await api.put(memberPath(collectionId, plantId));
  },
  removePlant: async (collectionId: number, plantId: number): Promise<void> => {
    await api.delete(memberPath(collectionId, plantId));
  },
};
