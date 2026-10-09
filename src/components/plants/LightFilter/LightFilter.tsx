import { SunArc } from '@/components/plants/SunArc/SunArc';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { LightFilterProps } from '@/types/components/plantFilters';

const FILTERS_COPY = copy.plants.filters;

export function LightFilter({ value, onChange }: LightFilterProps) {
  return (
    <FieldGroup label={FILTERS_COPY.light}>
      <SunArc
        compact
        selected={value ? [value] : []}
        onSelect={(exposure) => onChange(exposure === value ? null : exposure)}
        allLabel={FILTERS_COPY.all}
        onSelectAll={() => onChange(null)}
      />
    </FieldGroup>
  );
}
