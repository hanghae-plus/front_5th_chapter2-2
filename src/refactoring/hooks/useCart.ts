import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, getFilteredCart, updateCartItemQuantity } from '../models/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) =>
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.product.id === product.id);

      if (existingItem) {
        return updateCartItemQuantity(prevCart, product.id, existingItem.quantity + 1);
      }

      return [...prevCart, { product, quantity: 1 }];
    });

  const removeFromCart = (productId: string) => setCart((prevCart) => getFilteredCart(prevCart, productId));

  const updateQuantity = (productId: string, newQuantity: number) =>
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));

  const applyCoupon = (coupon: Coupon) => setSelectedCoupon(coupon);

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
