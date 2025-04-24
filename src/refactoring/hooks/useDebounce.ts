import { useRef } from 'react';

export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  cb: T,
  delay = 300,
): ((...args: Parameters<T>) => void) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
