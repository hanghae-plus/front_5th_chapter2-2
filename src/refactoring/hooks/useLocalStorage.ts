import { useState, useEffect } from 'react';

const getInitialValue = <T>(key: string, initialValue: T) => {
  const isTest = process.env.NODE_ENV === 'test';
  if (isTest) return initialValue;

  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getInitialValue(key, initialValue),
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
