// useCart.ts
import { useState } from 'react';
import { CartItem } from './types';
import { calculateCartTotal, updateCartItemQuantity } from './lib';
import { Product } from '../product/types';
import { Coupon } from '../coupon/types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, initialQuantity: number = 1) => {
    const isProductInCart = cart.some((item) => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (isProductInCart) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + initialQuantity }
          : item,
      );
    } else {
      updatedCart = [...cart, { product, quantity: initialQuantity }];
    }

    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
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
