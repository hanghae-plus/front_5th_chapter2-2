import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setLocalStorageValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return {
    value,
    setValue,
    setLocalStorageValue
  };
}
