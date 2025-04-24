import { useCallback } from 'react';
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, getFilteredCart, updateCartItemQuantity } from '../models/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = useCallback(
    (product: Product) =>
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.product.id === product.id);

        if (existingItem) {
          return updateCartItemQuantity(prevCart, product.id, existingItem.quantity + 1);
        }

        return [...prevCart, { product, quantity: 1 }];
      }),
    [setCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => setCart((prevCart) => getFilteredCart(prevCart, productId)),
    [setCart],
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) =>
      setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity)),
    [setCart],
  );

  const applyCoupon = useCallback(
    (coupon: Coupon) => setSelectedCoupon(coupon),
    [setSelectedCoupon],
  );

  const calculateTotal = useCallback(
    () => calculateCartTotal(cart, selectedCoupon),
    [cart, selectedCoupon],
  );

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
