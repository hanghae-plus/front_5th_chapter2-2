import { useState } from "react";
import { LocalStorageKeyType, Storage, Updater } from "../../types";
import { getLocalStorage, isUpdater, setLocalStorage } from "../models/localStorage";

type UseLocalStorageProps<T> = {
  key: LocalStorageKeyType;
  initialValue: T;
};

export const useLocalStorage = <T>({ key, initialValue }: UseLocalStorageProps<T>): Storage<T> => {
  const [storedItem, setStoredItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const setItem = (updater: T | Updater<T>) => {
    setStoredItem((prev) => {
      const newValue = isUpdater<T>(updater) ? updater(prev) : updater;
      setLocalStorage(key, newValue);
      return newValue;
    });
  };
  return [storedItem, setItem];
};
