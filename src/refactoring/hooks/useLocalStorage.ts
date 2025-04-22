import { getLocalStorage, setStateWithLocalStorage } from "@/refactoring/models";
import { LocalStorageKeyType, Storage, Updater } from "@/types";
import { useState } from "react";

export const useLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): Storage<T> => {
  const [storedItem, setStoredItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const setItem = (updater: T | Updater<T>) => {
    setStoredItem((prev) => setStateWithLocalStorage(key, prev, updater));
  };
  return [storedItem, setItem];
};
