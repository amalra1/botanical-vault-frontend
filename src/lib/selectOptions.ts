import { normalizeForMatch } from '@/lib/text';
import type { SelectOption, SelectValue } from '@/types/components/ui';

export function filterOptionsByLabel<T extends SelectValue>(
  options: SelectOption<T>[],
  term: string,
) {
  const needle = normalizeForMatch(term);
  return needle
    ? options.filter((option) =>
        normalizeForMatch(option.label).includes(needle),
      )
    : options;
}

export function optionKey<T extends SelectValue>({ value }: SelectOption<T>) {
  return String(value);
}
