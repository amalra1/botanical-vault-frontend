export const FILTER_PARAMS = {
  query: 'busca',
  type: 'tipo',
  origin: 'origem',
  size: 'porte',
  view: 'vista',
  light: 'luz',
  sort: 'ordem',
} as const;

export const UNCLASSIFIED_ORIGIN = 'sem-classificacao';

export const ALL_OPTION = 'todas';

export const PLANT_SORT_PARAMS = {
  name: 'nome',
  recent: 'recentes',
} as const;

export const PLANT_SORT_API_VALUES = {
  name: 'NAME',
  recent: 'RECENT',
} as const;

export const DEFAULT_PLANT_FILTERS = {
  query: '',
  typeId: null,
  origin: null,
  sizeId: null,
  viewId: null,
  lightExposure: null,
  sort: 'name',
} as const;

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_SHORTCUT_KEY = 'k';
export const SEARCH_SHORTCUT_ARIA = 'Meta+K Control+K';
export const SKELETON_CARD_COUNT = 8;
export const PLANT_CARD_IMAGE_SIZES = '(max-width: 600px) 100vw, 300px';
export const ORIGIN_TONE_COUNT = 3;
