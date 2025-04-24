import { useState, useEffect } from 'react';

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);

    // 저장하기
    if (stored) {
      return JSON.parse(stored);
    }

    // 없으면 defaultValue를 사용하고 localStorage에 저장하기
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  });

  // state가 변경될 때마다 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
