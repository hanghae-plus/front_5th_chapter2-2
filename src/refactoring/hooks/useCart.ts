import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { getUpdatedCart, updateCartItemQuantity } from '../models/cart';
import { initialCoupons, useCoupons } from './useCoupon';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { selectedCoupon, setSelectedCoupon } = useCoupons(initialCoupons);

  const addToCart = (product: Product) => {
    setCart((prevCart) => getUpdatedCart(prevCart, product));
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

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon,
  };
};
