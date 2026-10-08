import { useCallback, useState } from 'react';

export function useFilterPanel(startsOpen: boolean) {
  const [isOpen, setIsOpen] = useState(startsOpen);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);
  return { isOpen, toggle };
}
