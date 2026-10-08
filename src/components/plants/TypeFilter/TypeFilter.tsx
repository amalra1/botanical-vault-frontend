import { ChoiceTile } from '@/components/ui/ChoiceTile/ChoiceTile';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import { facetCount } from '@/lib/facetCount';
import { pluralCopy } from '@/lib/pluralCopy';
import type { TypeFilterProps } from '@/types/components/plantFilters';
import styles from './TypeFilter.module.css';

const FILTERS_COPY = copy.plants.filters;

export function TypeFilter({ types, facet, value, onChange }: TypeFilterProps) {
  const countLabel = (count: number | undefined) =>
    count === undefined
      ? undefined
      : pluralCopy(count, FILTERS_COPY.optionCount);

  return (
    <FieldGroup label={FILTERS_COPY.type}>
      <div className={styles.tiles}>
        <ChoiceTile
          label={FILTERS_COPY.all}
          caption={countLabel(facet?.all)}
          pressed={value === null}
          onClick={() => onChange(null)}
        />
        {types.map((type) => (
          <ChoiceTile
            key={type.id}
            label={type.name}
            caption={countLabel(facet && facetCount(facet, type.id))}
            pressed={value === type.id}
            onClick={() => onChange(type.id)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}
