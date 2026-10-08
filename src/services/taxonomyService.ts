import { api } from '@/lib/api';
import { API_PATHS } from '@/constants/apiPaths';
import type { SizeItem, Taxonomies, TaxonomyItem } from '@/types/taxonomy';

async function getList<T>(path: string): Promise<T[]> {
  const { data } = await api.get<T[]>(path);
  return data;
}

export const taxonomyService = {
  getAll: async (): Promise<Taxonomies> => {
    const [origins, plantTypes, sizes, imageViews] = await Promise.all([
      getList<TaxonomyItem>(API_PATHS.origins),
      getList<TaxonomyItem>(API_PATHS.plantTypes),
      getList<SizeItem>(API_PATHS.sizes),
      getList<TaxonomyItem>(API_PATHS.imageViews),
    ]);
    return { origins, plantTypes, sizes, imageViews };
  },
  createOrigin: async (name: string): Promise<TaxonomyItem> => {
    const { data } = await api.post<TaxonomyItem>(API_PATHS.origins, { name });
    return data;
  },
};
