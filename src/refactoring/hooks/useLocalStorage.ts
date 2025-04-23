import { useState } from 'react';

// // 1 사실 유틸에 가까운것 같음
// export const useLocalStorage = () => {
//   const setLocalStorage = () => {};
//   const getLocalStorage = () => {};
//   const removeLocalStorage = () => {};

//   return { setLocalStorage, getLocalStorage, removeLocalStorage };
// };

// // 2 state를 다루니까 이렇게 진행
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedItem, setStoredItem] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedItem) : value;

      setStoredItem(valueToStore);

      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedItem, setValue] as const;
};
