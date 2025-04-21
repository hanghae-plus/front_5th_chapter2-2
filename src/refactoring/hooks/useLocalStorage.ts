import { useState } from "react";
import { LocalStorageKeyType, Storage, Updater } from "../../types";
import { getLocalStorage, isUpdater, setLocalStorage } from "../models/localStorage";

type UseLocalStorageProps<T> = {
  key: LocalStorageKeyType;
  initialValue: T;
};

export const useLocalStorage = <T>({ key, initialValue }: UseLocalStorageProps<T>): Storage<T> => {
  const [item, setItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const updateItem = (updater: T | Updater<T>) => {
    const newValue = isUpdater<T>(updater) ? updater(item) : updater;
    setItem(setLocalStorage(key, newValue));
    return newValue;
  };

  return { item, updateItem };
};
