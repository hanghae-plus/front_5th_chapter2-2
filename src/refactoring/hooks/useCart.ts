import { useState } from "react";
import { CartItem, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils";
import { useSelectedCoupon } from "./useCoupon";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { selectedCoupon, applyCoupon } = useSelectedCoupon();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(cart, selectedCoupon);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);

      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        
        return updatedCart;
      }
      
      return [...prevCart, { product, quantity: 1 }];
    })
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const removedItem = prevCart.filter((item) => item.product.id !== productId)

      return removedItem;
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => {
      const updatedCart = updateCartItemQuantity(prevCart, productId, newQuantity);

      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    selectedCoupon,
    applyCoupon,
  };
};
