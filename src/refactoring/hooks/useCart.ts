// useCart.ts
import { useCallback } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import {
  addProductToCart,
  calculateCartTotal,
  updateCartItemQuantity,
} from '../models/cart';
import { useLocalStorage } from './useLocalStorage';

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [selectedCoupon, setSelectedCoupon] = useLocalStorage<Coupon | null>(
    'coupon',
    null,
  );

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => addProductToCart(prevCart, product));
  }, []);

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
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
