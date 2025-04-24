import { createContext, useEffect, useState } from "react";
import type { ICartItem, ICoupon } from "#src/types";
import useLocalStorage from "#src/refactoring/hooks/useLocalStorage";

export const CartContext = createContext<{
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  selectedCoupon: ICoupon | null;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
}>({
  cart: [],
  setCart: () => {},
  selectedCoupon: null,
  setSelectedCoupon: () => {},
});

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [localStorageCart, setCartToLocalStorage] = useLocalStorage<ICartItem[]>("cart");
  const [localStorageSelectedCoupon, setSelectedCouponToLocalStorage] = useLocalStorage<ICoupon | null>(
    "selectedCoupon",
  );

  const [cart, setCart] = useState<ICartItem[]>(localStorageCart ?? []);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(localStorageSelectedCoupon ?? null);

  useEffect(() => {
    setCartToLocalStorage(cart);
  }, [cart, setCartToLocalStorage]);

  useEffect(() => {
    setSelectedCouponToLocalStorage(selectedCoupon);
  }, [selectedCoupon, setSelectedCouponToLocalStorage]);

  return (
    <CartContext.Provider value={{ cart, setCart, selectedCoupon, setSelectedCoupon }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
