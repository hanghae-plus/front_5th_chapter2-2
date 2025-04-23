import { useState, useCallback } from 'react';
import type { CartItem, Coupon, Product } from '../../types';

import {
  calculateCartTotal,
  updateCartItemQuantity,
  updateCartWithProduct,
} from '../models/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
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
    [getRemainingStock],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) =>
        updateCartItemQuantity(prevCart, productId, newQuantity),
      );
    },
    [],
  );

  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

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
