import { createContext, ReactNode, useContext } from "react";
import { useCart } from "../hooks";

// useCart 훅에서 반환하는 값의 타입을 정의합니다
type CartContextProps = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartState = useCart();

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
