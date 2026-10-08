'use client';

import { useId } from 'react';
import { VineFrame } from '@/components/layout/VineFrame/VineFrame';
import { FilterToggleButton } from '@/components/plants/FilterToggleButton/FilterToggleButton';
import { PlantFilters } from '@/components/plants/PlantFilters/PlantFilters';
import { PlantModalHost } from '@/components/plants/PlantModalHost/PlantModalHost';
import { PlantResults } from '@/components/plants/PlantResults/PlantResults';
import { PlantResultsHeader } from '@/components/plants/PlantResultsHeader/PlantResultsHeader';
import { PlantSearchBar } from '@/components/plants/PlantSearchBar/PlantSearchBar';
import { copy } from '@/data/copy';
import { useFilterPanel } from '@/hooks/useFilterPanel';
import { usePlantFilters } from '@/hooks/usePlantFilters';
import { usePlantModal } from '@/hooks/usePlantModal';
import { usePlantSearch } from '@/hooks/usePlantSearch';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { countActiveFilters, hasActiveFilters } from '@/lib/plantFilterParams';
import { plantResultTitle } from '@/lib/plantResultTitle';
import styles from './PlantsPage.module.css';

export function PlantsPage() {
  const { filters, updateFilters, updateQuery, clearFilters } =
    usePlantFilters();
  const { result, error, isUpdating, reload } = usePlantSearch(filters);
  const { data: taxonomies } = useTaxonomies();
  const plantModal = usePlantModal();
  const isFiltered = hasActiveFilters(filters);
  const activeFilterCount = countActiveFilters(filters);
  const filterPanel = useFilterPanel(activeFilterCount > 0);
  const filtersId = useId();
  const origins = taxonomies?.origins ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <VineFrame>
          <h1 className={styles.title}>{copy.pages.plants.title}</h1>
        </VineFrame>
        <div className={styles.searchRow}>
          <PlantSearchBar query={filters.query} onCommit={updateQuery} />
          <FilterToggleButton
            isOpen={filterPanel.isOpen}
            activeCount={activeFilterCount}
            controls={filtersId}
            onToggle={filterPanel.toggle}
          />
        </div>
      </div>
      {taxonomies && filterPanel.isOpen && (
        <PlantFilters
          id={filtersId}
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
