import { useState } from "react";
import { CartItem, LocalStorage, Product, Discount, Coupon } from "../../types";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "./lib/localStorage";

type Item = CartItem | Product | Discount | Coupon

export const useLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  const [storage, _setStorage] = useState(() => getLocalStorage(key));

  removeLocalStorage(key);

  const setStorage = <NewItem extends Item>(
    param: ((prevItem: NewItem[]) => NewItem[]) | NewItem[] | []
  ) => {
    if (typeof param === "function") {
      _setStorage((prev: NewItem[]) => {
        const newItemData = param(prev);
        setLocalStorage(key, newItemData);
        return newItemData;
      });
    } else {
      _setStorage(() => {
        setLocalStorage(key, param);
        return param;
      });
    }
  };

  return { storage, setStorage };
};
