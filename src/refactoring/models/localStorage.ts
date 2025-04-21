import { LocalStorageKeyType, Updater } from "../../types";

const _setLocalStorage = <T>(key: LocalStorageKeyType, newValue: T): T => {
  localStorage.setItem(key, JSON.stringify(newValue));
  return newValue;
};

// 이건 순수함수인가? 순수하지 않은데..
export const getLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): T => {
  // JSON.parse 에러 가드
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T; // 타입가드는 어떻게..?
  } catch (error) {}

  // 없거나 에러인 경우 초기값으로 로컬 변경
  _setLocalStorage(key, initialValue);
  return initialValue;
};

export const removeLocalStorage = (key: LocalStorageKeyType) => {
  localStorage.removeItem(key);
};

export const isUpdater = <T>(updater: unknown): updater is Updater<T> => {
  return typeof updater === "function";
};

export const setStateWithLocalStorage = <T>(key: LocalStorageKeyType, prev: T, updater: T | Updater<T>) => {
  const newValue = isUpdater<T>(updater) ? updater(prev) : updater;
  _setLocalStorage(key, newValue);
  return newValue;
};
