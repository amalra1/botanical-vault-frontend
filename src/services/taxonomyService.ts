import { api } from '@/lib/api';
import { API_PATHS, TAXONOMY_PATHS } from '@/constants/apiPaths';
import type {
  SizeListItem,
  Taxonomies,
  TaxonomyItem,
  TaxonomyItemInput,
  TaxonomyKind,
  TaxonomyListItem,
} from '@/types/taxonomy';

async function getList<T>(path: string): Promise<T[]> {
  const { data } = await api.get<T[]>(path);
  return data;
}

function itemPath(kind: TaxonomyKind, id: number) {
  return `${TAXONOMY_PATHS[kind]}/${id}`;
}

export const taxonomyService = {
  getAll: async (): Promise<Taxonomies> => {
    const [origins, plantTypes, sizes, imageViews] = await Promise.all([
      getList<TaxonomyListItem>(API_PATHS.origins),
      getList<TaxonomyListItem>(API_PATHS.plantTypes),
      getList<SizeListItem>(API_PATHS.sizes),
      getList<TaxonomyListItem>(API_PATHS.imageViews),
    ]);
    return { origins, plantTypes, sizes, imageViews };
  },
  create: async (
    kind: TaxonomyKind,
    input: TaxonomyItemInput,
  ): Promise<TaxonomyItem> => {
    const { data } = await api.post<TaxonomyItem>(TAXONOMY_PATHS[kind], input);
    return data;
  },
  update: async (
    kind: TaxonomyKind,
    id: number,
    input: TaxonomyItemInput,
  ): Promise<TaxonomyItem> => {
    const { data } = await api.patch<TaxonomyItem>(itemPath(kind, id), input);
    return data;
  },
  reorder: async (kind: TaxonomyKind, ids: number[]): Promise<void> => {
    await api.put(`${TAXONOMY_PATHS[kind]}${API_PATHS.order}`, { ids });
  },
  delete: async (
    kind: TaxonomyKind,
    id: number,
    reassignTo: number | null,
  ): Promise<void> => {
    await api.delete(itemPath(kind, id), {
      params: reassignTo === null ? undefined : { reassignTo },
    });
  },
};
