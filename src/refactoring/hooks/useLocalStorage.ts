import { useCallback, useEffect, useState } from "react";

/**
 * 로컬 스토리지 키
 *
 * 정해진 로컬스토리지 키를 사용하지 않으면 사용 불가능함
 * 따라서 의존성이 높아서 결합해둠
 */
export const KEY = {
  products: "products",
  coupons: "coupons",
  cart: "cart",
  selectedCoupon: "selectedCoupon",
} as const;

/**
 * @link [react-use 참고](https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts)
 */
const useLocalStorage = <T>(key: keyof typeof KEY, initialValue?: T) => {
  if (!window) {
    return [initialValue as T, () => {}, () => {}] as const;
  }
  if (!key) {
    throw new Error("useLocalStorage key may not be falsy");
  }
  if (!(key in KEY)) {
    throw new Error("useLocalStorage key must be one of the following: " + Object.values(KEY).join(", "));
  }

  const [state, setState] = useState<T | undefined>(() => {
    if (initialValue) return initialValue;

    // 함수형이 아니면 초기값이 로컬 스토리지의 데이터가 아니기때문에 변경
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    if (!state) return;

    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return;

    setState(JSON.parse(storedValue));
  }, [key]);

  const setValue = useCallback(
    (newValue: T) => {
      setState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key],
  );
  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setState(undefined);
  }, [key]);

  return [state, setValue, removeValue] as const;
};

export default useLocalStorage;
