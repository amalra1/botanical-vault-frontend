import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { ToggleChip } from '@/components/ui/ToggleChip/ToggleChip';
import { UNCLASSIFIED_ORIGIN } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { facetCount } from '@/lib/facetCount';
import type {
  OriginFilterOption,
  OriginFilterProps,
} from '@/types/components/plants';
import styles from './OriginFilter.module.css';

const FILTERS_COPY = copy.plants.filters;

export function OriginFilter({
  origins,
  facet,
  value,
  onChange,
}: OriginFilterProps) {
  const options: OriginFilterOption[] = [
    { value: null, label: FILTERS_COPY.all, count: facet?.all },
    ...origins.map((origin) => ({
      value: origin.id,
      label: origin.name,
      count: facet && facetCount(facet, origin.id),
    })),
    {
      value: UNCLASSIFIED_ORIGIN,
      label: FILTERS_COPY.unclassified,
      count: facet?.unclassified,
    },
  ];

  return (
    <FieldGroup label={FILTERS_COPY.origin}>
      <div className={styles.chips}>
        {options.map((option) => (
          <ToggleChip
            key={option.value ?? FILTERS_COPY.all}
            pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={styles.count}>{option.count}</span>
            )}
          </ToggleChip>
        ))}
      </div>
    </FieldGroup>
  );
}
