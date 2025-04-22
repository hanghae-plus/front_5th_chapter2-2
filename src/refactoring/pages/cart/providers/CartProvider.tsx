import { createContext, useState } from "react";
import type { ICartItem, ICoupon } from "#src/types";

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
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  return (
    <CartContext.Provider value={{ cart, setCart, selectedCoupon, setSelectedCoupon }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
