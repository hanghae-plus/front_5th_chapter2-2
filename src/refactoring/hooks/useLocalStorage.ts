import { useState } from "react";
import { LocalStorageKeyType, Storage, Updater } from "../../types";
import { getLocalStorage, setStateWithLocalStorage } from "../models/localStorage";

export const useLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): Storage<T> => {
  const [storedItem, setStoredItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const setItem = (updater: T | Updater<T>) => {
    setStoredItem((prev) => setStateWithLocalStorage(key, prev, updater));
  };
  return [storedItem, setItem];
};
