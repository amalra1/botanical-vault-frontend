import {
  DEFAULT_PLANT_FILTERS,
  FILTER_PARAMS,
  PLANT_SORT_API_VALUES,
  PLANT_SORT_PARAMS,
  UNCLASSIFIED_ORIGIN,
} from '@/constants/plantFilters';
import { lightParamOf, readLightParam } from '@/lib/lightExposure';
import type {
  OriginFilter,
  PlantFilters,
  PlantSearchApiParams,
  PlantSortKey,
  ReadableSearchParams,
} from '@/types/plant';

function readId(value: string | null) {
  const id = Number(value);
  return value && Number.isInteger(id) && id > 0 ? id : null;
}

function readOrigin(value: string | null): OriginFilter {
  return value === UNCLASSIFIED_ORIGIN ? UNCLASSIFIED_ORIGIN : readId(value);
}

function readSort(value: string | null): PlantSortKey {
  return value === PLANT_SORT_PARAMS.recent ? 'recent' : 'name';
}

export function parsePlantFilters(params: ReadableSearchParams): PlantFilters {
  return {
    query: params.get(FILTER_PARAMS.query)?.trim() ?? '',
    typeId: readId(params.get(FILTER_PARAMS.type)),
    origin: readOrigin(params.get(FILTER_PARAMS.origin)),
    sizeId: readId(params.get(FILTER_PARAMS.size)),
    viewId: readId(params.get(FILTER_PARAMS.view)),
    lightExposure: readLightParam(params.get(FILTER_PARAMS.light)),
    sort: readSort(params.get(FILTER_PARAMS.sort)),
  };
}

export function serializePlantFilters(filters: PlantFilters) {
  const entries: [string, string | number | null][] = [
    [FILTER_PARAMS.query, filters.query.trim() || null],
    [FILTER_PARAMS.type, filters.typeId],
    [FILTER_PARAMS.origin, filters.origin],
    [FILTER_PARAMS.size, filters.sizeId],
    [FILTER_PARAMS.view, filters.viewId],
    [FILTER_PARAMS.light, lightParamOf(filters.lightExposure)],
    [
      FILTER_PARAMS.sort,
      filters.sort === DEFAULT_PLANT_FILTERS.sort
        ? null
        : PLANT_SORT_PARAMS[filters.sort],
    ],
  ];
  const params = new URLSearchParams();
  entries.forEach(([name, value]) => {
    if (value !== null) {
      params.set(name, String(value));
    }
  });
  return params.toString();
}

export function toApiParams(filters: PlantFilters): PlantSearchApiParams {
  const { origin } = filters;
  return {
    q: filters.query || undefined,
    typeId: filters.typeId ?? undefined,
    originId: typeof origin === 'number' ? origin : undefined,
    unclassified: origin === UNCLASSIFIED_ORIGIN || undefined,
    sizeId: filters.sizeId ?? undefined,
    viewId: filters.viewId ?? undefined,
    lightExposure: filters.lightExposure ?? undefined,
    sort: PLANT_SORT_API_VALUES[filters.sort],
  };
}

export function countActiveFilters(filters: PlantFilters) {
  return [
    filters.typeId,
    filters.origin,
    filters.sizeId,
    filters.viewId,
    filters.lightExposure,
  ].filter((value) => value !== null).length;
}

export function hasActiveFilters(filters: PlantFilters) {
  return filters.query !== '' || countActiveFilters(filters) > 0;
}
