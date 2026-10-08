'use client';

import { VineFrame } from '@/components/layout/VineFrame/VineFrame';
import { PlantFilters } from '@/components/plants/PlantFilters/PlantFilters';
import { PlantModalHost } from '@/components/plants/PlantModalHost/PlantModalHost';
import { PlantResults } from '@/components/plants/PlantResults/PlantResults';
import { PlantResultsHeader } from '@/components/plants/PlantResultsHeader/PlantResultsHeader';
import { PlantSearchBar } from '@/components/plants/PlantSearchBar/PlantSearchBar';
import { copy } from '@/data/copy';
import { usePlantFilters } from '@/hooks/usePlantFilters';
import { usePlantModal } from '@/hooks/usePlantModal';
import { usePlantSearch } from '@/hooks/usePlantSearch';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { hasActiveFilters } from '@/lib/plantFilterParams';
import { plantResultTitle } from '@/lib/plantResultTitle';
import styles from './PlantsPage.module.css';

export function PlantsPage() {
  const { filters, updateFilters, updateQuery, clearFilters } =
    usePlantFilters();
  const { result, error, isUpdating, reload } = usePlantSearch(filters);
  const { data: taxonomies } = useTaxonomies();
  const plantModal = usePlantModal();
  const isFiltered = hasActiveFilters(filters);
  const origins = taxonomies?.origins ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <VineFrame>
          <h1 className={styles.title}>{copy.pages.plants.title}</h1>
        </VineFrame>
        <PlantSearchBar query={filters.query} onCommit={updateQuery} />
      </div>
      {taxonomies && (
        <PlantFilters
          taxonomies={taxonomies}
          filters={filters}
          onChange={updateFilters}
        />
      )}
      <PlantResultsHeader
        title={plantResultTitle(filters, taxonomies)}
        count={result ? result.plants.length : null}
        canClear={isFiltered}
        sort={filters.sort}
        onSortChange={(sort) => updateFilters({ sort })}
        onClear={clearFilters}
      />
      <PlantResults
        result={result}
        error={error}
        isUpdating={isUpdating}
        hasActiveFilters={isFiltered}
        origins={origins}
        onRetry={reload}
        onClear={clearFilters}
        onOpenPlant={plantModal.openDetail}
      />
      <PlantModalHost modal={plantModal} origins={origins} />
    </main>
  );
}
