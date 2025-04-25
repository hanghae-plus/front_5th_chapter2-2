import { useState, useEffect } from "react";

/**
 * 로컬 스토리지를 사용하여 상태를 관리하는 훅
 * @param key 로컬 스토리지 키
 * @param initialValue 초기값
 * @returns [저장된 값, 값을 설정하는 함수]
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] => {
  const isTestEnvironment = process.env.NODE_ENV === 'test';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isTestEnvironment) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isTestEnvironment) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}; 