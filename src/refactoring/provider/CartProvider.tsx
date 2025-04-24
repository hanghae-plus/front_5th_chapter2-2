import { useCart } from "@/refactoring/hooks";
import { createContext, ReactNode, useContext } from "react";

type CartContextType = ReturnType<typeof useCart>;
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const value = useCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("context is null");
  return context;
};
