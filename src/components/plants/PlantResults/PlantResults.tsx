import { PlantGrid } from '@/components/plants/PlantGrid/PlantGrid';
import { PlantGridSkeleton } from '@/components/plants/PlantGrid/PlantGridSkeleton';
import { PlantsEmptyState } from '@/components/plants/PlantsEmptyState/PlantsEmptyState';
import { LoadStatus } from '@/components/ui/LoadStatus/LoadStatus';
import { copy } from '@/data/copy';
import type { PlantResultsProps } from '@/types/components/plants';

const PLANTS_COPY = copy.plants;

export function PlantResults({
  result,
  error,
  isUpdating,
  hasActiveFilters,
  origins,
  onRetry,
  onClear,
}: PlantResultsProps) {
  if (error) {
    return (
      <LoadStatus
        isLoading={false}
        loadingLabel={PLANTS_COPY.loading}
        errorLabel={PLANTS_COPY.errors.load}
        retryLabel={PLANTS_COPY.retry}
        onRetry={onRetry}
      />
    );
  }
  if (!result) {
    return <PlantGridSkeleton />;
  }
  if (result.plants.length === 0) {
    return (
      <PlantsEmptyState
        variant={hasActiveFilters ? 'noResults' : 'emptyLibrary'}
        onClear={onClear}
      />
    );
  }
  return (
    <PlantGrid
      plants={result.plants}
      origins={origins}
      isUpdating={isUpdating}
    />
  );
}
