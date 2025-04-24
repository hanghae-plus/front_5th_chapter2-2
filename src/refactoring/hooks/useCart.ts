import { useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { CartItem, Coupon, Product } from '@/types';

import {
  calculateCartTotal,
  updateCartItemQuantity,
  updateCartWithProduct,
} from '../models';

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getRemainingStock = useCallback(
    (product: Product) => {
      const cartItem = cart.find((item) => item.product.id === product.id);
      return product.stock - (cartItem?.quantity || 0);
    },
    [cart],
  );

  const addToCart = useCallback(
    (product: Product) => {
      const remainingStock = getRemainingStock(product);
      if (remainingStock <= 0) return;
      setCart((prevCart) => updateCartWithProduct(prevCart, product));
    },
    [getRemainingStock, setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== productId),
      );
    },
    [setCart],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) =>
        updateCartItemQuantity(prevCart, productId, newQuantity),
      );
    },
    [setCart],
  );

  const applyCoupon = useCallback(
    (coupon: Coupon) => {
      setSelectedCoupon(coupon);
    },
    [setSelectedCoupon],
  );

  const calculateTotal = useCallback(() => {
    return calculateCartTotal(cart, selectedCoupon);
  }, [cart, selectedCoupon]);

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    getRemainingStock,
  };
};
