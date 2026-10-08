import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_PLANT_FILTERS } from '@/constants/plantFilters';
import {
  parsePlantFilters,
  serializePlantFilters,
} from '@/lib/plantFilterParams';
import type { PlantFilters } from '@/types/plant';

const NAVIGATION_OPTIONS = { scroll: false };

export function usePlantFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filters = useMemo(
    () => parsePlantFilters(searchParams),
    [searchParams],
  );

  const hrefFor = useCallback(
    (patch: Partial<PlantFilters>) => {
      const query = serializePlantFilters({ ...filters, ...patch });
      return query ? `${pathname}?${query}` : pathname;
    },
    [filters, pathname],
  );

  const updateFilters = useCallback(
    (patch: Partial<PlantFilters>) =>
      router.push(hrefFor(patch), NAVIGATION_OPTIONS),
    [router, hrefFor],
  );

  const updateQuery = useCallback(
    (query: string) => router.replace(hrefFor({ query }), NAVIGATION_OPTIONS),
    [router, hrefFor],
  );

  const clearFilters = useCallback(
    () => updateFilters({ ...DEFAULT_PLANT_FILTERS, sort: filters.sort }),
    [updateFilters, filters.sort],
  );

  return { filters, updateFilters, updateQuery, clearFilters };
}
