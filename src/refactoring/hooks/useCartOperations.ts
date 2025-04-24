import { Dispatch, SetStateAction } from "react";
import { CartItem, Product } from "../../types";

interface CartOperationsProps {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
}

export const useCartOperations = ({ cart, setCart }: CartOperationsProps) => {
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const addToCart = ( product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart((prevCart:CartItem[]) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

  };

  return { addToCart, getMaxDiscount, getRemainingStock };
};
