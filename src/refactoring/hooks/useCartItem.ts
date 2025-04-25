import { Dispatch, SetStateAction } from "react";
import { CartItem, Product } from "../../types";
import { getRemainingStock } from "../models/cart";

interface CartItemProps {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
}

export const useCartItems = ({cart, setCart}: CartItemProps) => {

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product, cart);
    if (remainingStock <= 0) return;

    setCart(prevCart => {
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

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.product.id === productId) {
          const maxQuantity = item.product.stock;
          const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
          return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null)
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity
  };
}; 