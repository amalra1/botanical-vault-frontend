import { useEffect } from 'react';

const KEYDOWN_EVENT = 'keydown';

export function useKeyboardShortcut(key: string, onPress: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey;
      if (hasModifier && event.key.toLowerCase() === key) {
        event.preventDefault();
        onPress();
      }
    };
    window.addEventListener(KEYDOWN_EVENT, handleKeyDown);
    return () => window.removeEventListener(KEYDOWN_EVENT, handleKeyDown);
  }, [key, onPress]);
}
