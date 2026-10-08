import { SizeSteps } from '@/components/plants/SizeSteps/SizeSteps';
import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { copy } from '@/data/copy';
import type { SizeFilterProps } from '@/types/components/plantFilters';

const FILTERS_COPY = copy.plants.filters;

export function SizeFilter({ sizes, value, onChange }: SizeFilterProps) {
  return (
    <FieldGroup label={FILTERS_COPY.size}>
      <SizeSteps
        sizes={sizes}
        value={value}
        onChange={onChange}
        allLabel={FILTERS_COPY.all}
      />
    </FieldGroup>
  );
}
