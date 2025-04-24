export const debounce = <T extends (...args: unknown[]) => unknown>(
  cb: T,
  delay = 300,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
