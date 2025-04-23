import { createContext, useContext } from "react";

import { useCart } from "../hooks/use-cart";

const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartState = useCart();
  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within CartProvider");
  return context;
};
