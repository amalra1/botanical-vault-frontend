import type { TaxonomyKind } from '@/types/taxonomy';

export const API_PATHS = {
  login: '/auth/login',
  origins: '/origins',
  plantTypes: '/plant-types',
  sizes: '/sizes',
  imageViews: '/image-views',
  order: '/order',
  plants: '/plants',
  collections: '/collections',
} as const;

export const TAXONOMY_PATHS: Record<TaxonomyKind, string> = {
  origins: API_PATHS.origins,
  plantTypes: API_PATHS.plantTypes,
  sizes: API_PATHS.sizes,
  imageViews: API_PATHS.imageViews,
};
