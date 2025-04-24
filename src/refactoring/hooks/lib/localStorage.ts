import { LocalStorage } from "../../../types";

export const getLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  const storageItems = localStorage.getItem(key) || JSON.stringify([]);
  return JSON.parse(storageItems);
};

export const setLocalStorage = (
  key: LocalStorage[keyof LocalStorage],
  newItems: any
) => {
  localStorage.setItem(key, JSON.stringify(newItems));
};

export const removeLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  localStorage.removeItem(key);
};