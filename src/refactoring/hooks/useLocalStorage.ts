import { LocalStorageKeyType } from "@/types";
import { useState } from "react";

// type
type Updater<T> = (prev: T) => T; // 타입가드에서 함수를 확실히 식별시킬 수 있음
type Storage<T> = [item: T, setItem: (prev: T | Updater<T>) => void]; // 튜플 인자 이름을 인식시킬 수 있음

// type guard
const isUpdater = <T>(updater: unknown): updater is Updater<T> => {
  return typeof updater === "function";
};

// 내부함수
const setLocalStorage = <T>(key: LocalStorageKeyType, newValue: T): T => {
  localStorage.setItem(key, JSON.stringify(newValue));
  return newValue;
};
const getLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): T => {
  // JSON.parse 에러 가드
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
  } catch (error) {}

  // 없거나 에러인 경우 초기값으로 로컬 변경
  setLocalStorage(key, initialValue);
  return initialValue;
};

// 유틸함수? 헬퍼함수?
const setStateWithLocalStorage = <T>(key: LocalStorageKeyType, prev: T, updater: T | Updater<T>) => {
  const newValue = isUpdater<T>(updater) ? updater(prev) : updater;
  setLocalStorage(key, newValue);
  return newValue;
};

// hook
export const useLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): Storage<T> => {
  const [storedItem, setStoredItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const setItem = (updater: T | Updater<T>) => {
    setStoredItem((prev) => setStateWithLocalStorage(key, prev, updater));
  };
  return [storedItem, setItem];
};
