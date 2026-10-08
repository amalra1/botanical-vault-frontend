import { FieldGroup } from '@/components/ui/FieldGroup/FieldGroup';
import { Viewfinder } from '@/components/ui/Viewfinder/Viewfinder';
import { copy } from '@/data/copy';
import type { ViewFilterProps } from '@/types/components/plantFilters';
import type { SelectOption } from '@/types/components/ui';

const FILTERS_COPY = copy.plants.filters;

export function ViewFilter({ views, value, onChange }: ViewFilterProps) {
  const options: SelectOption<number | null>[] = [
    { value: null, label: FILTERS_COPY.all },
    ...views.map((view) => ({ value: view.id, label: view.name })),
  ];

  return (
    <FieldGroup label={FILTERS_COPY.view}>
      <Viewfinder options={options} value={value} onChange={onChange} />
    </FieldGroup>
  );
}
