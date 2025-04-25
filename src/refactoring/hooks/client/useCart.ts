import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../../types.ts';
import { createContextHook } from '../../libs/createContextHook.tsx';
import { updateCartItemQuantity, calculateCartTotal } from '../../models/Cart.ts';
import { useCoupons } from './useCoupons.ts';
import { getRemainingStock } from '../../models/Product.ts';

export const useCartStore = () => {
  const { selectedCoupon, setSelectedCoupon } = useCoupons();

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product, cart);
    if (remainingStock <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return updateCartItemQuantity(prevCart, product.id, existingItem.quantity + 1);
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    getMaxDiscount,
    applyCoupon
  };
};

export const [CartProvider, useCart] = createContextHook(useCartStore);
