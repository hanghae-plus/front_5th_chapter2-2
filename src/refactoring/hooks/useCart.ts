// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import {
  calculateCartTotal,
  calculateItemTotal,
  updateCartItemQuantity,
} from '../models/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const remainingStock = product.stock;

    if (remainingStock > 0) {
      const existingItem = cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        const updatedCart = cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {};

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
