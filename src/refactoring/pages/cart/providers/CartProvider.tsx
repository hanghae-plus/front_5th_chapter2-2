import { createContext, useState } from "react";
import type { ICartItem } from "#src/types";

export const CartContext = createContext<{
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}>({
  cart: [],
  setCart: () => {},
});

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
