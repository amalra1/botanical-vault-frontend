import { useEffect } from 'react';
import type { RefObject } from 'react';

const POINTER_DOWN_EVENT = 'pointerdown';

export function useOutsidePointerDown(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!isActive) {
      return;
    }
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !ref.current?.contains(target)) {
        onOutside();
      }
    };
    document.addEventListener(POINTER_DOWN_EVENT, handlePointerDown);
    return () =>
      document.removeEventListener(POINTER_DOWN_EVENT, handlePointerDown);
  }, [ref, isActive, onOutside]);
}
