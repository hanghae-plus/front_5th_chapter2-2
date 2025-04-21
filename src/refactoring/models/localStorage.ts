import { LocalStorageKeyType, Updater } from "../../types";

export const setLocalStorage = <T>(key: LocalStorageKeyType, newValue: T): T => {
  localStorage.setItem(key, JSON.stringify(newValue));
  return newValue;
};

// 이건 순수함수인가?
export const getLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): T => {
  // JSON.parse 에러 가드
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T; // 타입가드는 어떻게..?
  } catch (error) {}

  // 없거나 에러인 경우 초기값으로 로컬 변경
  setLocalStorage(key, initialValue);
  return initialValue;
};

export const removeLocalStorage = (key: LocalStorageKeyType) => {
  localStorage.removeItem(key);
};

export const isUpdater = <T>(updater: unknown): updater is Updater<T> => {
  return typeof updater === "function";
};
