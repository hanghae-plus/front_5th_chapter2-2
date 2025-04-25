import { useCallback, useState } from 'react';

export function useToggle(initialValue = false): {
  isOpen: boolean;
  toggle: () => void;
  set: (value: boolean) => void;
} {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const set = useCallback((value: boolean) => setIsOpen(value), []);

  return { isOpen, toggle, set };
}
