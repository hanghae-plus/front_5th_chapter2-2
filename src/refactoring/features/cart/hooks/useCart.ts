// useCart.ts
import { useState } from 'react';
import {
  calculateCartTotal,
  CartItem,
  Coupon,
  Product,
  updateCartItemQuantity,
} from '../../../entities';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
      };
      setCart((prevCart) => [...prevCart, newItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = updateCartItemQuantity(cart, productId, newQuantity);
    setCart(updatedCart);
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
