// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingCartItem = prevCart.find((cartItem) => cartItem.product.id === product.id);
      
      if (existingCartItem) {
        return prevCart.map((cartItem) => 
          cartItem.product.id === product.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }

      return [
        ...prevCart,
        {
          product,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, 0));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
