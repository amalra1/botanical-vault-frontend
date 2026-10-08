import { OriginFilter } from '@/components/plants/OriginFilter/OriginFilter';
import { SegmentedFilter } from '@/components/plants/SegmentedFilter/SegmentedFilter';
import { TypeFilter } from '@/components/plants/TypeFilter/TypeFilter';
import { copy } from '@/data/copy';
import type { PlantFiltersProps } from '@/types/components/plantFilters';
import styles from './PlantFilters.module.css';

const FILTERS_COPY = copy.plants.filters;

export function PlantFilters({
  taxonomies,
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
        value={filters.typeId}
        onChange={(typeId) => onChange({ typeId })}
      />
      <div className={styles.groups}>
        <OriginFilter
          origins={taxonomies.origins}
          value={filters.origin}
          onChange={(origin) => onChange({ origin })}
        />
        <SegmentedFilter
          label={FILTERS_COPY.size}
          items={sizeItems}
          value={filters.sizeId}
          onChange={(sizeId) => onChange({ sizeId })}
        />
        <SegmentedFilter
          label={FILTERS_COPY.view}
          items={viewItems}
          value={filters.viewId}
          onChange={(viewId) => onChange({ viewId })}
        />
      </div>
    </section>
  );
}
