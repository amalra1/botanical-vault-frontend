import { OriginFilter } from '@/components/plants/OriginFilter/OriginFilter';
import { SegmentedFacetFilter } from '@/components/plants/SegmentedFacetFilter/SegmentedFacetFilter';
import { TypeFilter } from '@/components/plants/TypeFilter/TypeFilter';
import { copy } from '@/data/copy';
import type { PlantFiltersProps } from '@/types/components/plants';
import styles from './PlantFilters.module.css';

const FILTERS_COPY = copy.plants.filters;

export function PlantFilters({
  taxonomies,
  facets,
  filters,
  onChange,
}: PlantFiltersProps) {
  const sizeItems = taxonomies.sizes.map((size) => ({
    id: size.id,
    label: size.description ?? size.name,
  }));
  const viewItems = taxonomies.imageViews.map((view) => ({
    id: view.id,
    label: view.name,
  }));

  return (
    <section aria-label={FILTERS_COPY.label} className={styles.filters}>
      <TypeFilter
        types={taxonomies.plantTypes}
        facet={facets?.types}
        value={filters.typeId}
        onChange={(typeId) => onChange({ typeId })}
      />
      <div className={styles.groups}>
        <OriginFilter
          origins={taxonomies.origins}
          facet={facets?.origins}
          value={filters.origin}
          onChange={(origin) => onChange({ origin })}
        />
        <SegmentedFacetFilter
          label={FILTERS_COPY.size}
          items={sizeItems}
          facet={facets?.sizes}
          value={filters.sizeId}
          onChange={(sizeId) => onChange({ sizeId })}
        />
        <SegmentedFacetFilter
          label={FILTERS_COPY.view}
          items={viewItems}
          facet={facets?.views}
          value={filters.viewId}
          onChange={(viewId) => onChange({ viewId })}
        />
      </div>
    </section>
  );
}
