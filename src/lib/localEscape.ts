import type { KeyboardEvent } from 'react';
import { ESCAPE_KEY } from '@/constants/keys';

export function handleLocalEscape(
  event: KeyboardEvent<HTMLElement>,
  onEscape: () => void,
) {
  if (event.key !== ESCAPE_KEY) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  onEscape();
}
