import { useContext } from "react";
import React from "react";
import { useCart } from "../hooks/useCart.ts";

const CartContext = React.createContext<ReturnType<typeof useCart> | undefined>(
  undefined,
);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within CartProvider");
  return context;
};

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cartHelper = useCart();

  return (
    <CartContext.Provider value={cartHelper}>{children}</CartContext.Provider>
  );
};
