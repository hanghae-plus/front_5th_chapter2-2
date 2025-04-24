// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '@/types';
import { addProductToCart, updateCartItemQuantity } from '../models/cart';
import { useLocalStorage } from './useLocalStorage';

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => addProductToCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = updateCartItemQuantity(prevCart, productId, newQuantity);
      return updatedCart;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon,
  };
};
