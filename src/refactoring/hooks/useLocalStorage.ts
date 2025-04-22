import { useState } from "react";
import { CartItem } from "../../types";

export type LocalStorage = {
  CART: "cart";
};

export const getLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  const storageItems = localStorage.getItem(key) || JSON.stringify([]);
  return JSON.parse(storageItems);
};

export const setLocalStorage = (
  key: LocalStorage[keyof LocalStorage],
  newCartItems: CartItem[] | []
) => {
  localStorage.setItem(key, JSON.stringify(newCartItems));
};

export const removeLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  localStorage.removeItem(key);
};

export const useLocalStorage = (key: LocalStorage[keyof LocalStorage]) => {
  const [cart, setStorage] = useState(() => getLocalStorage(key));

  removeLocalStorage(key);

  const setCart = (
    newCart: ((caritems: CartItem[]) => CartItem[]) | CartItem[] | []
  ) => {
    if (typeof newCart === "function") {
      setStorage((prev: CartItem[]) => {
        const newCartData = newCart(prev);
        setLocalStorage(key, newCartData);
        return newCartData;
      });
    } else {
      setStorage(() => {
        setLocalStorage(key, newCart);
        return newCart;
      });
    }
  };

  return [cart, setCart];
};
