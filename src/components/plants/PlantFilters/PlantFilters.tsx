import { LightFilter } from '@/components/plants/LightFilter/LightFilter';
import { OriginFilter } from '@/components/plants/OriginFilter/OriginFilter';
import { SizeFilter } from '@/components/plants/SizeFilter/SizeFilter';
import { TypeFilter } from '@/components/plants/TypeFilter/TypeFilter';
import { ViewFilter } from '@/components/plants/ViewFilter/ViewFilter';
import { copy } from '@/data/copy';
import type { PlantFiltersProps } from '@/types/components/plantFilters';
import styles from './PlantFilters.module.css';

export function PlantFilters({
  id,
  taxonomies,
  filters,
  onChange,
}: PlantFiltersProps) {
  return (
    <section
      id={id}
      aria-label={copy.plants.filters.label}
      className={styles.filters}
    >
      <TypeFilter
        types={taxonomies.plantTypes}
        value={filters.typeId}
        onChange={(typeId) => onChange({ typeId })}
      />
      <div className={styles.row}>
        <OriginFilter
          origins={taxonomies.origins}
          value={filters.origin}
          onChange={(origin) => onChange({ origin })}
        />
        <SizeFilter
          sizes={taxonomies.sizes}
          value={filters.sizeId}
          onChange={(sizeId) => onChange({ sizeId })}
        />
        <ViewFilter
          views={taxonomies.imageViews}
          value={filters.viewId}
          onChange={(viewId) => onChange({ viewId })}
        />
        <LightFilter
          value={filters.lightExposure}
          onChange={(lightExposure) => onChange({ lightExposure })}
        />
      </div>
    </section>
  );
}
