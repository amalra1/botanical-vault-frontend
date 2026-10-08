import { ChoiceTile } from '@/components/ui/ChoiceTile/ChoiceTile';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { TypeFilterProps } from '@/types/components/plantFilters';
import styles from './TypeFilter.module.css';

const FILTERS_COPY = copy.plants.filters;

export function TypeFilter({ types, value, onChange }: TypeFilterProps) {
  return (
    <FieldGroup label={FILTERS_COPY.type}>
      <div className={styles.tiles}>
        <ChoiceTile
          label={FILTERS_COPY.all}
          pressed={value === null}
          onClick={() => onChange(null)}
        />
        {types.map((type) => (
          <ChoiceTile
            key={type.id}
            label={type.name}
            pressed={value === type.id}
            onClick={() => onChange(type.id)}
          />
        ))}
      </div>
    </FieldGroup>
  );
}
