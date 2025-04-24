import React, { createContext, useContext } from "react";
import { useCart } from "../hooks";

interface CartContext {}

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        selectedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext는 반드시 CartProvider에 위치하여야 합니다.",
    );
  }

  return context;
};
